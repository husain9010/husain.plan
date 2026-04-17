import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MacBook } from "./MacBook";
import { Character } from "./Characters";

const AI_CYAN = "#5EE6FF";
const GOLD = "#F5D77A";
const PEACH = "#FFB58A";
const SUNSET_PINK = "#FF7BA8";
const SUNSET_ORANGE = "#FFA552";
const TEXT_DARK = "#0F1640";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const spring = Easing.bezier(0.34, 1.56, 0.64, 1);

const FONT_STACK =
  '"Helvetica Neue", "Arial Black", "Segoe UI", Arial, sans-serif';

const Bokeh: React.FC<{ seed: string; count: number }> = ({ seed, count }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const rx = random(`${seed}-x-${i}`);
        const ry = random(`${seed}-y-${i}`);
        const rs = random(`${seed}-s-${i}`);
        const rh = random(`${seed}-h-${i}`);
        const rp = random(`${seed}-p-${i}`);
        const phase = rp * Math.PI * 2;
        const x = rx * width + Math.sin(frame / 80 + phase) * 18;
        const y = ry * height * 0.7 + Math.cos(frame / 100 + phase) * 12;
        const size = 12 + rs * 60;
        const hueChoice = rh < 0.33 ? GOLD : rh < 0.66 ? PEACH : AI_CYAN;
        const opacity = 0.18 + rs * 0.35;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - size / 2,
              top: y - size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${hueChoice} 0%, ${hueChoice}00 70%)`,
              opacity,
              filter: "blur(4px)",
            }}
          />
        );
      })}
    </>
  );
};

const SteamWisp: React.FC<{ x: number; delay: number }> = ({ x, delay }) => {
  const frame = useCurrentFrame();
  const t = (frame - delay) / 60;
  if (t < 0) return null;
  const progress = (t % 1.5) / 1.5;
  const y = -progress * 140;
  const opacity = Math.sin(progress * Math.PI) * 0.5;
  const sway = Math.sin(progress * 5) * 8;
  return (
    <div
      style={{
        position: "absolute",
        left: x + sway,
        bottom: 0,
        width: 28,
        height: 28,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)",
        opacity,
        transform: `translateY(${y}px) scale(${1 + progress * 1.6})`,
        filter: "blur(6px)",
      }}
    />
  );
};

const FloatingBadge: React.FC<{
  progress: number;
  text: string;
  emoji: string;
  x: number;
  y: number;
  delay: number;
}> = ({ progress, text, emoji, x, y, delay }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(progress, [0, 1], [0.6, 1], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const float = Math.sin((frame + delay) / 28) * 6;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + float,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        padding: "10px 16px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
        border: `1.5px solid ${AI_CYAN}88`,
        boxShadow: `0 10px 28px rgba(8,8,74,0.2), 0 0 18px ${AI_CYAN}44`,
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: FONT_STACK,
        fontSize: 16,
        fontWeight: 700,
        color: TEXT_DARK,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: 18 }}>{emoji}</span>
      {text}
    </div>
  );
};

export const Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const s = (sec: number) => sec * fps;

  // Background fade in
  const bgIn = interpolate(frame, [0, s(0.6)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Outro fade
  const outro = interpolate(
    frame,
    [durationInFrames - s(0.5), durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Table slides up
  const tableIn = interpolate(frame, [s(0.2), s(1.0)], [0, 1], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tableY = interpolate(tableIn, [0, 1], [120, 0]);

  // MacBook entry
  const macbookEntry = interpolate(frame, [s(0.7), s(1.5)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // MacBook screen content frame
  const macMsgFrame = Math.max(0, frame - s(1.5));

  // Characters entry (man slightly first)
  const manEntry = interpolate(frame, [s(1.2), s(2.0)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const womanEntry = interpolate(frame, [s(1.4), s(2.2)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Amazed expressions ramp up after AI message appears (~3s)
  const amazedMan = interpolate(frame, [s(3.0), s(4.0)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const amazedWoman = interpolate(frame, [s(3.2), s(4.2)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating badges
  const badge1 = interpolate(frame, [s(4.5), s(5.0)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badge2 = interpolate(frame, [s(4.8), s(5.3)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badge3 = interpolate(frame, [s(5.1), s(5.6)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Brand reveal at the end
  const brandIn = interpolate(frame, [s(6.5), s(7.2)], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const brandY = interpolate(brandIn, [0, 1], [30, 0]);

  // Sun light pulse
  const sunPulse = 0.85 + Math.sin(frame / 50) * 0.15;

  return (
    <AbsoluteFill
      style={{
        opacity: outro,
        fontFamily: FONT_STACK,
      }}
    >
      {/* Sky / sunset gradient */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg,
            #2A1B5C 0%,
            #6B3A8C 30%,
            ${SUNSET_PINK} 55%,
            ${SUNSET_ORANGE} 75%,
            ${GOLD} 100%)`,
          opacity: bgIn,
        }}
      />

      {/* Sun */}
      <div
        style={{
          position: "absolute",
          left: width * 0.7,
          top: height * 0.42,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, #FFF4C2 0%, ${GOLD} 35%, ${SUNSET_ORANGE}00 75%)`,
          transform: `translate(-50%,-50%) scale(${sunPulse})`,
          opacity: bgIn * 0.9,
          filter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: width * 0.7,
          top: height * 0.42,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${SUNSET_ORANGE}55 0%, ${SUNSET_ORANGE}00 70%)`,
          transform: "translate(-50%,-50%)",
          opacity: bgIn * 0.8,
          filter: "blur(20px)",
        }}
      />

      {/* Distant city silhouette */}
      <svg
        viewBox="0 0 1920 200"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: height * 0.55,
          width: "100%",
          opacity: bgIn * 0.55,
        }}
      >
        <path
          d="M0 200 L0 130 L80 130 L80 90 L140 90 L140 110 L200 110 L200 70 L260 70 L260 100 L320 100 L320 60 L380 60 L380 110 L450 110 L450 80 L520 80 L520 50 L580 50 L580 100 L660 100 L660 75 L740 75 L740 95 L820 95 L820 60 L900 60 L900 105 L980 105 L980 80 L1060 80 L1060 50 L1140 50 L1140 100 L1220 100 L1220 75 L1300 75 L1300 95 L1380 95 L1380 60 L1460 60 L1460 105 L1540 105 L1540 80 L1620 80 L1620 50 L1700 50 L1700 100 L1780 100 L1780 75 L1860 75 L1860 110 L1920 110 L1920 200 Z"
          fill="#1A0E2E"
          opacity="0.85"
        />
        {/* Window lights */}
        {Array.from({ length: 60 }).map((_, i) => {
          const wx = random(`win-${i}`) * 1920;
          const wy = 60 + random(`winy-${i}`) * 100;
          const flick = Math.sin(frame / 30 + i) > -0.6 ? 1 : 0.3;
          return (
            <rect
              key={i}
              x={wx}
              y={wy}
              width="3"
              height="4"
              fill={GOLD}
              opacity={0.7 * flick}
            />
          );
        })}
      </svg>

      {/* Bokeh / fairy lights */}
      <div style={{ position: "absolute", inset: 0, opacity: bgIn }}>
        <Bokeh seed="bok" count={28} />
      </div>

      {/* String lights across top */}
      <svg
        viewBox="0 0 1920 220"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 220,
          opacity: bgIn * 0.85,
        }}
      >
        <path
          d="M-20 40 Q 480 180 960 100 T 1940 60"
          stroke="#3A2240"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        {Array.from({ length: 22 }).map((_, i) => {
          const t = i / 21;
          const cx = -20 + t * 1960;
          const cy =
            40 +
            Math.sin(t * Math.PI) * 100 +
            Math.cos(t * Math.PI * 2) * 20;
          const flick = 0.7 + Math.sin(frame / 12 + i * 1.3) * 0.3;
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r="14"
                fill={GOLD}
                opacity={0.25 * flick}
              />
              <circle cx={cx} cy={cy} r="5" fill="#FFF4C2" opacity={flick} />
            </g>
          );
        })}
      </svg>

      {/* Foreground: Cafe table surface */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: height * 0.42,
          background: `linear-gradient(180deg,
            #5C3A24 0%,
            #4A2E1B 30%,
            #2E1A10 100%)`,
          transform: `translateY(${tableY}px)`,
          boxShadow: "0 -10px 40px rgba(0,0,0,0.4)",
          borderTop: "2px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Wood grain hint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(90deg, transparent 0, transparent 80px, rgba(0,0,0,0.08) 80px, rgba(0,0,0,0.08) 82px)",
            opacity: 0.5,
          }}
        />
        {/* Warm reflection from MacBook */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "10%",
            transform: "translateX(-50%)",
            width: 900,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(ellipse, ${AI_CYAN}33 0%, ${AI_CYAN}00 70%)`,
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Coffee cup left */}
      <div
        style={{
          position: "absolute",
          left: width * 0.18,
          bottom: height * 0.06,
          width: 110,
          height: 90,
          opacity: tableIn,
          transform: `translateY(${tableY * 0.6}px)`,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: "linear-gradient(180deg, #FAFAFA 0%, #D4D4D4 100%)",
            borderRadius: "8px 8px 50% 50% / 8px 8px 20% 20%",
            border: "2px solid #B0B0B0",
            boxShadow: "0 8px 18px rgba(0,0,0,0.4)",
          }}
        >
          {/* Handle */}
          <div
            style={{
              position: "absolute",
              right: -22,
              top: 20,
              width: 24,
              height: 35,
              border: "5px solid #D4D4D4",
              borderLeft: "none",
              borderRadius: "0 50% 50% 0",
            }}
          />
          {/* Coffee top */}
          <div
            style={{
              position: "absolute",
              top: 6,
              left: 6,
              right: 6,
              height: 14,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, #4A2810 0%, #2A1608 100%)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)",
            }}
          />
        </div>
        {/* Steam */}
        <div style={{ position: "absolute", left: 30, top: -10, width: 50, height: 100 }}>
          <SteamWisp x={0} delay={0} />
          <SteamWisp x={15} delay={20} />
          <SteamWisp x={-5} delay={40} />
        </div>
      </div>

      {/* Notebook + pen right */}
      <div
        style={{
          position: "absolute",
          right: width * 0.16,
          bottom: height * 0.05,
          width: 140,
          height: 80,
          opacity: tableIn,
          transform: `translateY(${tableY * 0.6}px) rotate(-6deg)`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(180deg, #F5E6D3 0%, #D4B896 100%)",
            borderRadius: 6,
            border: "1px solid #8C6B4A",
            boxShadow: "0 6px 14px rgba(0,0,0,0.4)",
            position: "relative",
          }}
        >
          {/* Lines */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 12,
                right: 12,
                top: 14 + i * 14,
                height: 1,
                background: "#A8895E",
                opacity: 0.5,
              }}
            />
          ))}
        </div>
        {/* Pen */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: -8,
            width: 70,
            height: 6,
            background: "linear-gradient(90deg, #1A1A2A 0%, #4B6CFF 100%)",
            borderRadius: 3,
            transform: "rotate(20deg)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        />
      </div>

      {/* Characters */}
      <div
        style={{
          position: "absolute",
          left: width * 0.06,
          bottom: 0,
          zIndex: 5,
        }}
      >
        <Character entryProgress={manEntry} amazedProgress={amazedMan} side="left" />
      </div>
      <div
        style={{
          position: "absolute",
          right: width * 0.06,
          bottom: 0,
          zIndex: 5,
        }}
      >
        <Character
          entryProgress={womanEntry}
          amazedProgress={amazedWoman}
          side="right"
        />
      </div>

      {/* MacBook center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -45%)",
          zIndex: 6,
        }}
      >
        <MacBook
          entryProgress={macbookEntry}
          msgFrame={macMsgFrame}
          fps={fps}
        />
      </div>

      {/* Floating badges around the laptop */}
      <FloatingBadge
        progress={badge1}
        text="AI conversation coach"
        emoji="🤖"
        x={width * 0.05}
        y={height * 0.18}
        delay={0}
      />
      <FloatingBadge
        progress={badge2}
        text="Real-time feedback"
        emoji="⚡"
        x={width * 0.72}
        y={height * 0.14}
        delay={10}
      />
      <FloatingBadge
        progress={badge3}
        text="Personalized lessons"
        emoji="🎯"
        x={width * 0.7}
        y={height * 0.34}
        delay={20}
      />

      {/* Brand reveal at the bottom */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 38,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: brandIn,
          transform: `translateY(${brandY}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            padding: "10px 26px",
            borderRadius: 999,
            background: "rgba(8,8,74,0.55)",
            backdropFilter: "blur(14px)",
            border: `1.5px solid ${AI_CYAN}88`,
            boxShadow: `0 10px 30px rgba(0,0,0,0.45), 0 0 22px ${AI_CYAN}44`,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <Img
            src={staticFile("logo-full.png")}
            style={{ height: 36, width: "auto" }}
          />
          <div
            style={{
              width: 1,
              height: 26,
              background: "rgba(255,255,255,0.3)",
            }}
          />
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            English. Smarter. Faster.
          </div>
        </div>
      </div>

      {/* Subtle vignette */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
