import { createTheme, type MantineColorsTuple } from "@mantine/core";

// Magenta used for the main call to action (e.g. "Comenzar vivo").
const primary: MantineColorsTuple = [
  "#fff0f8",
  "#ffdcef",
  "#fbb6dc",
  "#f68cc8",
  "#ef66b5",
  "#e04aa2",
  "#c2187f",
  "#a2136a",
  "#8a0f5e",
  "#6e0b4a",
];

// Pink used by the sidebar, highlights and accent cards.
const blossom: MantineColorsTuple = [
  "#fff1f9",
  "#ffe0f3",
  "#ffd6ef",
  "#ffb8e5",
  "#ff9edc",
  "#ff85d5",
  "#f066c2",
  "#d94dab",
  "#bd3a93",
  "#9e2c7a",
];

// Dark plum used for dark surfaces and secondary actions.
const plum: MantineColorsTuple = [
  "#f6eef3",
  "#efe3ea",
  "#dcc9d4",
  "#cdbbc6",
  "#a88c9c",
  "#8c5a7d",
  "#6b4a60",
  "#4a2a40",
  "#3a1530",
  "#2b0b22",
];

// Warm neutrals: Mantine uses gray for borders (gray.3) and dimmed text (gray.6).
const gray: MantineColorsTuple = [
  "#faf6f8",
  "#f6eef3",
  "#efe3ea",
  "#dcc9d4",
  "#cdbbc6",
  "#a88c9c",
  "#6b5f66",
  "#4a3f45",
  "#2e2529",
  "#1f1a1d",
];

const HEADINGS_FONT = "'Bricolage Grotesque', 'DM Sans', sans-serif";

export const theme = createTheme({
  primaryColor: "primary",
  primaryShade: 6,
  colors: { primary, blossom, plum, gray },
  black: "#1f1a1d",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  defaultRadius: "md",
  headings: {
    fontFamily: HEADINGS_FONT,
    fontWeight: "700",
    sizes: {
      h1: { fontSize: "2rem", lineHeight: "1.2" },
      h2: { fontSize: "1.25rem", lineHeight: "1.3" },
      h3: { fontSize: "1.125rem", lineHeight: "1.3" },
    },
  },
  other: {
    headingsFontFamily: HEADINGS_FONT,
  },
  components: {
    Title: {
      styles: {
        root: {
          color: "var(--mantine-color-plum-9)",
        },
      },
    },
    Paper: {
      defaultProps: {
        radius: "lg",
        p: "lg",
      },
    },
    Button: {
      defaultProps: {
        radius: "md",
        size: "md",
        color: "plum.9",
      },
    },
    ActionIcon: {
      defaultProps: {
        size: "lg",
        radius: "md",
        variant: "subtle",
        color: "gray",
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
        size: "md",
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: "md",
        size: "md",
      },
    },
    Textarea: {
      defaultProps: {
        radius: "md",
        size: "md",
      },
    },
    NumberInput: {
      defaultProps: {
        radius: "md",
        size: "md",
        hideControls: true,
      },
    },
    SegmentedControl: {
      defaultProps: {
        radius: "md",
        color: "plum.9",
      },
    },
    Badge: {
      defaultProps: {
        size: "lg",
        radius: "xl",
      },
    },
    Avatar: {
      defaultProps: {
        variant: "filled",
        color: "blossom.2",
        autoContrast: true,
      },
    },
    Modal: {
      defaultProps: {
        radius: "lg",
      },
    },
  },
});
