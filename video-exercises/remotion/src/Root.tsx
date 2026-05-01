import React from 'react';
import {Composition, staticFile} from 'remotion';
import {Episode01} from './Episode01';

const fontFaceCSS = `
@font-face {
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 800;
  src: url('${staticFile('fonts/Baloo2-800.woff2')}') format('woff2');
  font-display: block;
}
@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400 900;
  src: url('${staticFile('fonts/Nunito-var.woff2')}') format('woff2-variations');
  font-display: block;
}
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  src: url('${staticFile('fonts/JetBrainsMono-500.woff2')}') format('woff2');
  font-display: block;
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = fontFaceCSS;
  document.head.appendChild(style);
}

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Episode01"
        component={Episode01}
        durationInFrames={180 * 30}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
