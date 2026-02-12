import { createTheme } from "@mui/material/styles";

const smoothEasing = "cubic-bezier(0.4, 0, 0.2, 1)";
const smoothOutEasing = "cubic-bezier(0.32, 0.72, 0, 1)";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4f46e5",
      dark: "#4338ca",
      light: "#818cf8",
    },
    secondary: {
      main: "#64748b",
      light: "#94a3b8",
    },
    error: {
      main: "#dc2626",
      dark: "#b91c1c",
    },
    background: {
      default: "#f8fafc",
      paper: "rgba(255, 255, 255, 0.7)",
    },
    text: {
      primary: "#1e293b",
      secondary: "#475569",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.025em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 600, letterSpacing: "-0.02em" },
    h4: { fontWeight: 600, letterSpacing: "-0.02em" },
    h5: { fontWeight: 600, letterSpacing: "-0.02em" },
    h6: { fontWeight: 600, letterSpacing: "-0.02em" },
    button: { fontWeight: 600, textTransform: "none" },
    body1: { letterSpacing: "0.01em" },
    body2: { letterSpacing: "0.01em" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiDialog-container": {
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(15, 23, 42, 0.52)",
            backdropFilter: "blur(8px)",
            transition: `opacity 280ms ${smoothOutEasing}`,
          },
          "& .MuiDialog-paper": {
            transition: `transform 320ms ${smoothOutEasing}, opacity 320ms ${smoothOutEasing}`,
          },
        },
        paper: {
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: 18,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          maxHeight: "90vh",
        },
      },
      defaultProps: {
        TransitionProps: {
          timeout: 320,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 12,
          transition: `transform 220ms ${smoothEasing}, box-shadow 220ms ${smoothEasing}, background-color 220ms ${smoothEasing}`,
          "&:hover": {
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0) scale(0.98)",
            transitionDuration: "120ms",
          },
        },
        contained: {
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          "&:hover": {
            boxShadow: "0 4px 12px -2px rgba(79, 70, 229, 0.35), 0 2px 6px -2px rgba(0 0 0 / 0.08)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            transition: `border-color 200ms ${smoothEasing}, box-shadow 200ms ${smoothEasing}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        },
        rounded: {
          borderRadius: 14,
          transition: `box-shadow 280ms ${smoothEasing}`,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 3,
          backgroundColor: "#4f46e5",
          transition: `left 300ms ${smoothEasing}, width 300ms ${smoothEasing}`,
        },
        flexContainer: {
          gap: 4,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          minHeight: 52,
          letterSpacing: "0.01em",
          transition: `color 220ms ${smoothEasing}, background-color 220ms ${smoothEasing}`,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          transition: `opacity 300ms ${smoothEasing}, transform 300ms ${smoothEasing}`,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          color: "#1e293b",
          fontSize: "1.25rem",
          letterSpacing: "-0.02em",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          color: "#475569",
          letterSpacing: "0.01em",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          gap: 12,
          padding: "16px 24px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transition: `color 200ms ${smoothEasing}, transform 200ms ${smoothEasing}`,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: `background-color 220ms ${smoothEasing}, transform 220ms ${smoothEasing}`,
          "&:hover": {
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.96)",
            transitionDuration: "120ms",
          },
        },
      },
    },
  },
});

export default theme;
