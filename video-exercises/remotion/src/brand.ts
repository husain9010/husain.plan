export const brand = {
  primary: '#7030E0',
  primaryDark: '#5B23BE',
  accent: '#A78BFA',
  ink: '#0B0B1E',
  ink2: '#2A2A3F',
  ink3: '#5C5C75',
  bg: '#F7F7FB',
  card: '#FFFFFF',
  line: '#E8E8F0',
  success: '#1DAE6F',
  warning: '#E3B341',
  error: '#E5484D',
} as const;

export const fonts = {
  display: '"Baloo 2", system-ui, sans-serif',
  body: '"Nunito", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

export const motion = {
  enterMs: 320,
  microMs: 160,
  entranceMs: 320,
  easing: [0.2, 0.8, 0.2, 1] as const,
} as const;

export const canvas = {
  width: 1920,
  height: 1080,
  fps: 30,
  topBarHeight: 96,
  footerHeight: 64,
  safeMargin: 140,
} as const;
