import React from 'react';
import {Sequence, AbsoluteFill, useVideoConfig} from 'remotion';
import {S1Title} from './scenes/S1Title';
import {S2Brief} from './scenes/S2Brief';
import {S3Prompt} from './scenes/S3Prompt';
import {S4Timer} from './scenes/S4Timer';
import {S5Model} from './scenes/S5Model';
import {S6Explain} from './scenes/S6Explain';
import {S7Takeaway} from './scenes/S7Takeaway';
import {S8CTA} from './scenes/S8CTA';
import {sceneTimings} from './episode01-data';

const s = (inSec: number, outSec: number, fps: number) => ({
  from: Math.round(inSec * fps),
  durationInFrames: Math.round((outSec - inSec) * fps),
});

export const Episode01: React.FC = () => {
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sequence {...s(sceneTimings.s1.inSec, sceneTimings.s1.outSec, fps)}>
        <S1Title />
      </Sequence>
      <Sequence {...s(sceneTimings.s2.inSec, sceneTimings.s2.outSec, fps)}>
        <S2Brief />
      </Sequence>
      <Sequence {...s(sceneTimings.s3.inSec, sceneTimings.s3.outSec, fps)}>
        <S3Prompt />
      </Sequence>
      <Sequence {...s(sceneTimings.s4.inSec, sceneTimings.s4.outSec, fps)}>
        <S4Timer />
      </Sequence>
      <Sequence {...s(sceneTimings.s5.inSec, sceneTimings.s5.outSec, fps)}>
        <S5Model />
      </Sequence>
      <Sequence {...s(sceneTimings.s6.inSec, sceneTimings.s6.outSec, fps)}>
        <S6Explain />
      </Sequence>
      <Sequence {...s(sceneTimings.s7.inSec, sceneTimings.s7.outSec, fps)}>
        <S7Takeaway />
      </Sequence>
      <Sequence {...s(sceneTimings.s8.inSec, sceneTimings.s8.outSec, fps)}>
        <S8CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
