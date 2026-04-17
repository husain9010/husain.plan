import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

const NAVY = "#1A1AAA";
const ACCENT = "#4B6CFF";
const AI_CYAN = "#5EE6FF";
const GRAY_BG = "#F2F4F9";
const GRAY_BORDER = "#E2E6EE";
const TEXT_DARK = "#0F1640";
const TEXT_SOFT = "#5B6480";

const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const spring = Easing.bezier(0.34, 1.56, 0.64, 1);

type Props = {
  entryProgress: number;
  exitProgress: number;
  msgFrame: number;
  fps: number;
};

const TypingDots: React.FC<{ visible: number }> = ({ visible }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        alignItems: "center",
        opacity: visible,
      }}
    >
      {[0, 1, 2].map((i) => {
        const bounce =
          Math.sin((frame + i * 4) / 4) * 0.5 + 0.5;
        return (
          <div
            key={i}
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: TEXT_SOFT,
              opacity: 0.4 + bounce * 0.6,
              transform: `translateY(${-bounce * 3}px)`,
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
  translation?: string;
}> = ({ progress, text, side, accent, translation }) => {
  const scale = interpolate(progress, [0, 1], [0.6, 1], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(progress, [0, 1], [14, 0], {
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
  const showCursor = progress > 0.35 && progress < 1;

  const isUser = side === "right";
  const bg = isUser
    ? `linear-gradient(135deg, ${ACCENT}, ${NAVY})`
    : accent
      ? `linear-gradient(135deg, #ffffff, ${AI_CYAN}15)`
      : "#FFFFFF";
  const color = isUser ? "#FFFFFF" : TEXT_DARK;
  const border = isUser
    ? "none"
    : accent
      ? `2px solid ${AI_CYAN}aa`
      : `1.5px solid ${GRAY_BORDER}`;
  const shadow = isUser
    ? `0 8px 18px ${ACCENT}55`
    : accent
      ? `0 8px 20px ${AI_CYAN}44`
      : `0 4px 12px rgba(15,22,64,0.06)`;

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
          maxWidth: "78%",
          padding: "14px 18px",
          borderRadius: 22,
          borderTopRightRadius: isUser ? 6 : 22,
          borderTopLeftRadius: isUser ? 22 : 6,
          background: bg,
          color,
          fontSize: 18,
          lineHeight: 1.35,
          fontWeight: 500,
          border,
          boxShadow: shadow,
        }}
      >
        <div>
          {shown}
          {showCursor && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 18,
                background: isUser ? "#FFFFFF" : ACCENT,
                marginLeft: 2,
                verticalAlign: "middle",
                opacity: Math.sin(Date.now() / 200) > 0 ? 1 : 0.2,
              }}
            />
          )}
        </div>
        {translation && progress > 0.95 && (
          <div
            style={{
              marginTop: 8,
              paddingTop: 8,
              borderTop: `1px dashed ${isUser ? "#ffffff55" : GRAY_BORDER}`,
              fontSize: 13,
              fontWeight: 400,
              opacity: 0.75,
              direction: "rtl",
              fontFamily: '"Tahoma", "Arial", sans-serif',
            }}
          >
            {translation}
          </div>
        )}
      </div>
    </div>
  );
};

export const PhoneMockup: React.FC<Props> = ({
  entryProgress,
  exitProgress,
  msgFrame,
  fps,
}) => {
  const s = (sec: number) => sec * fps;

  const entryY = interpolate(entryProgress, [0, 1], [520, 0], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const entryRot = interpolate(entryProgress, [0, 1], [-14, 0], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const entryScale = interpolate(entryProgress, [0, 1], [0.75, 1], {
    easing: spring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitY = interpolate(exitProgress, [0, 1], [0, 160], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.92], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const frame = useCurrentFrame();
  const floatY = Math.sin(frame / 30) * 6;
  const floatRot = Math.sin(frame / 40) * 0.8;

  const userMsg = interpolate(msgFrame, [s(0.3), s(0.7)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const typing = interpolate(msgFrame, [s(0.7), s(1.0)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const typingOut = interpolate(msgFrame, [s(1.2), s(1.35)], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const aiMsg = interpolate(msgFrame, [s(1.3), s(2.0)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const totalOpacity = Math.min(entryProgress, exitOpacity);
  const totalY = entryY + exitY + floatY;
  const totalRot = entryRot + floatRot;
  const totalScale = entryScale * exitScale;

  return (
    <div
      style={{
        opacity: totalOpacity,
        transform: `translateY(${totalY}px) rotate(${totalRot}deg) scale(${totalScale})`,
        transformOrigin: "center bottom",
        filter: `drop-shadow(0 30px 60px ${NAVY}44) drop-shadow(0 0 40px ${AI_CYAN}33)`,
      }}
    >
      <div
        style={{
          width: 380,
          height: 700,
          borderRadius: 52,
          padding: 9,
          background: `linear-gradient(160deg, #2a2a40, #0a0a1f)`,
          border: "2px solid #33334a",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 48,
            background: "#FAFBFD",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 14,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 32,
              borderRadius: 20,
              background: "#0a0a1f",
              zIndex: 10,
            }}
          />

          <div
            style={{
              padding: "56px 22px 16px",
              borderBottom: `1px solid ${GRAY_BORDER}`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#FFFFFF",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${ACCENT}, ${AI_CYAN})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 900,
                color: "#FFFFFF",
                boxShadow: `0 4px 12px ${ACCENT}55`,
              }}
            >
              AI
            </div>
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: TEXT_DARK,
                }}
              >
                Practis AI Coach
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 2,
                  fontWeight: 600,
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 6px #10b981",
                  }}
                />
                Online — instant reply
              </div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: "18px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: GRAY_BG,
            }}
          >
            <Bubble
              progress={userMsg}
              side="right"
              text="Help me sound professional in meetings."
            />

            {typingOut > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  opacity: typing * typingOut,
                }}
              >
                <div
                  style={{
                    padding: "14px 18px",
                    borderRadius: 22,
                    borderTopLeftRadius: 6,
                    background: "#FFFFFF",
                    border: `1.5px solid ${GRAY_BORDER}`,
                  }}
                >
                  <TypingDots visible={1} />
                </div>
              </div>
            )}

            <Bubble
              progress={aiMsg}
              side="left"
              accent
              text='Try: "Let me weigh in on this."'
              translation="دعني أُدلي برأيي في هذا الموضوع"
            />
          </div>

          <div
            style={{
              padding: "14px 18px 22px",
              background: "#FFFFFF",
              borderTop: `1px solid ${GRAY_BORDER}`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 42,
                borderRadius: 21,
                background: GRAY_BG,
                border: `1px solid ${GRAY_BORDER}`,
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                fontSize: 14,
                color: TEXT_SOFT,
              }}
            >
              Ask anything in English…
            </div>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${ACCENT}, ${NAVY})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 4px 12px ${ACCENT}66`,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M2 12 L22 3 L13 22 L11 13 Z"
                  fill="#FFFFFF"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
