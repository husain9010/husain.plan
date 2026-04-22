#!/usr/bin/env bash
# Generate one WAV per line from audio/episode_01_lines.json using ElevenLabs TTS.
#
# Prereqs:
#   export ELEVENLABS_KEY=sk_xxx
#   export VOICE_AR=xxxxxxxx      # ElevenLabs voice id for Arabic explainer
#   export VOICE_EN=yyyyyyyy      # ElevenLabs voice id for English native
#   jq installed (sudo apt install jq)
#
# Output:
#   audio/lines/s01.wav, s02.wav, ...
#
# Each output is already trimmed of silence by ElevenLabs. The mix script
# places each file at the timestamp from episode_01_lines.json.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LINES_JSON="$SCRIPT_DIR/episode_01_lines.json"
OUT_DIR="$SCRIPT_DIR/lines"
mkdir -p "$OUT_DIR"

: "${ELEVENLABS_KEY:?set ELEVENLABS_KEY}"
: "${VOICE_AR:?set VOICE_AR}"
: "${VOICE_EN:?set VOICE_EN}"

count=$(jq 'length' "$LINES_JSON")
for i in $(seq 0 $((count - 1))); do
  id=$(jq -r ".[$i].id" "$LINES_JSON")
  voice_key=$(jq -r ".[$i].voice" "$LINES_JSON")
  text=$(jq -r ".[$i].text" "$LINES_JSON")

  if [[ "$voice_key" == "ar" ]]; then voice_id="$VOICE_AR"; else voice_id="$VOICE_EN"; fi
  out="$OUT_DIR/s${id}.wav"

  if [[ -f "$out" ]]; then
    echo "skip s${id} (exists)"
    continue
  fi

  echo "→ s${id} [$voice_key] ${text:0:60}..."

  tmp_mp3="$(mktemp --suffix=.mp3)"
  curl -sS -X POST "https://api.elevenlabs.io/v1/text-to-speech/${voice_id}?output_format=mp3_44100_128" \
    -H "xi-api-key: ${ELEVENLABS_KEY}" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg t "$text" '{text:$t, model_id:"eleven_multilingual_v2", voice_settings:{stability:0.5, similarity_boost:0.75}}')" \
    -o "$tmp_mp3"

  ffmpeg -y -hide_banner -loglevel error -i "$tmp_mp3" -ar 48000 -ac 2 "$out"
  rm -f "$tmp_mp3"
done

echo "done. $count lines generated in $OUT_DIR"
