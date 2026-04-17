import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const NAVY = "#1A1AAA";
const LIGHT_BLUE = "#D6E4F5";
const ACCENT = "#2E2EDB";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeIn = Easing.bezier(0.4, 0, 1, 1);

const FONT_STACK =
  '"Helvetica Neue", "Arial Black", "Segoe UI", Arial, sans-serif';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const iconIn = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const crossFade = interpolate(frame, [0.7 * fps, 1.2 * fps], [0, 1], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sloganProgress = interpolate(
    frame,
    [1.2 * fps, 2.4 * fps],
    [0, 1],
    {
      easing: Easing.bezier(0.45, 0, 0.55, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const urlOpacity = interpolate(
    frame,
    [1.8 * fps, 2.3 * fps],
    [0, 1],
    {
      easing: easeOut,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 0.35 * fps, durationInFrames],
    [1, 0],
    {
      easing: easeIn,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const iconScale = interpolate(iconIn, [0, 1], [0.55, 1]);
  const iconOpacity = iconIn * (1 - crossFade);
  const fullOpacity = crossFade;
  const fullScale = interpolate(crossFade, [0, 1], [0.92, 1]);

  const words = ["English.", "Smarter.", "Faster."];
  const wordTiming = [0, 0.33, 0.66];

  return (
    <AbsoluteFill
      style={{
        background: "#FFFFFF",
        fontFamily: FONT_STACK,
        opacity: fadeOut,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 45%, ${LIGHT_BLUE}40 0%, transparent 55%)`,
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 1400,
            height: 500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              opacity: iconOpacity,
              transform: `scale(${iconScale})`,
              filter: `drop-shadow(0 12px 28px ${NAVY}20)`,
            }}
          >
            <Img
              src={staticFile("logo-icon.png")}
              style={{ width: 1400, height: 500, objectFit: "contain" }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              opacity: fullOpacity,
              transform: `scale(${fullScale})`,
              filter: `drop-shadow(0 14px 32px ${NAVY}22)`,
            }}
          >
            <Img
              src={staticFile("logo-full.png")}
              style={{ width: 1400, height: 500, objectFit: "contain" }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 26,
            marginTop: 40,
            minHeight: 80,
          }}
        >
          {words.map((w, i) => {
            const start = wordTiming[i];
            const end = start + 0.28;
            const wp = interpolate(sloganProgress, [start, end], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: easeOut,
            });
            const y = interpolate(wp, [0, 1], [22, 0]);
            const isAccent = i === 2;
            return (
              <span
                key={w}
                style={{
                  opacity: wp,
                  transform: `translateY(${y}px)`,
                  fontSize: 56,
                  fontWeight: isAccent ? 900 : 700,
                  color: isAccent ? ACCENT : NAVY,
                  letterSpacing: 0.5,
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 80,
        }}
      >
        <div
          style={{
            opacity: urlOpacity,
            fontSize: 26,
            color: NAVY,
            letterSpacing: 6,
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          practisen.com
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
