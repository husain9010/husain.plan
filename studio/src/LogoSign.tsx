import React from "react";
import { Img, staticFile } from "remotion";
import { brand } from "./brand";

export const LogoSign: React.FC<{
  width: number;
  fontFamily: string;
  bodyFontFamily: string;
  showTagline?: boolean;
}> = ({ width, fontFamily, bodyFontFamily, showTagline = true }) => {
  const markSize = width * 0.15;
  const wordSize = width * 0.14;
  return (
    <div
      style={{
        width,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: width * 0.035,
        // backlit halo
        filter: `drop-shadow(0 0 ${width * 0.08}px ${brand.primary}cc) drop-shadow(0 0 ${width * 0.18}px ${brand.violet700}aa)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: width * 0.025,
          padding: `${width * 0.03}px ${width * 0.045}px`,
          borderRadius: width * 0.045,
          whiteSpace: "nowrap",
          background: `linear-gradient(180deg, ${brand.navy800}f5, ${brand.ink}f8)`,
          border: `2px solid ${brand.primary}`,
          boxShadow: `inset 0 0 ${width * 0.05}px ${brand.primary}55, 0 0 ${width * 0.04}px ${brand.primary}88`,
        }}
      >
        <Img
          src={staticFile("practisEN-mark.png")}
          style={{
            width: markSize,
            height: markSize,
            objectFit: "contain",
            filter: `drop-shadow(0 0 ${width * 0.02}px ${brand.violet300})`,
          }}
        />
        <div
          style={{
            fontFamily,
            fontWeight: 800,
            fontSize: wordSize,
            letterSpacing: "-0.02em",
            color: brand.white,
            lineHeight: 1,
            whiteSpace: "nowrap",
            textShadow: `0 0 ${width * 0.025}px ${brand.violet300}`,
          }}
        >
          practis<span style={{ color: brand.accent }}>EN</span>
        </div>
      </div>
      {showTagline ? (
        <div
          style={{
            fontFamily: bodyFontFamily,
            fontWeight: 500,
            fontSize: width * 0.055,
            color: brand.violet100,
            letterSpacing: "0.06em",
            textTransform: "lowercase",
            opacity: 0.92,
          }}
        >
          english, practised daily.
        </div>
      ) : null}
    </div>
  );
};
