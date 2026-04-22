import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {brand, fonts} from '../brand';
import {Chrome} from '../components/Chrome';
import {episode01} from '../episode01-data';

export const S7Takeaway: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const text = episode01.takeaway;
  const charsPerSec = 28;
  const shown = Math.min(
    text.length,
    Math.floor((frame / fps) * charsPerSec),
  );

  return (
    <Chrome eyebrow="TAKEAWAY">
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: 120,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 18,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: brand.primary,
            fontWeight: 500,
          }}
        >
          The rule
        </div>
        <h2
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 96,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            color: brand.ink,
            textAlign: 'center',
            maxWidth: 1500,
            margin: 0,
          }}
        >
          {text.slice(0, shown)}
          <span
            style={{
              opacity: shown < text.length ? 1 : 0,
              color: brand.primary,
            }}
          >
            |
          </span>
        </h2>
      </div>
    </Chrome>
  );
};
