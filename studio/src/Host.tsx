import React from "react";
import { brand } from "./brand";

type Gender = "male" | "female";

// Stylized flat-illustration host portrait, half-body, behind mic.
export const Host: React.FC<{ gender: Gender; size: number }> = ({
  gender,
  size,
}) => {
  const skin = "#D9A878";
  const hair = gender === "male" ? "#1F1A12" : "#2A1810";
  const blazer = gender === "male" ? "#1A1F2E" : brand.cream;
  const blazerEdge = gender === "male" ? "#0D1018" : "#E5D5BC";
  const shirt = gender === "male" ? brand.white : "#F8E4C0";
  const lip = "#A8423F";

  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 200 250"
      style={{
        filter: `drop-shadow(0 30px 40px rgba(0,0,0,0.55)) drop-shadow(-20px 0 30px ${brand.primary}33)`,
      }}
    >
      <defs>
        <linearGradient id={`rim-${gender}`} x1="0" x2="1">
          <stop offset="0" stopColor={brand.primary} stopOpacity="0.55" />
          <stop offset="1" stopColor={brand.primary} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`face-${gender}`} cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#F0C49A" />
          <stop offset="1" stopColor={skin} />
        </radialGradient>
      </defs>

      {/* shoulders / blazer */}
      <path
        d={`M 10 250
            L 10 200
            Q 30 150 70 140
            L 130 140
            Q 170 150 190 200
            L 190 250 Z`}
        fill={blazer}
        stroke={blazerEdge}
        strokeWidth="2"
      />

      {/* shirt collar */}
      {gender === "male" ? (
        <>
          <path
            d="M 70 140 L 100 175 L 130 140 L 130 200 L 100 220 L 70 200 Z"
            fill={shirt}
          />
          {/* tie */}
          <path
            d="M 95 175 L 105 175 L 110 250 L 90 250 Z"
            fill={brand.primary}
          />
          <path d="M 95 175 L 105 175 L 100 188 Z" fill={brand.primaryDark} />
        </>
      ) : (
        <>
          <path
            d="M 75 140 Q 100 175 125 140 L 125 195 Q 100 210 75 195 Z"
            fill={shirt}
          />
          {/* delicate necklace */}
          <path
            d="M 80 175 Q 100 195 120 175"
            fill="none"
            stroke="#E8B84A"
            strokeWidth="1.5"
          />
          <circle cx="100" cy="194" r="3" fill="#E8B84A" />
        </>
      )}

      {/* neck */}
      <path
        d="M 82 130 Q 100 145 118 130 L 118 150 Q 100 158 82 150 Z"
        fill={skin}
      />

      {/* head */}
      <ellipse
        cx="100"
        cy="80"
        rx="46"
        ry="55"
        fill={`url(#face-${gender})`}
      />

      {/* hair */}
      {gender === "male" ? (
        <>
          {/* full crown coverage with side fade */}
          <path
            d="M 56 80
               Q 50 30 100 22
               Q 150 30 144 80
               Q 144 70 138 60
               Q 132 78 130 88
               L 130 75
               Q 118 64 100 64
               Q 82 64 70 75
               L 70 88
               Q 68 78 62 60
               Q 56 70 56 80 Z"
            fill={hair}
          />
          {/* short fade on sides */}
          <path
            d="M 54 80 Q 52 100 60 110 L 70 110 L 70 88 Q 60 86 54 80 Z"
            fill={hair}
            opacity="0.85"
          />
          <path
            d="M 146 80 Q 148 100 140 110 L 130 110 L 130 88 Q 140 86 146 80 Z"
            fill={hair}
            opacity="0.85"
          />
        </>
      ) : (
        <>
          {/* crown */}
          <path
            d="M 48 88
               Q 38 22 100 16
               Q 162 22 152 88
               Q 152 78 144 70
               Q 130 56 100 56
               Q 70 56 56 70
               Q 48 78 48 88 Z"
            fill={hair}
          />
          {/* long flowing sides past shoulders */}
          <path
            d="M 48 88 Q 44 130 56 165 L 56 230 Q 50 220 46 200 Q 40 150 48 88 Z"
            fill={hair}
          />
          <path
            d="M 152 88 Q 156 130 144 165 L 144 230 Q 150 220 154 200 Q 160 150 152 88 Z"
            fill={hair}
          />
          {/* side bangs hint */}
          <path
            d="M 56 70 Q 75 78 95 72 L 95 90 Q 75 92 60 88 Z"
            fill={hair}
            opacity="0.85"
          />
        </>
      )}

      {/* eyebrows */}
      <path
        d="M 76 72 Q 84 68 92 72"
        stroke={hair}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 108 72 Q 116 68 124 72"
        stroke={hair}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* eyes — closed/smiling crescents */}
      <path
        d="M 76 84 Q 84 90 92 84"
        stroke="#1a1a1a"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 108 84 Q 116 90 124 84"
        stroke="#1a1a1a"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* nose */}
      <path
        d="M 100 92 Q 102 102 100 108 Q 96 110 95 108"
        stroke="#A87858"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* mouth — warm smile */}
      <path
        d="M 86 118 Q 100 128 114 118"
        stroke={lip}
        strokeWidth="2.5"
        fill={lip}
        fillOpacity="0.55"
        strokeLinecap="round"
      />

      {/* cheek warmth */}
      <ellipse cx="74" cy="105" rx="8" ry="4" fill="#E89A7A" opacity="0.4" />
      <ellipse cx="126" cy="105" rx="8" ry="4" fill="#E89A7A" opacity="0.4" />

      {/* purple rim light from camera-right */}
      <path
        d={`M 145 60 Q 150 100 138 145 L 138 250 L 192 250 L 192 60 Z`}
        fill={`url(#rim-${gender})`}
        opacity="0.65"
      />
    </svg>
  );
};
