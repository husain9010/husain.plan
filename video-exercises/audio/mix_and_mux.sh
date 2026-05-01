#!/usr/bin/env bash
# Mix per-line WAVs into a single narration track (honouring timestamps in
# episode_01_lines.json), then mux with the silent video to produce the final mp4.
#
# Prereqs:
#   audio/lines/s01.wav ... s27.wav  (from generate_tts.sh)
#   out/episode_01_video.mp4         (from remotion render)
#   ffmpeg, jq
#
# Optional music bed:
#   audio/music_bed.wav  — any ambient piano loop, the script will duck it
#   under narration automatically. If missing, the script still works.
#
# Output: out/episode_01_final.mp4

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
LINES_JSON="$SCRIPT_DIR/episode_01_lines.json"
LINES_DIR="$SCRIPT_DIR/lines"
VIDEO="$ROOT_DIR/out/episode_01_video.mp4"
MUSIC="$SCRIPT_DIR/music_bed.wav"
NARR="$SCRIPT_DIR/narration.wav"
FINAL="$ROOT_DIR/out/episode_01_final.mp4"

to_ms() {
  # 00:16.5 -> 16500
  local ts=$1
  local min=${ts%%:*}
  local sec=${ts#*:}
  python3 -c "print(int((int('$min')*60 + float('$sec'))*1000))"
}

# -- Build narration.wav from all per-line files with adelay ----------------

inputs=()
filters=()
count=$(jq 'length' "$LINES_JSON")
idx=0
for i in $(seq 0 $((count - 1))); do
  id=$(jq -r ".[$i].id" "$LINES_JSON")
  t=$(jq -r ".[$i].t" "$LINES_JSON")
  wav="$LINES_DIR/s${id}.wav"
  if [[ ! -f "$wav" ]]; then
    echo "MISSING $wav — run generate_tts.sh first" >&2
    exit 1
  fi
  ms=$(to_ms "$t")
  inputs+=(-i "$wav")
  filters+=("[${idx}:a]adelay=${ms}|${ms}[a${idx}]")
  idx=$((idx + 1))
done

mix_inputs=""
for i in $(seq 0 $((idx - 1))); do mix_inputs+="[a${i}]"; done

filter_complex=$(IFS=';' ; echo "${filters[*]};${mix_inputs}amix=inputs=${idx}:normalize=0[out]")

echo "→ mixing $idx lines into $NARR"
ffmpeg -y -hide_banner -loglevel error \
  "${inputs[@]}" \
  -filter_complex "$filter_complex" \
  -map '[out]' -ac 2 -ar 48000 \
  "$NARR"

# -- Mux narration (and music bed if present) onto the silent video ---------

if [[ -f "$MUSIC" ]]; then
  echo "→ muxing video + narration + ducked music bed"
  ffmpeg -y -hide_banner -loglevel error \
    -i "$VIDEO" -i "$NARR" -i "$MUSIC" \
    -filter_complex "[2:a]volume=0.18[m];[1:a][m]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=250[mix];[mix]volume=1.2[a]" \
    -map 0:v -map '[a]' -c:v copy -c:a aac -b:a 192k -shortest \
    "$FINAL"
else
  echo "→ muxing video + narration (no music bed)"
  ffmpeg -y -hide_banner -loglevel error \
    -i "$VIDEO" -i "$NARR" \
    -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest \
    "$FINAL"
fi

echo "✓ final: $FINAL"
