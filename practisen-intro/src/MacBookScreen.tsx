import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

const NAVY = "#1A1AAA";
const ACCENT = "#4B6CFF";
const AI_CYAN = "#5EE6FF";
const TEXT_DARK = "#0F1640";
const TEXT_SOFT = "#5B6480";
const GRAY_BG = "#F2F4F9";
const GRAY_BORDER = "#E2E6EE";

const spring = Easing.bezier(0.34, 1.56, 0.64, 1);

type Props = {
  msgFrame: number;
  fps: number;
};

const TypingDots: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      {[0, 1, 2].map((i) => {
        const bounce = Math.sin((frame + i * 4) / 4) * 0.5 + 0.5;
        return (
          <div
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: TEXT_SOFT,
              opacity: 0.4 + bounce * 0.6,
              transform: `translateY(${-bounce * 2}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

const Bubble: React.FC<{
  progress: number;
  text: string;
  side: "left" | "right";
  accent?: boolean;
}> = ({ progress, text, side, accent }) => {
  const scale = interpolate(progress, [0, 1], [0.7, 1], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(progress, [0, 1], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const charsVisible = Math.floor(
    interpolate(progress, [0.35, 1], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const shown = text.slice(0, charsVisible);

  const isUser = side === "right";
  const bg = isUser
    ? `linear-gradient(135deg, ${ACCENT}, ${NAVY})`
    : accent
      ? `linear-gradient(135deg, #ffffff, ${AI_CYAN}1a)`
      : "#FFFFFF";
  const color = isUser ? "#FFFFFF" : TEXT_DARK;
  const border = isUser
    ? "none"
    : accent
      ? `1.5px solid ${AI_CYAN}aa`
      : `1px solid ${GRAY_BORDER}`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        transformOrigin: isUser ? "right center" : "left center",
      }}
    >
      <div
        style={{
          maxWidth: "75%",
          padding: "10px 14px",
          borderRadius: 16,
          borderTopRightRadius: isUser ? 4 : 16,
          borderTopLeftRadius: isUser ? 16 : 4,
          background: bg,
          color,
          fontSize: 13,
          lineHeight: 1.4,
          fontWeight: 500,
          border,
          boxShadow: isUser
            ? `0 4px 12px ${ACCENT}55`
            : `0 3px 10px rgba(15,22,64,0.08)`,
        }}
      >
        {shown}
      </div>
    </div>
  );
};

export const MacBookScreen: React.FC<Props> = ({ msgFrame, fps }) => {
  const s = (sec: number) => sec * fps;

  const userMsg = interpolate(msgFrame, [s(0.4), s(0.9)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const typing = interpolate(msgFrame, [s(0.9), s(1.2)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const typingOut = interpolate(msgFrame, [s(1.5), s(1.7)], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const aiMsg = interpolate(msgFrame, [s(1.6), s(2.4)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const userMsg2 = interpolate(msgFrame, [s(2.6), s(3.1)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const aiMsg2 = interpolate(msgFrame, [s(3.3), s(4.0)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#FAFBFD",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          height: 28,
          background: "#E8ECF2",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 6,
          borderBottom: `1px solid ${GRAY_BORDER}`,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#FF5F57",
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#FEBC2E",
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#28C840",
          }}
        />
        <div
          style={{
            marginLeft: 18,
            flex: 1,
            height: 18,
            borderRadius: 9,
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            fontSize: 10,
            color: TEXT_SOFT,
            fontWeight: 600,
            gap: 5,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#10b981",
            }}
          />
          practisen.com/ai-coach
        </div>
      </div>

      {/* App header */}
      <div
        style={{
          padding: "12px 18px",
          borderBottom: `1px solid ${GRAY_BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Img
            src={staticFile("logo-icon.png")}
            style={{ height: 24, width: "auto" }}
          />
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: TEXT_DARK,
              letterSpacing: 0.3,
            }}
          >
            practisen
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            borderRadius: 12,
            background: `linear-gradient(135deg, ${AI_CYAN}22, ${ACCENT}22)`,
            border: `1px solid ${AI_CYAN}55`,
            fontSize: 10,
            fontWeight: 700,
            color: NAVY,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: AI_CYAN,
              boxShadow: `0 0 6px ${AI_CYAN}`,
            }}
          />
          AI COACH ACTIVE
        </div>
      </div>

      {/* Sub-header with coach */}
      <div
        style={{
          padding: "10px 18px",
          borderBottom: `1px solid ${GRAY_BORDER}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "#FFFFFF",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${ACCENT}, ${AI_CYAN})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 900,
            color: "#FFFFFF",
            boxShadow: `0 3px 10px ${ACCENT}55`,
          }}
        >
          AI
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: TEXT_DARK }}>
            Practis AI Coach
          </div>
          <div
            style={{
              fontSize: 9,
              color: "#10b981",
              fontWeight: 600,
              marginTop: 1,
            }}
          >
            Online · Adaptive learning enabled
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div
        style={{
          flex: 1,
          padding: "14px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          background: GRAY_BG,
          overflow: "hidden",
        }}
      >
        <Bubble
          progress={userMsg}
          side="right"
          text="Help me sound confident in business meetings."
        />

        {typingOut > 0 && (
          <div
            style={{
              display: "flex",
              opacity: typing * typingOut,
            }}
          >
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 16,
                borderTopLeftRadius: 4,
                background: "#FFFFFF",
                border: `1px solid ${GRAY_BORDER}`,
              }}
            >
              <TypingDots />
            </div>
          </div>
        )}

        <Bubble
          progress={aiMsg}
          side="left"
          accent
          text={`Try: "I'd like to share my perspective on this."`}
        />

        <Bubble
          progress={userMsg2}
          side="right"
          text="Wow, that sounds so natural!"
        />

        <Bubble
          progress={aiMsg2}
          side="left"
          accent
          text="Want to practice it with voice? I'll listen and coach you live."
        />
      </div>

      {/* Input bar */}
      <div
        style={{
          padding: "10px 14px 12px",
          background: "#FFFFFF",
          borderTop: `1px solid ${GRAY_BORDER}`,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 30,
            borderRadius: 15,
            background: GRAY_BG,
            border: `1px solid ${GRAY_BORDER}`,
            padding: "0 12px",
            display: "flex",
            alignItems: "center",
            fontSize: 11,
            color: TEXT_SOFT,
          }}
        >
          Ask anything in English…
        </div>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${ACCENT}, ${NAVY})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 3px 8px ${ACCENT}66`,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M2 12 L22 3 L13 22 L11 13 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </div>
    </div>
  );
};
