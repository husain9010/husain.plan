# practisEN — Exercise Episode Template

Template for short exercise episodes covering **Listen and Repeat** and **Take an Interview** task types. Visuals are kinetic typography only — no faces, no avatars, no stock people. Brand tokens come from `brand-kit/BRAND.md` (violet `#7030E0`, ink `#0B0B1E`, Baloo 2 display, Nunito body).

Each episode uses two parallel artifacts that share the same timeline:

1. **Video prompt / storyboard** — fed to Remotion, After Effects, or a motion designer. Optionally, a text-to-video model may generate only the *background texture* (soft violet bokeh, paper grain, grid mesh) — never the text.
2. **Narration script** — fed to a TTS tool (ElevenLabs, Azure, OpenAI TTS). Arabic explainer voice + English native voice for the target language material. Labeled `[AR]` and `[EN]` per line.

Output spec: **1920×1080 @ 30fps** (landscape, YouTube). Also export 1080×1920 for Shorts/Reels by re-centering the stage zone. Duration target: 120–180 s per question.

---

## 1. Master canvas (applies to every scene)

```
┌─────────────────────────────────────────────────────────────┐
│  [logo-mark 48px]  EYEBROW · EPISODE 07 · LISTEN & REPEAT   │ ← top bar, 96px tall, bg #FFFFFF
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                                                             │
│                      STAGE ZONE                             │ ← main content, bg #F7F7FB
│                   (1640 × 760 safe area)                    │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░   practisEN.com                     │ ← footer, 64px, ink bar + progress
└─────────────────────────────────────────────────────────────┘
```

- Background: `#F7F7FB` (pn-bg). One decorative violet blob (`#A78BFA` @ 18% opacity) slowly drifting in the top-right, 32 px blur. Nothing else animated in the background.
- Top bar: white with a 1 px `#E8E8F0` bottom border. Logo mark 48 px left. Eyebrow in JetBrains Mono 14 px, letter-spacing 0.15em, uppercase, ink-3.
- Footer: 8 px ink progress bar on `#E8E8F0` track; right side shows `practisEN.com` in Nunito 14 px, ink-3.
- Motion rule from brand: only **one** violet element animates per frame. Easing `cubic-bezier(.2,.8,.2,1)`. Enter 320 ms, micro 160 ms.

---

## 2. Scene skeleton (shared across both task types)

| # | Scene | Duration | Purpose |
|---|---|---|---|
| S1 | Cold open title card | 0:00 – 0:05 | Episode number + task name |
| S2 | Task brief + scoring criteria | 0:05 – 0:15 | What's being tested |
| S3 | Question presentation | 0:15 – 0:30 | Show the prompt, plus any audio for "Listen and Repeat" |
| S4 | Your-turn countdown | 0:30 – 0:45 | Learner attempts silently; 12–15 s timer |
| S5 | Model answer reveal | 0:45 – 1:30 | Ideal response, chunked |
| S6 | Breakdown / explanation | 1:30 – 2:30 | Why it works: structure, vocab, phonetics |
| S7 | One-line takeaway | 2:30 – 2:45 | Summary card |
| S8 | CTA + next episode | 2:45 – 3:00 | Push to practisEN.com |

Each scene below specifies **visual directions** (what Remotion/AE renders) and **narration** (what TTS speaks) on the same timeline.

---

## 3. Video prompt — reusable template

> Paste this block into your motion tool as the shot list. Replace every `{{placeholder}}` with content from the source book (The Official Guide to the TOEFL iBT, academic vocabulary list, or the learner's own question bank).

```yaml
episode:
  number: "{{07}}"
  task_type: "{{Listen and Repeat | Take an Interview}}"
  source: "{{e.g. Official Guide to the TOEFL iBT, p.142}}"
  duration_sec: 180
  aspect: "16:9"
  resolution: "1920x1080"
  fps: 30

brand:
  primary: "#7030E0"
  primary_dark: "#5B23BE"
  accent: "#A78BFA"
  ink: "#0B0B1E"
  bg: "#F7F7FB"
  card: "#FFFFFF"
  line: "#E8E8F0"
  fonts:
    display: "Baloo 2 / 800"
    body: "Nunito / 400-700"
    mono: "JetBrains Mono / 500"

constants:
  top_bar_height: 96
  footer_height: 64
  stage_safe_area: "1640x760"
  enter_ms: 320
  micro_ms: 160
  easing: "cubic-bezier(.2,.8,.2,1)"
  text_min_px: 32        # minimum on 1920x1080
  card_radius: 20
  card_shadow: "0 8px 24px rgba(11,11,30,.08)"

scenes:

  - id: S1
    t_in: 0.0
    t_out: 5.0
    layout: "centered title card"
    elements:
      - logomark: { size: 88, y: 360, anim: "scale 0.9→1 + fade, 320ms" }
      - eyebrow: "EPISODE {{07}} · {{TASK_TYPE_UPPERCASE}}"
      - h1: "{{Episode title, 4–7 words, e.g. 'Nail the rhythm of long sentences'}}"
      - sub: "practised in {{~3 minutes}}"
    anim: "h1 enters with mask-reveal left→right over 480ms"

  - id: S2
    t_in: 5.0
    t_out: 15.0
    layout: "two-column: left label, right bullets"
    elements:
      - eyebrow: "WHAT'S BEING TESTED"
      - bullets:
        # For Listen and Repeat:
        - "Pronunciation clarity"
        - "Stress and rhythm"
        - "Connected speech"
        # For Take an Interview:
        - "Task response"
        - "Coherence and structure"
        - "Range of vocabulary and grammar"
    anim: "bullets stagger in, 120ms each"

  - id: S3
    t_in: 15.0
    t_out: 30.0
    layout: "single large card"
    elements:
      - eyebrow: "PROMPT"
      - card:
          content: "{{QUESTION_TEXT}}"
          font: "Baloo 2 / 800 / 56px / line-height 1.15"
          color: "ink"
      # For Listen and Repeat only — add an animated waveform above the text:
      - waveform: { height: 80, bars: 48, color: "primary", sync_to_audio: true }
      # For Take an Interview only — add a quote-mark accent:
      - quote_glyph: { char: "“", size: 160, color: "accent", opacity: 0.25, pos: "top-left -12px" }

  - id: S4
    t_in: 30.0
    t_out: 45.0
    layout: "countdown"
    elements:
      - eyebrow: "YOUR TURN"
      - instruction: "{{Repeat it out loud | Answer now}}"
      - ring_timer: { duration_sec: 12, stroke: 8, color: "primary", track: "line" }
      - hint: "No rewinds. Keep going even if you stumble."
    anim: "ring drains clockwise; final 3 sec the ring pulses at 160ms"

  - id: S5
    t_in: 45.0
    t_out: 90.0
    layout: "stacked chunks"
    elements:
      - eyebrow: "MODEL ANSWER"
      # For Listen and Repeat:
      - sentence_chunks:
          # Each chunk is a thought group, shown one at a time with a gentle highlight:
          - text: "{{chunk 1}}"
            stress_syllables: ["{{HEAV-y}}", "{{RAIN}}"]   # ALL-CAPS marker
            intonation_arrow: "↗"                          # ↗ rising, ↘ falling, → flat
          - text: "{{chunk 2}}"
            stress_syllables: ["{{MATCH}}", "{{CON-tin-ued}}"]
            intonation_arrow: "↘"
      # For Take an Interview:
      - answer_blocks:
          - label: "OPENER"
            text: "{{1 sentence setting the scene}}"
          - label: "STORY"
            text: "{{2–3 sentences: Situation → Task → Action}}"
          - label: "RESULT"
            text: "{{1 sentence outcome with a number or concrete detail}}"
          - label: "CLOSE"
            text: "{{1 sentence reflection or lesson}}"
    anim: "each chunk mask-reveals; previous chunk dims to ink-3"

  - id: S6
    t_in: 90.0
    t_out: 150.0
    layout: "annotation view"
    elements:
      - eyebrow: "WHY IT WORKS"
      # For Listen and Repeat — IPA + linking arcs:
      - ipa_line: "{{/dɪˈspaɪt ðə ˈhɛv.i ˈreɪn/}}"
      - linking_arcs:
          - { from: "heavy", to: "rain", kind: "consonant-vowel" }
          - { from: "match", to: "continued", kind: "elision" }
      - note_cards:
          - "Stress lands on content words, never on *the*, *of*, *in*."
          - "Link final consonant to next vowel: *heavy‿rain*."
      # For Take an Interview — structure labels + vocab pops:
      - structure_callout: "S.T.A.R. — Situation, Task, Action, Result"
      - vocab_pops:
          - { word: "{{prioritise}}", gloss: "decide what matters first", cefr: "B2" }
          - { word: "{{a tight deadline}}", gloss: "collocation, natural", cefr: "B2" }
    anim: "arcs draw left→right in 480ms; vocab pops slide up from bottom, 160ms each"

  - id: S7
    t_in: 150.0
    t_out: 165.0
    layout: "single line"
    elements:
      - eyebrow: "TAKEAWAY"
      - h2: "{{One-sentence rule, max 10 words}}"
    anim: "type-on effect, 40ms per char"

  - id: S8
    t_in: 165.0
    t_out: 180.0
    layout: "CTA"
    elements:
      - logo_full: { size: 280, y: 380 }
      - cta: "practisEN.com  ·  English, practised daily."
      - next_tease: "NEXT · {{Episode 08 — Read Aloud under pressure}}"
    anim: "logo fade in, cta slides up 12px on entry"

audio_bed:
  music: "soft ambient piano, -26 LUFS, duck to -38 LUFS when narration plays"
  sfx:
    scene_change: "subtle paper-swipe, -30 dB"
    reveal: "soft chime on each chunk reveal, -32 dB"
    timer_end: "single low tick when ring finishes"

export:
  video: "ProRes 422 HQ master + H.264 1080p for social"
  subtitles: "burn-in optional; always export .srt"
```

---

## 4. Narration script (timecoded, bilingual)

Voices:

- `V1_AR` — Arabic explainer, warm and direct (matches brand voice: "Say it out loud.")
- `V2_EN` — native English, neutral North American or RP, confident, clear.
- Lines marked `[PAUSE 1.2]` mean a silent beat of that many seconds.
- Lines marked `[SYNC:Sx]` tie to scene IDs above so the editor aligns audio cuts to scene transitions.

```
00:00.0  [SYNC:S1]  V1_AR: ‏الحلقة {{٧}}. اليوم نتمرن على {{Listen and Repeat | Take an Interview}}.
00:03.5              V1_AR: ‏خذ نفسًا، وركّز.
00:05.0  [SYNC:S2]  V1_AR: ‏هذا السؤال يقيس ثلاث مهارات.
00:07.5              V1_AR: ‏أولًا، {{وضوح النطق | الاستجابة للسؤال}}.
00:10.0              V1_AR: ‏ثانيًا، {{النبر والإيقاع | تماسك الجواب}}.
00:12.5              V1_AR: ‏ثالثًا، {{وصل الكلمات | تنوّع المفردات والتراكيب}}.
00:15.0  [SYNC:S3]  V1_AR: ‏اسمع السؤال.
00:16.5              V2_EN: {{QUESTION_TEXT — read once, natural pace}}
00:22.0              V2_EN: {{QUESTION_TEXT — read a second time, same pace}}          ; only for Listen & Repeat
00:28.0              V1_AR: ‏جاهز؟
00:30.0  [SYNC:S4]  V1_AR: ‏دورك الآن. لا توقف التسجيل.
00:32.0              [PAUSE 13.0]                                                       ; silent countdown, only ring animates
00:45.0  [SYNC:S5]  V1_AR: ‏هذا الجواب النموذجي. ركّز على {{الإيقاع | البناء}}.
00:48.0              V2_EN: {{chunk 1 | OPENER}}
00:52.0              V2_EN: {{chunk 2 | STORY}}
00:58.0              V2_EN: {{chunk 3 | RESULT}}
01:06.0              V2_EN: {{chunk 4 | CLOSE}}
01:12.0              V1_AR: ‏لاحظ كيف {{نزل الصوت في النهاية | بدأ الجواب بجملة مشهد واضحة}}.
01:30.0  [SYNC:S6]  V1_AR: ‏لماذا يعمل هذا الجواب؟
01:33.0              V1_AR: ‏النبر يقع دائمًا على الكلمات الحاملة للمعنى.
01:38.0              V2_EN: HEAV-y  RAIN.  MATCH  con-TIN-ued.                          ; for Listen & Repeat
01:43.0              V1_AR: ‏الحروف الساكنة تتصل بالحرف المتحرك الذي يليها.
01:48.0              V2_EN: heavy‿rain.  match‿continued.
01:55.0              V1_AR: ‏استخدم بنية S.T.A.R.: موقف، مهمة، فعل، نتيجة.               ; for Take an Interview
02:02.0              V1_AR: ‏وكلمات مثل {{prioritise}} و {{a tight deadline}} ترفع مستوى جوابك فورًا.
02:20.0              V1_AR: ‏تابع تمرّن على هذه المهارة يوميًا لمدة أسبوع.
02:30.0  [SYNC:S7]  V1_AR: ‏القاعدة الذهبية اليوم:
02:32.5              V2_EN: {{One-sentence rule, max 10 words.}}
02:45.0  [SYNC:S8]  V1_AR: ‏تمرّن يوميًا على practisEN.com.
02:49.0              V1_AR: ‏في الحلقة القادمة: {{Episode 08 — Read Aloud under pressure}}.
02:55.0              V1_AR: ‏إلى اللقاء.
03:00.0  [END]
```

---

## 5. Filled example A — Listen and Repeat

Source sentence (TOEFL iBT-style rhythm drill):

> **Despite the heavy rain, the match continued without any interruption.**

Key replacements:

- `QUESTION_TEXT` = the sentence above.
- Chunks: `Despite the heavy rain,` (↘ comma drop) · `the match continued` (→) · `without any interruption.` (↘ final fall).
- Stress syllables: **de-SPITE**, **HEA-vy**, **RAIN**, **MATCH**, **con-TIN-ued**, **in-ter-RUP-tion**.
- IPA line: `/dɪˈspaɪt ðə ˈhɛv.i ˈreɪn // ðə ˈmætʃ kənˈtɪn.juːd // wɪˈðaʊt ˈɛn.i ˌɪn.təˈrʌp.ʃən/`.
- Linking arcs: `heavy‿rain` (consonant-to-vowel), `match‿continued` (assimilation).
- Takeaway: *Stress the meaning words, let the function words shrink.*

## 6. Filled example B — Take an Interview

Source question (behavioral interview style):

> **Tell me about a time you had to learn something new quickly. What did you do, and what was the result?**

Key replacements:

- OPENER: *Last year I joined a team that used a tool I'd never touched — Figma.*
- STORY: *I was asked to ship a prototype in four days. I blocked two hours every morning for hands-on practice, rebuilt a screen I admired, and asked a teammate for a thirty-minute review on day three.*
- RESULT: *The prototype shipped on time, and leadership used it in the next all-hands.*
- CLOSE: *Since then I always schedule daily deliberate practice whenever I adopt a new tool.*
- Vocab pops: *prioritise, a tight deadline, hands-on, ship on time, deliberate practice.*
- Takeaway: *Answer in a shape: Situation, Task, Action, Result — then one lesson.*

---

## 7. Generating the two tracks and syncing them

### 7.1 Render the video

Use **Remotion** (React-based, perfect for text-heavy educational videos). A component consuming the `scenes` block above produces deterministic output and the timecodes in the narration script will line up exactly.

If using After Effects instead, the `scenes` block becomes the shot list — each scene is a comp, timeline snaps to the same `t_in` / `t_out`.

### 7.2 Generate narration

Chunk the script into lines per `V1_AR` / `V2_EN` speaker and feed each line to your TTS tool separately. Save each line as `sNN_line.wav` so you can re-render one line without re-rendering the whole track. Example with ElevenLabs:

```
curl -X POST https://api.elevenlabs.io/v1/text-to-speech/{{VOICE_ID}} \
  -H "xi-api-key: $ELEVENLABS_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"‏الحلقة سبع. اليوم نتمرن على Listen and Repeat.","model_id":"eleven_multilingual_v2"}' \
  -o s01_line01.wav
```

### 7.3 Build the narration track at exact timestamps

Write a small `timeline.txt` with every line and its start time, then compose with ffmpeg's `adelay` + `amix`:

```
# timeline.txt
00:00.0  s01_line01.wav
00:03.5  s01_line02.wav
00:05.0  s02_line01.wav
...
```

Script to mix (bash):

```bash
#!/usr/bin/env bash
inputs=()
filters=()
i=0
while read -r ts file; do
  ms=$(python3 -c "m,s=\"$ts\".split(':');print(int((int(m)*60+float(s))*1000))")
  inputs+=( -i "$file" )
  filters+=( "[$i:a]adelay=${ms}|${ms}[a$i]" )
  i=$((i+1))
done < timeline.txt

mix=$(printf "[a%d]" $(seq 0 $((i-1))))
filter_complex="${filters[*]};${mix}amix=inputs=${i}:normalize=0[out]"

ffmpeg "${inputs[@]}" -filter_complex "$filter_complex" -map "[out]" narration.wav
```

### 7.4 Mux narration under the video

```bash
ffmpeg -i episode_07_video.mp4 -i narration.wav -i music_bed.wav \
  -filter_complex "[2:a]volume=0.18[m];[1:a][m]amix=inputs=2:normalize=0[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k episode_07_final.mp4
```

### 7.5 Subtitle file

Emit the narration script as `.srt` using the same timecodes. Tools like `ffmpeg` or Descript can embed or burn these in. For Arabic lines, set `WritingDirection: RTL` in the subtitle styling.

---

## 8. When to use an AI video tool (and when not to)

- **Good fit:** short 2–4 s background textures looping behind the top bar (e.g., soft violet paper grain, slow-drifting dust motes, abstract ink bloom). Render once, import as a looping `.mp4`.
- **Never:** do not let a text-to-video model render any slide that contains the question, model answer, or IPA — text will render as gibberish and break the pedagogy.
- **If Pixa / Runway / Kling is used for backgrounds:** prompt example — *"slow-drifting soft violet #7030E0 ink blooms on off-white paper, light grain, 4-second seamless loop, no people, no text, minimal, cinematic, 1920x1080."*

---

## 9. Asset checklist per episode

- [ ] `episode_XX_video.mp4` (ProRes master + H.264 1080p)
- [ ] `episode_XX.srt` (bilingual, AR lines marked RTL)
- [ ] `narration.wav` (mixed timeline)
- [ ] `music_bed.wav` (ambient, -26 LUFS)
- [ ] 9:16 cut for Shorts/Reels (re-center stage zone)
- [ ] Thumbnail 1280×720 (logo mark + episode number + task type eyebrow)
