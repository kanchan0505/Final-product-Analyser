"use client";

import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { AnalyticsIcon, HomeIcon, SearchIcon } from "./Icons";

export default function Header() {
  const pathname = usePathname();

  const navItems = [

    { label: "Analyze", href: "/analyze", icon: <SearchIcon width={18} height={18} /> },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(6, 6, 15, 0.7)"
            : "rgba(248, 247, 255, 0.7)",
        borderBottom: 1,
        borderColor: "divider",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", minHeight: { xs: 64, md: 70 } }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 12px rgba(124, 58, 237, 0.4)",
                }}
              >
                <AnalyticsIcon width={20} height={20} style={{ color: "#fff" }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  background: "linear-gradient(135deg, #7c3aed, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                GetSentiment
              </Typography>
            </Box>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  startIcon={item.icon}
                  sx={{
                    color: pathname === item.href ? "primary.main" : "text.secondary",
                    fontWeight: pathname === item.href ? 700 : 500,
                    px: 2,
                    py: 0.8,
                    borderradius: 1,
                    fontSize: "0.875rem",
                    bgcolor: pathname === item.href ? "rgba(124, 58, 237, 0.08)" : "transparent",
                    "&:hover": {
                      bgcolor: "rgba(124, 58, 237, 0.1)",
                      color: "primary.main",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <ThemeToggle />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
