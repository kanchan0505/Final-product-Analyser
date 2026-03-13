"use client";

import { IconButton } from "@mui/material";
import { useColorMode } from "./ThemeRegistry";
import { SunIcon, MoonIcon } from "./Icons";

export default function ThemeToggle() {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      color="inherit"
      size="small"
      sx={{
        ml: 1,
        width: 38,
        height: 38,
        borderradius: 1,
        bgcolor: mode === "dark" ? "rgba(168, 85, 247, 0.1)" : "rgba(124, 58, 237, 0.06)",
        color: "primary.main",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: "rgba(124, 58, 237, 0.15)",
          transform: "rotate(30deg)",
        },
      }}
    >
      {mode === "dark" ? <SunIcon width={20} height={20} /> : <MoonIcon width={20} height={20} />}
    </IconButton>
  );
}
