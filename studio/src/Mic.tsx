import React from "react";
import { brand } from "./brand";

export const Mic: React.FC<{ size?: number; tilt?: number }> = ({
  size = 200,
  tilt = -15,
}) => {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 100 160"
      style={{ transform: `rotate(${tilt}deg)`, transformOrigin: "50% 100%" }}
    >
      <defs>
        <linearGradient id="micBody" x1="0" x2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="0.45" stopColor="#3a3a3a" />
          <stop offset="1" stopColor="#0d0d0d" />
        </linearGradient>
        <linearGradient id="micRing" x1="0" x2="1">
          <stop offset="0" stopColor="#666" />
          <stop offset="0.5" stopColor="#d8d8d8" />
          <stop offset="1" stopColor="#555" />
        </linearGradient>
        <radialGradient id="micGrille" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#5a5a5a" />
          <stop offset="0.6" stopColor="#1c1c1c" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
      </defs>
      {/* boom arm */}
      <rect x="46" y="130" width="8" height="30" rx="3" fill="#1f1f1f" />
      {/* body */}
      <rect x="28" y="48" width="44" height="82" rx="22" fill="url(#micBody)" />
      {/* metallic ring */}
      <rect x="28" y="58" width="44" height="6" fill="url(#micRing)" />
      <rect x="28" y="116" width="44" height="6" fill="url(#micRing)" />
      {/* grille */}
      <rect x="32" y="6" width="36" height="48" rx="18" fill="url(#micGrille)" />
      <rect
        x="32"
        y="6"
        width="36"
        height="48"
        rx="18"
        fill="none"
        stroke="#888"
        strokeWidth="1.5"
      />
      {/* grille mesh hint */}
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="34"
          x2="66"
          y1={10 + i * 4}
          y2={10 + i * 4}
          stroke="#000"
          strokeOpacity="0.35"
          strokeWidth="0.5"
        />
      ))}
      {/* on-air led */}
      <circle cx="50" cy="100" r="3" fill={brand.primary} />
      <circle cx="50" cy="100" r="6" fill={brand.primary} fillOpacity="0.25" />
    </svg>
  );
};
