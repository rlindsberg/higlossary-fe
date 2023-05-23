import { createStitches } from "@stitches/react";

const stitches = createStitches({
  theme: {
    colors: {
      primary: "blue",
      secondary: "green",

      // Whites
      white10: "#fff",
      white20: "#F1F1F1",

      // Greys
      grey10: "#F0F0F0",
      grey20: "#CBCBCB",
      grey30: "#959595",
      grey40: "#333",

      // Pinks
      pink10: "#FFF7FC",
      pink20: "#FF99D5",
      pink30: "#FF4DB6",
      pink40: "#FF0096",

      // Other colors
      warningRed: "#E72B2B",
      blue: "#00AFDB",
      lineColor: "#E7E2F6",
    },
    fonts: {
      body: "Helvetica, sans-serif",
      heading: "Arial, sans-serif",
    },
  },
  media: {
    sm: "(max-width: 767px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
  },

  utils: {
    marginX: (value: string) => ({ marginLeft: value, marginRight: value }),
  },
});

export const { styled, css, globalCss, keyframes, theme } = stitches;
