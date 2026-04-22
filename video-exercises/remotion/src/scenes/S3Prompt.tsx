import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {brand, fonts} from '../brand';
import {Chrome} from '../components/Chrome';
import {maskReveal} from '../components/anim';
import {episode01} from '../episode01-data';

const Waveform: React.FC<{frame: number; fps: number}> = ({frame, fps}) => {
  const bars = 48;
  const t = frame / fps;
  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        alignItems: 'center',
        justifyContent: 'center',
        height: 96,
      }}
    >
      {Array.from({length: bars}).map((_, i) => {
        const phase = i * 0.35;
        const h = 16 + Math.abs(Math.sin(t * 4 + phase)) * 72;
        return (
          <div
            key={i}
            style={{
              width: 6,
              height: h,
              borderRadius: 3,
              background: brand.primary,
              opacity: 0.85,
            }}
          />
        );
      })}
    </div>
  );
};

export const S3Prompt: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cardOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Chrome eyebrow="PROMPT · LISTEN CAREFULLY">
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 64,
          padding: 100,
        }}
      >
        <Waveform frame={frame} fps={fps} />
        <div
          style={{
            background: brand.card,
            border: `1px solid ${brand.line}`,
            borderRadius: 28,
            padding: '72px 88px',
            maxWidth: 1500,
            boxShadow: '0 12px 32px rgba(11,11,30,0.08)',
            opacity: cardOpacity,
            ...maskReveal(frame, 0.3, fps, 600),
          }}
        >
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 800,
              fontSize: 64,
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
              color: brand.ink,
              textAlign: 'center',
            }}
          >
            {episode01.prompt}
          </div>
        </div>
      </div>
    </Chrome>
  );
};
