import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {brand, fonts} from '../brand';
import {Chrome} from '../components/Chrome';
import {fadeUp} from '../components/anim';
import {episode01} from '../episode01-data';

export const S2Brief: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <Chrome eyebrow="WHAT'S BEING TESTED">
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 80,
          padding: '80px 140px',
          alignItems: 'center',
        }}
      >
        <div style={fadeUp(frame, 0.0, fps)}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 16,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: brand.primary,
              fontWeight: 500,
              marginBottom: 24,
            }}
          >
            Listen &amp; Repeat
          </div>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 800,
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: brand.ink,
            }}
          >
            Three things you're being scored on.
          </div>
        </div>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {episode01.whatsTested.map((item, i) => (
            <li
              key={item}
              style={{
                background: brand.card,
                border: `1px solid ${brand.line}`,
                borderRadius: 20,
                padding: '24px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                boxShadow: '0 8px 24px rgba(11,11,30,0.06)',
                ...fadeUp(frame, 0.4 + i * 0.18, fps),
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 999,
                  background: brand.primary,
                  color: '#FFF',
                  fontFamily: fonts.display,
                  fontWeight: 800,
                  fontSize: 22,
                  display: 'grid',
                  placeItems: 'center',
                  flex: '0 0 auto',
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 32,
                  fontWeight: 700,
                  color: brand.ink,
                }}
              >
                {item}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Chrome>
  );
};
