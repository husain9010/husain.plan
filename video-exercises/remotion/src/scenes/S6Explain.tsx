import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {brand, fonts} from '../brand';
import {Chrome} from '../components/Chrome';
import {fadeUp, brandEasing} from '../components/anim';
import {episode01} from '../episode01-data';

export const S6Explain: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const arcProgress = interpolate(frame, [0.5 * fps, (0.5 + 0.48 * 3) * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: brandEasing,
  });

  return (
    <Chrome eyebrow="WHY IT WORKS">
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 140px',
          gap: 32,
          justifyContent: 'center',
        }}
      >
        <div style={fadeUp(frame, 0.0, fps)}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: brand.primary,
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            IPA transcription
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 44,
              color: brand.ink,
              letterSpacing: '0.01em',
              lineHeight: 1.4,
            }}
          >
            {episode01.ipa}
          </div>
        </div>

        <div style={{marginTop: 16}}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: brand.primary,
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            Linking — final consonant links to next vowel
          </div>
          <svg width={1640} height={160}>
            <text
              x={0}
              y={90}
              fontFamily={fonts.display}
              fontSize={56}
              fontWeight={800}
              fill={brand.ink}
              letterSpacing="-0.01em"
            >
              heavy‿rain · match‿continued · without‿any
            </text>
            {[
              {x1: 110, x2: 260},
              {x1: 440, x2: 680},
              {x1: 990, x2: 1140},
            ].map((arc, i) => {
              const cx = (arc.x1 + arc.x2) / 2;
              const visible = arcProgress > i / 3;
              const localT = Math.min(1, Math.max(0, (arcProgress - i / 3) * 3));
              const rx = (arc.x2 - arc.x1) / 2;
              const path = `M ${arc.x1} 95 Q ${cx} ${
                95 - 60 * localT
              } ${arc.x2} 95`;
              return (
                <path
                  key={i}
                  d={path}
                  stroke={brand.primary}
                  strokeWidth={4}
                  fill="none"
                  opacity={visible ? 1 : 0}
                />
              );
            })}
          </svg>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            marginTop: 8,
          }}
        >
          {episode01.notes.map((note, i) => (
            <div
              key={note}
              style={{
                background: brand.card,
                border: `1px solid ${brand.line}`,
                borderRadius: 20,
                padding: '28px 32px',
                boxShadow: '0 8px 24px rgba(11,11,30,0.06)',
                fontFamily: fonts.body,
                fontSize: 26,
                lineHeight: 1.4,
                color: brand.ink,
                fontWeight: 600,
                ...fadeUp(frame, 2.2 + i * 0.18, fps),
              }}
            >
              {note}
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
};
