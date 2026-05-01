import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {brand, fonts} from '../brand';
import {Chrome} from '../components/Chrome';
import {fadeUp, maskReveal} from '../components/anim';
import {episode01} from '../episode01-data';

const renderWithStress = (text: string, stresses: string[]) => {
  const tokens = text.split(/(\s+)/);
  const normalize = (w: string) =>
    w.replace(/[^a-zA-Z-]/g, '').toLowerCase();
  const stressKeys = stresses.map((s) =>
    s.replace(/-/g, '').toLowerCase(),
  );

  return tokens.map((tok, i) => {
    const key = normalize(tok);
    const isStressed = stressKeys.some((sk) => sk === key);
    return (
      <span
        key={i}
        style={{
          color: isStressed ? brand.primary : brand.ink,
          fontWeight: isStressed ? 800 : 500,
          textDecoration: isStressed ? 'underline' : 'none',
          textDecorationThickness: isStressed ? 4 : 0,
          textUnderlineOffset: 10,
        }}
      >
        {tok}
      </span>
    );
  });
};

export const S5Model: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const chunks = episode01.modelChunks;
  const totalDur = 45;
  const revealEach = totalDur / (chunks.length + 1);

  return (
    <Chrome eyebrow="MODEL ANSWER">
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 40,
          padding: '40px 140px',
        }}
      >
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 28,
            color: brand.ink3,
            fontWeight: 600,
            ...fadeUp(frame, 0.0, fps),
          }}
        >
          Three chunks. Breathe between them.
        </div>
        {chunks.map((chunk, i) => {
          const delay = 0.4 + i * revealEach;
          const activeStart = delay * fps;
          const activeEnd = (delay + revealEach) * fps;
          const isActive = frame >= activeStart && frame < activeEnd;
          const isPast = frame >= activeEnd;
          const opacity = isPast ? 0.35 : 1;

          return (
            <div
              key={i}
              style={{
                opacity,
                ...fadeUp(frame, delay, fps, 320),
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 28,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 14,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: brand.primary,
                    fontWeight: 500,
                  }}
                >
                  CHUNK {i + 1}
                </div>
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontSize: 40,
                    color: brand.ink2,
                  }}
                >
                  {chunk.arrow}
                </div>
              </div>
              <div
                style={{
                  fontFamily: fonts.display,
                  fontSize: 72,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  ...(isActive
                    ? maskReveal(frame, delay, fps, 480)
                    : {}),
                }}
              >
                {renderWithStress(chunk.text, chunk.stresses)}
              </div>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 20,
                  color: brand.ink3,
                  letterSpacing: '0.05em',
                  marginTop: 10,
                  fontWeight: 500,
                }}
              >
                stress → {chunk.stresses.join('  ·  ')}
              </div>
            </div>
          );
        })}
      </div>
    </Chrome>
  );
};
