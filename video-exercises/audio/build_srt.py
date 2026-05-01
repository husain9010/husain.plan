#!/usr/bin/env python3
"""Generate episode_01.srt from audio/episode_01_lines.json.

Each line lasts until the next line starts. Arabic lines are tagged <font>
with `dir="rtl"` via an SSA-style override (many players honour it; for hard
RTL, burn the subs in with libass via ffmpeg -vf subtitles=...).

Usage: python3 build_srt.py > ../out/episode_01.srt
"""
import json
import pathlib
import sys

HERE = pathlib.Path(__file__).parent
LINES = json.loads((HERE / "episode_01_lines.json").read_text())
END_TIME = 180.0  # episode length in seconds


def to_srt_ts(total_s: float) -> str:
    h = int(total_s // 3600)
    m = int((total_s % 3600) // 60)
    s = total_s - h * 3600 - m * 60
    return f"{h:02d}:{m:02d}:{s:06.3f}".replace(".", ",")


def parse(ts: str) -> float:
    m, s = ts.split(":")
    return int(m) * 60 + float(s)


out = []
for i, line in enumerate(LINES):
    start = parse(line["t"])
    end = parse(LINES[i + 1]["t"]) if i + 1 < len(LINES) else END_TIME
    end = min(end, start + 6.0)  # cap any single line to 6s on screen
    text = line["text"]
    if line["voice"] == "ar":
        text = f"‫{text}‬"  # bidi isolate — best-effort for RTL
    out.append(f"{i+1}\n{to_srt_ts(start)} --> {to_srt_ts(end)}\n{text}\n")

sys.stdout.write("\n".join(out))
