import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { MacBookScreen } from "./MacBookScreen";

const spring = Easing.bezier(0.34, 1.56, 0.64, 1);
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

type Props = {
  entryProgress: number;
  msgFrame: number;
  fps: number;
};

export const MacBook: React.FC<Props> = ({ entryProgress, msgFrame, fps }) => {
  const frame = useCurrentFrame();

  const screenW = 720;
  const screenH = 450;
  const bezel = 18;
  const bodyW = screenW + bezel * 2;
  const bodyH = screenH + bezel * 2;

  const entryY = interpolate(entryProgress, [0, 1], [120, 0], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const entryScale = interpolate(entryProgress, [0, 1], [0.85, 1], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(entryProgress, [0, 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle floating
  const floatY = Math.sin(frame / 36) * 3;

  // Screen power-on glow ramp
  const screenOn = interpolate(msgFrame, [0, fps * 0.3], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${entryY + floatY}px) scale(${entryScale})`,
        transformOrigin: "center bottom",
        filter: "drop-shadow(0 40px 60px rgba(8,8,74,0.55))",
      }}
    >
      {/* Lid */}
      <div
        style={{
          width: bodyW,
          height: bodyH,
          borderRadius: 18,
          padding: bezel,
          background: "linear-gradient(180deg, #1c1c2e, #0a0a18)",
          border: "1.5px solid #2c2c44",
          position: "relative",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4)",
        }}
      >
        {/* Camera notch */}
        <div
          style={{
            position: "absolute",
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#000",
            border: "1px solid #2a2a3c",
          }}
        />

        {/* Screen */}
        <div
          style={{
            width: screenW,
            height: screenH,
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
            background: "#000",
          }}
        >
          <div
            style={{
              opacity: screenOn,
              width: "100%",
              height: "100%",
            }}
          >
            <MacBookScreen msgFrame={msgFrame} fps={fps} />
          </div>

          {/* Screen reflection */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.06) 100%)",
              pointerEvents: "none",
              mixBlendMode: "screen",
            }}
          />
          {/* Cyan glow edge */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: `inset 0 0 80px rgba(94,230,255,${0.06 * screenOn})`,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Hinge */}
      <div
        style={{
          width: bodyW,
          height: 8,
          background: "linear-gradient(180deg, #1a1a28, #0a0a14)",
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 90,
            height: 6,
            borderRadius: "0 0 14px 14px",
            background: "linear-gradient(180deg, #10101c, #050510)",
          }}
        />
      </div>

      {/* Base (laptop deck visible at angle) */}
      <div
        style={{
          width: bodyW + 80,
          height: 16,
          marginLeft: -40,
          background:
            "linear-gradient(180deg, #d4d8e0 0%, #b4b8c4 50%, #8c8fa0 100%)",
          borderRadius: "4px 4px 22px 22px",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 8px rgba(0,0,0,0.25)",
          transform: "perspective(800px) rotateX(60deg)",
          transformOrigin: "top center",
          marginTop: -2,
        }}
      />

      {/* Reflective glow under laptop */}
      <div
        style={{
          width: bodyW * 0.7,
          height: 30,
          margin: "10px auto 0",
          background:
            "radial-gradient(ellipse at center, rgba(94,230,255,0.35), rgba(94,230,255,0) 70%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
};
