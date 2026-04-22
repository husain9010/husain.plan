import {interpolate, Easing} from 'remotion';

export const brandEasing = Easing.bezier(0.2, 0.8, 0.2, 1);

export const fadeUp = (
  frame: number,
  delaySec: number,
  fps: number,
  durationMs = 320,
) => {
  const delayFrames = delaySec * fps;
  const durationFrames = (durationMs / 1000) * fps;
  const opacity = interpolate(
    frame,
    [delayFrames, delayFrames + durationFrames],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: brandEasing},
  );
  const y = interpolate(
    frame,
    [delayFrames, delayFrames + durationFrames],
    [12, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: brandEasing},
  );
  return {opacity, transform: `translateY(${y}px)`};
};

export const maskReveal = (
  frame: number,
  delaySec: number,
  fps: number,
  durationMs = 480,
) => {
  const delayFrames = delaySec * fps;
  const durationFrames = (durationMs / 1000) * fps;
  const clip = interpolate(
    frame,
    [delayFrames, delayFrames + durationFrames],
    [0, 100],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: brandEasing},
  );
  return {clipPath: `inset(0 ${100 - clip}% 0 0)`};
};
