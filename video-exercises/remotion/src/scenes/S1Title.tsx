import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {brand, fonts} from '../brand';
import {Chrome, LogoMark} from '../components/Chrome';
import {fadeUp, maskReveal, brandEasing} from '../components/anim';
import {episode01} from '../episode01-data';

export const S1Title: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logoScale = interpolate(frame, [0, 10], [0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: brandEasing,
  });
  const logoOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Chrome eyebrow={`EPISODE ${episode01.number} · ${episode01.taskType}`}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: 64,
        }}
      >
        <div style={{opacity: logoOpacity, transform: `scale(${logoScale})`}}>
          <LogoMark size={88} />
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 18,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: brand.primary,
            fontWeight: 500,
            ...fadeUp(frame, 0.3, fps),
          }}
        >
          Episode {episode01.number}
        </div>
        <h1
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 88,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: brand.ink,
            margin: 0,
            textAlign: 'center',
            maxWidth: 1400,
            ...maskReveal(frame, 0.5, fps, 480),
          }}
        >
          {episode01.title}
        </h1>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 28,
            color: brand.ink3,
            fontWeight: 500,
            ...fadeUp(frame, 1.0, fps),
          }}
        >
          {episode01.subtitle}
        </div>
      </div>
    </Chrome>
  );
};
