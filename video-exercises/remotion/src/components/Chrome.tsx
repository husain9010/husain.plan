import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {brand, fonts, canvas} from '../brand';

export const Chrome: React.FC<{
  eyebrow: string;
  children: React.ReactNode;
}> = ({eyebrow, children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();
  const progress = interpolate(frame, [0, durationInFrames - 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{background: brand.bg, fontFamily: fonts.body}}>
      <BackgroundBlob />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: canvas.topBarHeight,
          background: '#FFFFFF',
          borderBottom: `1px solid ${brand.line}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 48px',
          gap: 24,
        }}
      >
        <LogoMark size={48} />
        <div
          style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: brand.ink3,
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: canvas.topBarHeight,
          bottom: canvas.footerHeight,
          left: 0,
          right: 0,
          display: 'flex',
        }}
      >
        {children}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: canvas.footerHeight,
          background: '#FFFFFF',
          borderTop: `1px solid ${brand.line}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 48px',
          gap: 24,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 8,
            background: brand.line,
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              background: brand.ink,
              borderRadius: 999,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: 14,
            color: brand.ink3,
          }}
        >
          practisEN.com
        </div>
      </div>
    </AbsoluteFill>
  );
};

const BackgroundBlob: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const x = 1400 + Math.sin(t * 0.2) * 60;
  const y = 200 + Math.cos(t * 0.15) * 40;
  return (
    <svg
      width={canvas.width}
      height={canvas.height}
      style={{position: 'absolute', inset: 0, filter: 'blur(32px)'}}
    >
      <circle cx={x} cy={y} r={360} fill={brand.accent} opacity={0.18} />
    </svg>
  );
};

export const LogoMark: React.FC<{size: number}> = ({size}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: brand.primary,
        color: '#FFFFFF',
        display: 'grid',
        placeItems: 'center',
        fontFamily: fonts.display,
        fontWeight: 800,
        fontSize: size * 0.48,
        letterSpacing: '-0.04em',
      }}
    >
      pE
    </div>
  );
};
