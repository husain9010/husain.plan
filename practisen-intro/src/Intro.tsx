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
import { PhoneMockup } from "./PhoneMockup";

const NAVY_DEEP = "#08084A";
const NAVY = "#1A1AAA";
const LIGHT_BLUE = "#D6E4F5";
const ACCENT = "#4B6CFF";
const GOLD = "#F5D77A";
const AI_CYAN = "#5EE6FF";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeIn = Easing.bezier(0.4, 0, 1, 1);
const easeInOut = Easing.bezier(0.45, 0, 0.55, 1);
const spring = Easing.bezier(0.34, 1.56, 0.64, 1);

const FONT_STACK =
  '"Helvetica Neue", "Arial Black", "Segoe UI", Arial, sans-serif';

type NodePos = { x: number; y: number };

const NeuralNet: React.FC<{ opacity: number; seed: string }> = ({
  opacity,
  seed,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const nodeCount = 28;
  const nodes: NodePos[] = Array.from({ length: nodeCount }).map((_, i) => {
    const rx = random(`${seed}-n-${i}-x`);
    const ry = random(`${seed}-n-${i}-y`);
    const rp = random(`${seed}-n-${i}-p`);
    const phase = rp * Math.PI * 2;
    const x = rx * width + Math.sin(frame / 45 + phase) * 30;
    const y = ry * height + Math.cos(frame / 50 + phase) * 25;
    return { x, y };
  });

  const edges: Array<{ a: number; b: number; d: number }> = [];
  const maxDist = 360;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < maxDist) edges.push({ a: i, b: j, d });
    }
  }

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute", inset: 0 }}
      >
        {edges.map((e, i) => {
          const n1 = nodes[e.a];
          const n2 = nodes[e.b];
          const strength = 1 - e.d / maxDist;
          return (
            <line
              key={i}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke={AI_CYAN}
              strokeWidth={1}
              opacity={strength * 0.35}
            />
          );
        })}
        {nodes.map((n, i) => {
          const rs = random(`${seed}-n-${i}-s`);
          const rp = random(`${seed}-n-${i}-pulse`);
          const pulse =
            0.5 + 0.5 * Math.abs(Math.sin(frame / 15 + rp * Math.PI * 2));
          const size = 3 + rs * 3;
          return (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={size * (0.8 + pulse * 0.4)}
              fill={AI_CYAN}
              opacity={0.55 + pulse * 0.4}
              filter="url(#glow)"
            />
          );
        })}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </AbsoluteFill>
  );
};

type ParticleProps = {
  count: number;
  seed: string;
  color: string;
  sizeRange: [number, number];
  speed: number;
};

const Particles: React.FC<ParticleProps> = ({
  count,
  seed,
  color,
  sizeRange,
  speed,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill>
      {Array.from({ length: count }).map((_, i) => {
        const r1 = random(`${seed}-${i}-x`);
        const r2 = random(`${seed}-${i}-y`);
        const r3 = random(`${seed}-${i}-s`);
        const r4 = random(`${seed}-${i}-p`);
        const r5 = random(`${seed}-${i}-o`);

        const baseX = r1 * width;
        const baseY = r2 * height;
        const size = sizeRange[0] + r3 * (sizeRange[1] - sizeRange[0]);
        const phase = r4 * Math.PI * 2;

        const driftX = Math.sin(frame / 30 + phase) * 20 * speed;
        const driftY = -((frame * speed * (0.5 + r3)) % (height + 100));

        const x = baseX + driftX;
        const y = (baseY + driftY + height * 2) % height;

        const twinkle =
          0.3 + 0.7 * Math.abs(Math.sin(frame / 12 + phase));

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: color,
              opacity: twinkle * (0.4 + r5 * 0.6),
              filter: `blur(${size * 0.15}px)`,
              boxShadow: `0 0 ${size * 3}px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const LightRays: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const rotation = frame * 0.3;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          width: 2200,
          height: 2200,
          transform: `rotate(${rotation}deg)`,
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            ${ACCENT}22 8deg,
            transparent 16deg,
            transparent 40deg,
            ${AI_CYAN}26 48deg,
            transparent 56deg,
            transparent 90deg,
            ${ACCENT}20 98deg,
            transparent 106deg,
            transparent 140deg,
            ${AI_CYAN}22 148deg,
            transparent 156deg,
            transparent 190deg,
            ${ACCENT}22 198deg,
            transparent 206deg,
            transparent 240deg,
            ${AI_CYAN}26 248deg,
            transparent 256deg,
            transparent 290deg,
            ${ACCENT}20 298deg,
            transparent 306deg,
            transparent 340deg,
            ${AI_CYAN}22 348deg,
            transparent 356deg
          )`,
          maskImage:
            "radial-gradient(circle, black 10%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle, black 10%, transparent 70%)",
        }}
      />
    </AbsoluteFill>
  );
};

const ShineSweep: React.FC<{ progress: number; width: number }> = ({
  progress,
  width,
}) => {
  const x = interpolate(progress, [0, 1], [-width, width * 1.2]);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -100,
          bottom: -100,
          left: x,
          width: 220,
          transform: "skewX(-22deg)",
          background: `linear-gradient(90deg, transparent, ${LIGHT_BLUE}cc, #FFFFFFee, ${LIGHT_BLUE}cc, transparent)`,
          filter: "blur(4px)",
          opacity: progress > 0 && progress < 1 ? 1 : 0,
        }}
      />
    </div>
  );
};

const SparkleIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => {
  const frame = useCurrentFrame();
  const rot = (frame * 2) % 360;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <path
        d="M12 2 L13.5 9.5 L21 11 L13.5 12.5 L12 20 L10.5 12.5 L3 11 L10.5 9.5 Z"
        fill={color}
        filter="drop-shadow(0 0 6px currentColor)"
        style={{ color }}
      />
      <circle cx="19" cy="5" r="1.5" fill={color} />
      <circle cx="5" cy="19" r="1.2" fill={color} />
    </svg>
  );
};

const FloatingChip: React.FC<{
  text: string;
  color: string;
  x: number;
  y: number;
  delay: number;
  frame: number;
  fps: number;
  icon?: string;
}> = ({ text, color, x, y, delay, frame, fps, icon }) => {
  const progress = interpolate(
    frame,
    [delay, delay + 0.5 * fps],
    [0, 1],
    {
      easing: spring,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const exitProgress = interpolate(
    frame,
    [delay + 1.6 * fps, delay + 2.0 * fps],
    [0, 1],
    {
      easing: easeIn,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const floatY = Math.sin(frame / 25 + delay) * 6;
  const scale = interpolate(progress, [0, 1], [0.6, 1]);
  const opacity = progress * (1 - exitProgress);
  const translateY = interpolate(progress, [0, 1], [20, 0]) + floatY;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 20px",
        borderRadius: 999,
        background: "#FFFFFF",
        border: `2px solid ${color}`,
        boxShadow: `0 10px 28px ${color}44, 0 0 24px ${color}55`,
        fontSize: 20,
        fontWeight: 700,
        color: "#0F1640",
      }}
    >
      {icon && <span style={{ fontSize: 22 }}>{icon}</span>}
      {text}
    </div>
  );
};

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();

  const s = (sec: number) => sec * fps;

  const bgDark = interpolate(
    frame,
    [0, s(1.1), s(2.0), durationInFrames],
    [1, 1, 0.22, 0.15],
    {
      easing: easeInOut,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const iconScale = interpolate(frame, [0, s(0.7)], [0.2, 1], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const iconOpacityIn = interpolate(frame, [0, s(0.5)], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const iconRotate = interpolate(frame, [0, s(0.7)], [-18, 0], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const crossFade = interpolate(frame, [s(1.0), s(1.5)], [0, 1], {
    easing: easeInOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const iconOpacity = iconOpacityIn * (1 - crossFade);
  const fullOpacity = crossFade;
  const fullScale = interpolate(crossFade, [0, 1], [0.88, 1], {
    easing: easeOut,
  });

  const logoShrink = interpolate(frame, [s(1.5), s(2.0)], [1, 0.45], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoUp = interpolate(frame, [s(1.5), s(2.0)], [0, -400], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoReturn = interpolate(frame, [s(4.4), s(4.9)], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoScaleFinal = interpolate(logoReturn, [0, 1], [0.45, 0.75]);
  const logoYFinal = interpolate(logoReturn, [0, 1], [-400, -280]);

  const finalLogoScale = logoShrink * (1 - logoReturn) + logoScaleFinal * logoReturn;
  const finalLogoY = logoUp * (1 - logoReturn) + logoYFinal * logoReturn;

  const shineProgress = interpolate(frame, [s(0.8), s(1.4)], [0, 1], {
    easing: easeInOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const raysOpacity = interpolate(
    frame,
    [s(0.3), s(1.0), s(4.5), s(5.2)],
    [0, 0.9, 0.9, 0.0],
    {
      easing: easeInOut,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const neuralOpacity = interpolate(
    frame,
    [s(0.2), s(1.2), s(5.0), s(5.4)],
    [0, 0.85, 0.85, 0.2],
    {
      easing: easeInOut,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const phoneEntry = interpolate(frame, [s(2.0), s(2.6)], [0, 1], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneExit = interpolate(frame, [s(4.2), s(4.8)], [0, 1], {
    easing: easeIn,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const msgFrame = frame - s(2.3);

  const sloganStart = s(4.7);
  const words = ["English.", "Smarter.", "Faster."];
  const wordStart = [sloganStart, sloganStart + s(0.25), sloganStart + s(0.5)];

  const underlineProgress = interpolate(
    frame,
    [s(5.3), s(6.0)],
    [0, 1],
    {
      easing: easeOut,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const aiBadgeProgress = interpolate(frame, [s(5.5), s(6.0)], [0, 1], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const urlOpacity = interpolate(frame, [s(5.9), s(6.4)], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlY = interpolate(frame, [s(5.9), s(6.4)], [18, 0], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - s(0.4), durationInFrames],
    [1, 0],
    {
      easing: easeIn,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const logoBreath = 1 + Math.sin(frame / 40) * 0.012;

  return (
    <AbsoluteFill
      style={{
        background: "#FFFFFF",
        fontFamily: FONT_STACK,
        opacity: fadeOut,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${NAVY} 0%, ${NAVY_DEEP} 60%, #020222 100%)`,
          opacity: bgDark,
        }}
      />

      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${LIGHT_BLUE}55 0%, transparent 60%)`,
          opacity: 1 - bgDark * 0.7,
        }}
      />

      <NeuralNet opacity={neuralOpacity * 0.85} seed="ai" />

      <AbsoluteFill style={{ opacity: bgDark }}>
        <Particles
          count={40}
          seed="stars"
          color={LIGHT_BLUE}
          sizeRange={[2, 6]}
          speed={0.4}
        />
        <Particles
          count={14}
          seed="gold"
          color={GOLD}
          sizeRange={[3, 7]}
          speed={0.6}
        />
      </AbsoluteFill>

      <LightRays opacity={raysOpacity * 0.7} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 900,
            height: 900,
            marginLeft: -450,
            marginTop: -450,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT}55 0%, transparent 55%)`,
            filter: "blur(40px)",
            opacity: interpolate(
              frame,
              [s(0.2), s(1.2), s(5.2), durationInFrames],
              [0, 0.75, 0.75, 0.2],
              {
                easing: easeInOut,
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
            transform: `scale(${1 + Math.sin(frame / 25) * 0.04})`,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translateY(${finalLogoY}px) scale(${finalLogoScale})`,
            width: 1400,
            height: 460,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            perspective: 1200,
          }}
        >
          <div
            style={{
              position: "absolute",
              opacity: iconOpacity,
              transform: `scale(${iconScale * logoBreath}) rotate(${iconRotate}deg)`,
              filter: `drop-shadow(0 18px 40px ${ACCENT}66) drop-shadow(0 0 24px ${AI_CYAN}77)`,
            }}
          >
            <div style={{ position: "relative" }}>
              <Img
                src={staticFile("logo-icon.png")}
                style={{ width: 1400, height: 460, objectFit: "contain" }}
              />
              <ShineSweep progress={shineProgress} width={width} />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              opacity: fullOpacity,
              transform: `scale(${fullScale * logoBreath})`,
              filter: `drop-shadow(0 20px 48px ${ACCENT}55) drop-shadow(0 0 28px ${AI_CYAN}66)`,
            }}
          >
            <div style={{ position: "relative" }}>
              <Img
                src={staticFile("logo-full.png")}
                style={{ width: 1400, height: 460, objectFit: "contain" }}
              />
              <ShineSweep
                progress={interpolate(frame, [s(1.1), s(1.5)], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}
                width={width}
              />
            </div>
          </div>
        </div>

        {phoneEntry > 0 && phoneExit < 1 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -22%)",
            }}
          >
            <PhoneMockup
              entryProgress={phoneEntry}
              exitProgress={phoneExit}
              msgFrame={msgFrame}
              fps={fps}
            />
          </div>
        )}

        <FloatingChip
          text="Real conversations"
          icon="💬"
          color={AI_CYAN}
          x={140}
          y={340}
          delay={s(2.4)}
          frame={frame}
          fps={fps}
        />
        <FloatingChip
          text="Instant feedback"
          icon="⚡"
          color={ACCENT}
          x={1430}
          y={380}
          delay={s(2.7)}
          frame={frame}
          fps={fps}
        />
        <FloatingChip
          text="Pronunciation coach"
          icon="🎙️"
          color={GOLD}
          x={130}
          y={690}
          delay={s(3.0)}
          frame={frame}
          fps={fps}
        />
        <FloatingChip
          text="Personalized lessons"
          icon="🎯"
          color={AI_CYAN}
          x={1400}
          y={740}
          delay={s(3.3)}
          frame={frame}
          fps={fps}
        />

        <div
          style={{
            display: "flex",
            gap: 26,
            marginTop: 180,
            minHeight: 100,
            alignItems: "center",
            opacity: interpolate(frame, [sloganStart - s(0.1), sloganStart + s(0.1)], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {words.map((w, i) => {
            const start = wordStart[i];
            const wp = interpolate(frame, [start, start + s(0.35)], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: spring,
            });
            const y = interpolate(wp, [0, 1], [28, 0]);
            const scale = interpolate(wp, [0, 1], [0.7, 1]);
            const blur = interpolate(wp, [0, 1], [8, 0]);
            const isAccent = i === 2;
            const textColor = isAccent ? ACCENT : NAVY;
            const darkTextColor = isAccent ? "#9EB5FF" : "#FFFFFF";
            const currentColor = bgDark > 0.5 ? darkTextColor : textColor;

            return (
              <span
                key={w}
                style={{
                  opacity: wp,
                  transform: `translateY(${y}px) scale(${scale})`,
                  fontSize: 60,
                  fontWeight: isAccent ? 900 : 700,
                  color: currentColor,
                  letterSpacing: 1,
                  filter: `blur(${blur}px)`,
                  textShadow:
                    bgDark > 0.5
                      ? `0 2px 12px ${ACCENT}cc, 0 0 20px ${AI_CYAN}55`
                      : `0 2px 10px ${ACCENT}33`,
                }}
              >
                {w}
              </span>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 12,
            width: 620,
            height: 3,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              height: "100%",
              width: `${underlineProgress * 100}%`,
              transform: "translateX(-50%)",
              background: `linear-gradient(90deg, transparent, ${ACCENT}, ${AI_CYAN}, ${ACCENT}, transparent)`,
              boxShadow: `0 0 14px ${AI_CYAN}aa`,
              borderRadius: 2,
            }}
          />
        </div>

        <div
          style={{
            marginTop: 22,
            opacity: aiBadgeProgress,
            transform: `translateY(${interpolate(aiBadgeProgress, [0, 1], [20, 0])}px) scale(${interpolate(aiBadgeProgress, [0, 1], [0.85, 1])})`,
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "14px 30px",
            borderRadius: 999,
            background:
              bgDark > 0.5
                ? `linear-gradient(90deg, ${ACCENT}22, ${AI_CYAN}33, ${ACCENT}22)`
                : `linear-gradient(90deg, ${ACCENT}15, ${AI_CYAN}20, ${ACCENT}15)`,
            border: `1.5px solid ${AI_CYAN}${bgDark > 0.5 ? "aa" : "66"}`,
            boxShadow:
              bgDark > 0.5
                ? `0 0 28px ${AI_CYAN}66, inset 0 0 18px ${AI_CYAN}33`
                : `0 4px 20px ${ACCENT}22`,
            backdropFilter: "blur(10px)",
          }}
        >
          <SparkleIcon size={28} color={bgDark > 0.5 ? AI_CYAN : ACCENT} />
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 5,
              color: bgDark > 0.5 ? "#FFFFFF" : NAVY,
              textTransform: "uppercase",
              textShadow: bgDark > 0.5 ? `0 0 12px ${AI_CYAN}aa` : "none",
            }}
          >
            AI-Powered Learning
          </span>
          <SparkleIcon size={28} color={bgDark > 0.5 ? AI_CYAN : ACCENT} />
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 60,
        }}
      >
        <div
          style={{
            opacity: urlOpacity,
            transform: `translateY(${urlY}px)`,
            fontSize: 28,
            color: bgDark > 0.5 ? "#E8EEFF" : NAVY,
            letterSpacing: 8,
            fontWeight: 600,
            textTransform: "uppercase",
            textShadow: bgDark > 0.5 ? `0 0 18px ${AI_CYAN}aa` : "none",
          }}
        >
          practisen.com
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
          opacity: bgDark * 0.7,
        }}
      />
    </AbsoluteFill>
  );
};
