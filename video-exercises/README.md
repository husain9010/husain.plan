# practisEN video episodes

Episode 01 — **Listen and Repeat: Nail the rhythm of long sentences**.

```
video-exercises/
├── exercise-video-template.md   ← reusable storyboard + script template
├── remotion/                    ← motion graphics source (Node/React)
│   ├── src/Episode01.tsx        ← composition
│   ├── src/scenes/*.tsx         ← eight scenes
│   ├── src/brand.ts             ← tokens pulled from brand-kit/BRAND.md
│   ├── src/episode01-data.ts    ← the prompt, model chunks, IPA, takeaway
│   └── public/fonts/*.woff2     ← local brand fonts (Baloo 2, Nunito, JetBrains Mono)
├── audio/
│   ├── episode_01_lines.json    ← timecoded narration lines (AR + EN)
│   ├── generate_tts.sh          ← calls ElevenLabs, saves lines/sXX.wav
│   ├── mix_and_mux.sh           ← builds narration.wav and muxes with the video
│   └── build_srt.py             ← emits episode_01.srt
└── out/
    ├── episode_01_video.mp4     ← silent render (already built)
    ├── episode_01.srt           ← bilingual subtitles
    └── episode_01_final.mp4     ← video + narration (produced by mix_and_mux.sh)
```

## Run it yourself

```bash
# 1. Silent video (already done, re-run only after code changes)
cd remotion
npm install
npm run render:ep01           # → ../out/episode_01_video.mp4

# 2. Narration
cd ../audio
export ELEVENLABS_KEY=sk_...
export VOICE_AR=<arabic-voice-id>
export VOICE_EN=<english-voice-id>
./generate_tts.sh             # → audio/lines/sXX.wav (one per line)

# 3. Mix + mux
./mix_and_mux.sh              # → ../out/episode_01_final.mp4

# 4. Subtitles (optional)
python3 build_srt.py > ../out/episode_01.srt
```

### To make Episode 02

Duplicate `src/episode01-data.ts` → `src/episode02-data.ts`, fill in the
new question/answer, register a second composition in `src/Root.tsx`,
and add a `render:ep02` script. The scenes themselves read from the data
module, so no scene code changes.

### Notes

- All fonts are served locally from `remotion/public/fonts/` — no network required at render time.
- The video is deterministic; re-rendering produces byte-identical output.
- `out/` is gitignored. The silent mp4 is ~15 MB per episode.
