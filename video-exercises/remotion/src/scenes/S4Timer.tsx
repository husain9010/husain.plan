import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {brand, fonts} from '../brand';
import {Chrome} from '../components/Chrome';
import {fadeUp} from '../components/anim';
import {episode01} from '../episode01-data';

export const S4Timer: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const total = durationInFrames;
  const progress = interpolate(frame, [0, total - 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const radius = 220;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * progress;
  const secondsLeft = Math.max(0, episode01.timerSec - Math.floor((frame / fps)));
  const pulsePhase = frame / fps;
  const pulseScale =
    secondsLeft <= 3 ? 1 + Math.sin(pulsePhase * 20) * 0.03 : 1;

  return (
    <Chrome eyebrow="YOUR TURN">
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 48,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 72,
            color: brand.ink,
            letterSpacing: '-0.02em',
            ...fadeUp(frame, 0.0, fps),
          }}
        >
          {episode01.yourTurnInstruction}
        </div>
        <svg
          width={560}
          height={560}
          style={{transform: `scale(${pulseScale})`, transition: 'transform 160ms'}}
        >
          <circle
            cx={280}
            cy={280}
            r={radius}
            stroke={brand.line}
            strokeWidth={12}
            fill="none"
          />
          <circle
            cx={280}
            cy={280}
            r={radius}
            stroke={brand.primary}
            strokeWidth={12}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 280 280)`}
          />
          <text
            x={280}
            y={280}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={fonts.display}
            fontWeight={800}
            fontSize={200}
            fill={brand.ink}
            letterSpacing="-0.04em"
          >
            {secondsLeft}
          </text>
        </svg>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 26,
            color: brand.ink3,
            fontWeight: 500,
            ...fadeUp(frame, 0.4, fps),
          }}
        >
          No rewinds. Keep going even if you stumble.
        </div>
      </div>
    </Chrome>
  );
};
