import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { Logo } from "./Logo";

const { fontFamily: montserrat } = loadMontserrat("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

const NAVY = "#1A1AAA";
const LIGHT_BLUE = "#D6E4F5";
const ACCENT = "#2E2EDB";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeIn = Easing.bezier(0.4, 0, 1, 1);

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoIn = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const wordmarkIn = interpolate(frame, [0.4 * fps, 0.9 * fps], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sloganProgress = interpolate(
    frame,
    [1.0 * fps, 2.2 * fps],
    [0, 1],
    {
      easing: Easing.bezier(0.45, 0, 0.55, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 0.4 * fps, durationInFrames],
    [1, 0],
    {
      easing: easeIn,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const logoScale = interpolate(logoIn, [0, 1], [0.6, 1]);
  const logoOpacity = logoIn;

  const wordmarkOpacity = wordmarkIn;
  const wordmarkX = interpolate(wordmarkIn, [0, 1], [-30, 0]);

  const words = ["English.", "Smarter.", "Faster."];
  const wordTiming = [0, 0.33, 0.66];

  const bgShift = interpolate(frame, [0, durationInFrames], [0, 1]);
  const bgHue = interpolate(bgShift, [0, 1], [0, 10]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 45%, #FFFFFF 0%, #F3F6FC 60%, #E6ECF7 100%)`,
        fontFamily: montserrat,
        opacity: fadeOut,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${50 + bgHue}% 55%, ${LIGHT_BLUE}33 0%, transparent 55%)`,
          opacity: 0.7,
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div
              style={{
                transform: `scale(${logoScale})`,
                opacity: logoOpacity,
                filter: `drop-shadow(0 12px 28px ${NAVY}26)`,
              }}
            >
              <Logo size={220} navy={NAVY} light={LIGHT_BLUE} />
            </div>

            <div
              style={{
                opacity: wordmarkOpacity,
                transform: `translateX(${wordmarkX}px)`,
                fontSize: 110,
                fontWeight: 700,
                color: NAVY,
                letterSpacing: -2,
                lineHeight: 1,
                WebkitTextStroke: `2px ${LIGHT_BLUE}`,
              }}
            >
              Practis<span style={{ color: ACCENT }}> EN</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 22,
              marginTop: 10,
              minHeight: 70,
            }}
          >
            {words.map((w, i) => {
              const start = wordTiming[i];
              const end = start + 0.25;
              const wp = interpolate(sloganProgress, [start, end], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: easeOut,
              });
              const op = wp;
              const y = interpolate(wp, [0, 1], [18, 0]);
              const isAccent = i === 2;
              return (
                <span
                  key={w}
                  style={{
                    opacity: op,
                    transform: `translateY(${y}px)`,
                    fontSize: 44,
                    fontWeight: isAccent ? 800 : 600,
                    color: isAccent ? ACCENT : NAVY,
                    letterSpacing: 0.5,
                  }}
                >
                  {w}
                </span>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 70,
        }}
      >
        <div
          style={{
            opacity: interpolate(
              frame,
              [1.6 * fps, 2.1 * fps],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: easeOut,
              },
            ),
            fontSize: 22,
            color: NAVY,
            letterSpacing: 4,
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          practisen.com
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
