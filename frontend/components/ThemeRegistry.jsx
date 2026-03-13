"use client";

import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme, alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useColorMode() {
  return useContext(ColorModeContext);
}

export default function ThemeRegistry({ children }) {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme-mode");
    if (stored === "light" || stored === "dark") {
      setMode(stored);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === "light" ? "dark" : "light";
          localStorage.setItem("theme-mode", next);
          return next;
        });
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: { default: "#06060f", paper: "#0f0f1a" },
                primary: { main: "#a855f7", light: "#c084fc", dark: "#7c3aed" },
                secondary: { main: "#c084fc" },
                text: { primary: "#f0f0f5", secondary: "#8b8ba3" },
                divider: "rgba(168, 85, 247, 0.12)",
                success: { main: "#22c55e" },
                error: { main: "#ef4444" },
              }
            : {
                background: { default: "#f8f7ff", paper: "#ffffff" },
                primary: { main: "#7c3aed", light: "#a78bfa", dark: "#6d28d9" },
                secondary: { main: "#6d28d9" },
                text: { primary: "#1a1a2e", secondary: "#64648b" },
                divider: "rgba(124, 58, 237, 0.1)",
                success: { main: "#16a34a" },
                error: { main: "#dc2626" },
              }),
        },
        shape: { borderRadius: 12 },
        typography: {
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          h1: { fontWeight: 800, letterSpacing: "-0.025em" },
          h2: { fontWeight: 700, letterSpacing: "-0.025em" },
          h3: { fontWeight: 700, letterSpacing: "-0.02em" },
          h4: { fontWeight: 700, letterSpacing: "-0.015em" },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
          button: { fontWeight: 600 },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: 12,
                fontWeight: 600,
                letterSpacing: "0.01em",
              },
              containedPrimary: {
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                boxShadow: "0 4px 20px rgba(124, 58, 237, 0.35)",
                "&:hover": {
                  background: "linear-gradient(135deg, #6d28d9 0%, #9333ea 100%)",
                  boxShadow: "0 6px 28px rgba(124, 58, 237, 0.5)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: ({ theme: t }) => ({
                borderRadius: 16,
                border: `1px solid ${t.palette.divider}`,
                background:
                  t.palette.mode === "dark"
                    ? "rgba(15, 15, 26, 0.6)"
                    : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(20px)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }),
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 16,
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                fontWeight: 500,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
