import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {brand, fonts} from '../brand';
import {Chrome, LogoMark} from '../components/Chrome';
import {fadeUp} from '../components/anim';
import {episode01} from '../episode01-data';

export const S8CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <Chrome eyebrow="KEEP PRACTISING">
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          padding: 100,
        }}
      >
        <div style={fadeUp(frame, 0.0, fps)}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '20px 32px',
              borderRadius: 999,
              background: brand.card,
              border: `1px solid ${brand.line}`,
              boxShadow: '0 8px 24px rgba(11,11,30,0.06)',
            }}
          >
            <LogoMark size={56} />
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 800,
                fontSize: 40,
                color: brand.ink,
                letterSpacing: '-0.02em',
              }}
            >
              practisEN
            </div>
          </div>
        </div>

        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 64,
            color: brand.ink,
            textAlign: 'center',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            maxWidth: 1400,
            ...fadeUp(frame, 0.3, fps),
          }}
        >
          English, practised daily.
        </div>

        <div
          style={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: 32,
            color: brand.primary,
            ...fadeUp(frame, 0.6, fps),
          }}
        >
          practisEN.com
        </div>

        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 16,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: brand.ink3,
            marginTop: 40,
            ...fadeUp(frame, 1.2, fps),
          }}
        >
          {episode01.nextTease}
        </div>
      </div>
    </Chrome>
  );
};
