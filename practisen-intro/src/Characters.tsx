import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

const spring = Easing.bezier(0.34, 1.56, 0.64, 1);

type CharProps = {
  entryProgress: number;
  amazedProgress: number;
  side: "left" | "right";
};

// Sparkle/star indicator near the eyes that grows as amazed progress
const EyeSparkle: React.FC<{ x: number; y: number; size: number; opacity: number }> = ({
  x,
  y,
  size,
  opacity,
}) => {
  const frame = useCurrentFrame();
  const pulse = 0.85 + Math.sin(frame / 6) * 0.15;
  return (
    <g transform={`translate(${x} ${y}) scale(${size * pulse})`} opacity={opacity}>
      <path
        d="M0 -1 L0.25 -0.25 L1 0 L0.25 0.25 L0 1 L-0.25 0.25 L-1 0 L-0.25 -0.25 Z"
        fill="#FFE680"
        stroke="#FFC233"
        strokeWidth="0.08"
      />
    </g>
  );
};

// Young woman character on the right
const Woman: React.FC<{ amazedProgress: number }> = ({ amazedProgress }) => {
  const frame = useCurrentFrame();
  // Subtle head tilt + breathing
  const headTilt = Math.sin(frame / 50) * 1.5 + amazedProgress * -2;
  const browLift = amazedProgress * 4;
  const mouthOpen = amazedProgress * 5;
  const sparkleOp = interpolate(amazedProgress, [0, 0.6, 1], [0, 0.5, 1]);

  return (
    <svg viewBox="0 0 200 320" width="100%" height="100%">
      <defs>
        <linearGradient id="hairW" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6B3F1F" />
          <stop offset="1" stopColor="#3D2412" />
        </linearGradient>
        <linearGradient id="skinW" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBD9B9" />
          <stop offset="1" stopColor="#E8B98D" />
        </linearGradient>
        <linearGradient id="shirtW" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8728E" />
          <stop offset="1" stopColor="#A8324F" />
        </linearGradient>
        <radialGradient id="cheekW" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FF9999" stopOpacity="0.7" />
          <stop offset="1" stopColor="#FF9999" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Body / shoulders */}
      <path
        d="M30 320 Q30 230 100 215 Q170 230 170 320 Z"
        fill="url(#shirtW)"
      />
      {/* Neck */}
      <rect x="88" y="180" width="24" height="40" rx="6" fill="url(#skinW)" />

      <g transform={`rotate(${headTilt} 100 130)`}>
        {/* Hair back */}
        <path
          d="M40 130 Q40 60 100 50 Q160 60 160 135 L160 200 Q150 175 145 165 L55 165 Q50 175 40 200 Z"
          fill="url(#hairW)"
        />
        {/* Face */}
        <ellipse cx="100" cy="130" rx="50" ry="60" fill="url(#skinW)" />
        {/* Hair front bangs */}
        <path
          d="M55 95 Q70 70 100 65 Q130 70 145 95 Q140 105 130 100 Q120 90 100 92 Q80 90 70 100 Q60 105 55 95 Z"
          fill="url(#hairW)"
        />
        {/* Cheeks */}
        <ellipse cx="74" cy="148" rx="9" ry="6" fill="url(#cheekW)" />
        <ellipse cx="126" cy="148" rx="9" ry="6" fill="url(#cheekW)" />

        {/* Eyebrows lifted (amazed) */}
        <path
          d={`M70 ${118 - browLift} Q80 ${112 - browLift} 90 ${118 - browLift}`}
          stroke="#3D2412"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M110 ${118 - browLift} Q120 ${112 - browLift} 130 ${118 - browLift}`}
          stroke="#3D2412"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes (wide open) */}
        <ellipse cx="80" cy="132" rx="6" ry={5 + amazedProgress * 2} fill="#FFFFFF" />
        <ellipse cx="120" cy="132" rx="6" ry={5 + amazedProgress * 2} fill="#FFFFFF" />
        <circle cx="80" cy={133 + amazedProgress * 0.5} r="3" fill="#3D2412" />
        <circle cx="120" cy={133 + amazedProgress * 0.5} r="3" fill="#3D2412" />
        <circle cx="81" cy="132" r="1" fill="#FFFFFF" />
        <circle cx="121" cy="132" r="1" fill="#FFFFFF" />

        {/* Sparkles in eyes */}
        <EyeSparkle x={88} y={128} size={3} opacity={sparkleOp} />
        <EyeSparkle x={128} y={128} size={3} opacity={sparkleOp} />

        {/* Nose */}
        <path
          d="M98 142 Q100 152 95 158 Q100 162 105 158 Q100 152 102 142"
          stroke="#C99A75"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Mouth (open in awe -> O shape) */}
        <ellipse
          cx="100"
          cy={170 + mouthOpen * 0.3}
          rx={5 + mouthOpen * 0.4}
          ry={3 + mouthOpen}
          fill="#7B2238"
        />
        <path
          d={`M${94 - amazedProgress} 168 Q100 ${164 - amazedProgress} ${106 + amazedProgress} 168`}
          stroke="#7B2238"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity={1 - amazedProgress * 0.3}
        />

        {/* Earring sparkle */}
        <circle cx="50" cy="148" r="2.5" fill="#F5D77A" />
      </g>
    </svg>
  );
};

// Young man character on the left
const Man: React.FC<{ amazedProgress: number }> = ({ amazedProgress }) => {
  const frame = useCurrentFrame();
  const headTilt = Math.sin(frame / 55 + 1) * 1.5 + amazedProgress * 2;
  const browLift = amazedProgress * 4;
  const mouthOpen = amazedProgress * 4;
  const sparkleOp = interpolate(amazedProgress, [0, 0.6, 1], [0, 0.5, 1]);

  return (
    <svg viewBox="0 0 200 320" width="100%" height="100%">
      <defs>
        <linearGradient id="hairM" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A1810" />
          <stop offset="1" stopColor="#0F0805" />
        </linearGradient>
        <linearGradient id="skinM" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8B98D" />
          <stop offset="1" stopColor="#C99A75" />
        </linearGradient>
        <linearGradient id="shirtM" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4B6CFF" />
          <stop offset="1" stopColor="#1A1AAA" />
        </linearGradient>
        <radialGradient id="cheekM" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FF7766" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FF7766" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Body / shoulders */}
      <path
        d="M25 320 Q25 225 100 210 Q175 225 175 320 Z"
        fill="url(#shirtM)"
      />
      {/* Collar */}
      <path
        d="M85 215 Q100 235 115 215 L115 230 Q100 245 85 230 Z"
        fill="url(#skinM)"
      />
      {/* Neck */}
      <rect x="88" y="180" width="24" height="40" rx="6" fill="url(#skinM)" />

      <g transform={`rotate(${headTilt} 100 130)`}>
        {/* Face */}
        <ellipse cx="100" cy="130" rx="48" ry="58" fill="url(#skinM)" />

        {/* Hair (short, modern) */}
        <path
          d="M52 110 Q55 65 100 55 Q145 65 148 110 Q145 95 130 90 Q115 80 100 82 Q85 80 70 90 Q55 95 52 110 Z"
          fill="url(#hairM)"
        />
        {/* Hair side */}
        <path
          d="M52 110 Q50 130 55 145 Q60 135 60 120 Z"
          fill="url(#hairM)"
        />
        <path
          d="M148 110 Q150 130 145 145 Q140 135 140 120 Z"
          fill="url(#hairM)"
        />

        {/* Cheeks */}
        <ellipse cx="74" cy="150" rx="8" ry="5" fill="url(#cheekM)" />
        <ellipse cx="126" cy="150" rx="8" ry="5" fill="url(#cheekM)" />

        {/* Eyebrows lifted */}
        <path
          d={`M68 ${118 - browLift} Q80 ${113 - browLift} 92 ${118 - browLift}`}
          stroke="#0F0805"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M108 ${118 - browLift} Q120 ${113 - browLift} 132 ${118 - browLift}`}
          stroke="#0F0805"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes wide */}
        <ellipse cx="80" cy="133" rx="6" ry={5 + amazedProgress * 2} fill="#FFFFFF" />
        <ellipse cx="120" cy="133" rx="6" ry={5 + amazedProgress * 2} fill="#FFFFFF" />
        <circle cx="80" cy={134 + amazedProgress * 0.5} r="3" fill="#1F1208" />
        <circle cx="120" cy={134 + amazedProgress * 0.5} r="3" fill="#1F1208" />
        <circle cx="81" cy="133" r="1" fill="#FFFFFF" />
        <circle cx="121" cy="133" r="1" fill="#FFFFFF" />

        {/* Sparkles */}
        <EyeSparkle x={87} y={129} size={3} opacity={sparkleOp} />
        <EyeSparkle x={127} y={129} size={3} opacity={sparkleOp} />

        {/* Nose */}
        <path
          d="M98 144 Q100 158 94 162 Q100 166 106 162 Q100 158 102 144"
          stroke="#A8835F"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Mouth (slight smile + open in awe) */}
        <ellipse
          cx="100"
          cy={172 + mouthOpen * 0.3}
          rx={6 + mouthOpen * 0.3}
          ry={2 + mouthOpen}
          fill="#5A1E2A"
        />
        <path
          d={`M${92 - amazedProgress} 170 Q100 ${178 + amazedProgress * 0.3} ${108 + amazedProgress} 170`}
          stroke="#5A1E2A"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity={1 - amazedProgress * 0.5}
        />

        {/* Beard stubble hint */}
        <ellipse cx="100" cy="180" rx="22" ry="10" fill="#1F1208" opacity="0.12" />
      </g>
    </svg>
  );
};

export const Character: React.FC<CharProps> = ({
  entryProgress,
  amazedProgress,
  side,
}) => {
  const isLeft = side === "left";
  const entryX = interpolate(entryProgress, [0, 1], [isLeft ? -120 : 120, 0], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const entryScale = interpolate(entryProgress, [0, 1], [0.8, 1], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(entryProgress, [0, 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 320,
        height: 480,
        opacity,
        transform: `translateX(${entryX}px) scale(${entryScale})`,
        transformOrigin: isLeft ? "right bottom" : "left bottom",
        filter: "drop-shadow(0 20px 30px rgba(8,8,74,0.45))",
      }}
    >
      {isLeft ? (
        <Man amazedProgress={amazedProgress} />
      ) : (
        <Woman amazedProgress={amazedProgress} />
      )}
    </div>
  );
};
