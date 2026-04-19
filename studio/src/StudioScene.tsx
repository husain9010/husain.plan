import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";
import { brand } from "./brand";
import { LogoSign } from "./LogoSign";
import { Mic } from "./Mic";
import { Host } from "./Host";

const displayFont = "Baloo 2";
const bodyFont = "Nunito";

loadFont({ family: displayFont, url: staticFile("Baloo2-700.ttf"), weight: "700" });
loadFont({ family: displayFont, url: staticFile("Baloo2-800.ttf"), weight: "800" });
loadFont({ family: bodyFont, url: staticFile("Nunito-400.ttf"), weight: "400" });
loadFont({ family: bodyFont, url: staticFile("Nunito-500.ttf"), weight: "500" });
loadFont({ family: bodyFont, url: staticFile("Nunito-700.ttf"), weight: "700" });

export type SceneProps = {
  host: "none" | "male" | "female";
  orientation: "wide" | "mobile";
};

export const StudioScene: React.FC<SceneProps> = ({ host, orientation }) => {
  const isWide = orientation === "wide";
  const W = isWide ? 1920 : 1080;
  const H = isWide ? 1080 : 1920;

  const slatCount = isWide ? 22 : 14;
  const slatWidth = W / slatCount;

  const logoWidth = isWide ? 760 : 720;
  const signTop = isWide ? H * 0.12 : H * 0.08;
  const signLeft = (W - logoWidth) / 2;

  const deskHeight = isWide ? H * 0.34 : H * 0.32;
  const deskTop = H - deskHeight;

  const micSize = isWide ? 260 : 320;

  return (
    <AbsoluteFill style={{ background: brand.ink, overflow: "hidden" }}>
      {/* Back wall — deep navy gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 35%, ${brand.navy800} 0%, ${brand.navy900} 45%, ${brand.ink} 100%)`,
        }}
      />

      {/* Vertical wood acoustic slats */}
      <div style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: slatCount }).map((_, i) => {
          const x = i * slatWidth;
          const isAccent = i % 2 === 0;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: 0,
                width: slatWidth,
                height: H * 0.78,
                background: `linear-gradient(180deg, ${isAccent ? brand.oak : brand.walnutLight} 0%, ${brand.walnut} 70%, ${brand.ink} 100%)`,
                opacity: 0.42,
                borderRight: `1px solid rgba(0,0,0,0.4)`,
                borderLeft: `1px solid rgba(255,255,255,0.04)`,
              }}
            />
          );
        })}
        {/* slat warm wash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, transparent 0%, transparent 50%, ${brand.ink}cc 95%)`,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Left & right purple rim glow */}
      <div
        style={{
          position: "absolute",
          left: -W * 0.12,
          top: 0,
          width: W * 0.5,
          height: H,
          background: `radial-gradient(ellipse at left center, ${brand.violet700}66 0%, transparent 55%)`,
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -W * 0.12,
          top: 0,
          width: W * 0.5,
          height: H,
          background: `radial-gradient(ellipse at right center, ${brand.primary}55 0%, transparent 55%)`,
          mixBlendMode: "screen",
        }}
      />

      {/* LED accent strips along architectural edges */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: H * 0.06,
          height: 6,
          background: `linear-gradient(90deg, transparent, ${brand.primary} 40%, ${brand.accent} 60%, transparent)`,
          filter: `blur(2px) drop-shadow(0 0 12px ${brand.primary})`,
          opacity: 0.8,
        }}
      />

      {/* Floating shelf with books — left */}
      <Shelf
        x={W * 0.05}
        y={H * 0.5}
        width={W * 0.18}
        side="left"
      />
      {/* Monstera plant — right */}
      <Monstera x={W - W * 0.18} y={H * 0.42} size={W * 0.16} />

      {/* Edison pendant bulbs */}
      <PendantBulb x={W * 0.18} ceilingY={0} dropTo={H * 0.18} />
      <PendantBulb x={W * 0.82} ceilingY={0} dropTo={H * 0.22} />

      {/* Backlit logo sign */}
      <div
        style={{
          position: "absolute",
          left: signLeft,
          top: signTop,
        }}
      >
        <LogoSign
          width={logoWidth}
          fontFamily={displayFont}
          bodyFontFamily={bodyFont}
        />
      </div>

      {/* Desk — dark walnut */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: deskTop,
          height: deskHeight,
          background: `linear-gradient(180deg, ${brand.walnut} 0%, #1a1208 60%, #0a0604 100%)`,
          borderTop: `2px solid ${brand.oakLight}55`,
          boxShadow: `inset 0 30px 60px rgba(0,0,0,0.6), 0 -20px 40px ${brand.primary}22`,
        }}
      />
      {/* Desk highlight reflection of logo */}
      <div
        style={{
          position: "absolute",
          left: signLeft,
          top: deskTop + 8,
          width: logoWidth,
          height: 90,
          background: `radial-gradient(ellipse at center top, ${brand.primary}44, transparent 70%)`,
          filter: "blur(8px)",
        }}
      />

      {/* Host (optional) */}
      {host !== "none" ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            transform: "translateX(-50%)",
          }}
        >
          <Host gender={host} size={isWide ? 520 : 620} />
        </div>
      ) : null}

      {/* Mic(s) */}
      {host === "none" ? (
        <>
          <div
            style={{
              position: "absolute",
              left: W * 0.28 - micSize / 2,
              top: deskTop - micSize * 0.9,
            }}
          >
            <Mic size={micSize} tilt={20} />
          </div>
          <div
            style={{
              position: "absolute",
              left: W * 0.72 - micSize / 2,
              top: deskTop - micSize * 0.9,
            }}
          >
            <Mic size={micSize} tilt={-20} />
          </div>
          {/* headphones near each mic */}
          <Headphones x={W * 0.13} y={deskTop + 40} size={isWide ? 140 : 160} />
          <Headphones x={W * 0.78} y={deskTop + 40} size={isWide ? 140 : 160} />
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: deskTop - micSize * 0.95,
            transform: "translateX(-50%)",
            zIndex: 5,
          }}
        >
          <Mic size={micSize} tilt={-15} />
        </div>
      )}

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 35%, ${brand.ink}aa 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Subtle haze */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, transparent 60%, ${brand.primary}12 90%, ${brand.primary}1c 100%)`,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ---- decorative sub-components ----

const Shelf: React.FC<{
  x: number;
  y: number;
  width: number;
  side: "left" | "right";
}> = ({ x, y, width }) => {
  const colors = [
    brand.violet700,
    brand.primary,
    brand.cream,
    brand.walnut,
    brand.accent,
    "#1a1a1a",
    brand.violet800,
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height: width * 0.55,
        display: "flex",
        flexDirection: "column",
        gap: width * 0.04,
      }}
    >
      {[0, 1].map((row) => (
        <div
          key={row}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            gap: width * 0.012,
            height: width * 0.22,
            borderBottom: `4px solid ${brand.walnut}`,
            paddingBottom: 4,
            filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.5))",
          }}
        >
          {colors.map((c, i) => {
            const h = 0.5 + ((i * 7 + row * 3) % 5) * 0.1;
            return (
              <div
                key={i}
                style={{
                  width: width * (0.05 + (i % 3) * 0.012),
                  height: width * 0.2 * h,
                  background: c,
                  borderRadius: 2,
                  boxShadow: "inset -2px 0 0 rgba(0,0,0,0.25)",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const Monstera: React.FC<{ x: number; y: number; size: number }> = ({
  x,
  y,
  size,
}) => {
  const leafColor = "#1F4D2C";
  const leafLight = "#2E6B3F";
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size * 1.1,
        filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))",
      }}
    >
      {/* Pot */}
      <div
        style={{
          position: "absolute",
          left: size * 0.25,
          top: size * 0.78,
          width: size * 0.5,
          height: size * 0.32,
          background: `linear-gradient(180deg, ${brand.walnutLight}, ${brand.walnut})`,
          borderRadius: "8px 8px 14px 14px",
        }}
      />
      {/* Leaves */}
      <svg
        viewBox="0 0 100 110"
        width={size}
        height={size * 1.1}
        style={{ position: "absolute", inset: 0 }}
      >
        {[
          { cx: 30, cy: 35, r: 26, c: leafColor, rot: -25 },
          { cx: 65, cy: 30, r: 30, c: leafLight, rot: 20 },
          { cx: 50, cy: 55, r: 28, c: leafColor, rot: -5 },
          { cx: 25, cy: 65, r: 22, c: leafLight, rot: -40 },
          { cx: 78, cy: 60, r: 24, c: leafColor, rot: 35 },
        ].map((l, i) => (
          <g key={i} transform={`rotate(${l.rot} ${l.cx} ${l.cy})`}>
            <ellipse cx={l.cx} cy={l.cy} rx={l.r} ry={l.r * 0.7} fill={l.c} />
            {/* split slits */}
            <path
              d={`M ${l.cx} ${l.cy - l.r * 0.6} L ${l.cx} ${l.cy + l.r * 0.6}`}
              stroke={brand.ink}
              strokeWidth="1"
              opacity="0.4"
            />
            <path
              d={`M ${l.cx - l.r * 0.5} ${l.cy} L ${l.cx + l.r * 0.5} ${l.cy}`}
              stroke={brand.ink}
              strokeWidth="0.6"
              opacity="0.3"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

const PendantBulb: React.FC<{
  x: number;
  ceilingY: number;
  dropTo: number;
}> = ({ x, ceilingY, dropTo }) => {
  const bulbR = 22;
  return (
    <div
      style={{
        position: "absolute",
        left: x - 1,
        top: ceilingY,
      }}
    >
      <div
        style={{
          width: 2,
          height: dropTo,
          background: "#1a1a1a",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -bulbR + 1,
          top: dropTo,
          width: bulbR * 2,
          height: bulbR * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle at 40% 35%, #FFE9B0 0%, ${brand.warmAmber} 55%, #B8740A 100%)`,
          boxShadow: `0 0 60px 30px ${brand.warmAmber}66, 0 0 120px 60px ${brand.warmAmber}33`,
        }}
      />
    </div>
  );
};

const Headphones: React.FC<{ x: number; y: number; size: number }> = ({
  x,
  y,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 100 70"
      style={{
        position: "absolute",
        left: x,
        top: y,
        filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.6))",
      }}
    >
      <path
        d="M 15 40 Q 50 5 85 40"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect x="6" y="34" width="20" height="32" rx="6" fill="#1f1f1f" />
      <rect x="74" y="34" width="20" height="32" rx="6" fill="#1f1f1f" />
      <circle cx="16" cy="50" r="5" fill={brand.primary} opacity="0.85" />
      <circle cx="84" cy="50" r="5" fill={brand.primary} opacity="0.85" />
    </svg>
  );
};
