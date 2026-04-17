import React from "react";

type Props = {
  size?: number;
  navy?: string;
  light?: string;
  strokeWidth?: number;
};

export const Logo: React.FC<Props> = ({
  size = 400,
  navy = "#1A1AAA",
  light = "#D6E4F5",
  strokeWidth = 18,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M90 60 L90 340 L140 340 L140 220 L190 220 L260 340 L320 340 L240 210 C280 195 305 160 305 120 C305 85 280 60 240 60 Z M140 100 L225 100 C245 100 260 110 260 135 C260 160 245 175 225 175 L140 175 Z"
          fill={navy}
          stroke={light}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
        <path
          d="M215 55 L325 55 L325 95 L290 95 L290 195 L250 195 L250 95 L215 95 Z"
          fill={navy}
          stroke={light}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
