"use client";

import { Box, Typography, Container, IconButton } from "@mui/material";
import { SparklesIcon, GitHubIcon, LinkedInIcon, PortfolioIcon } from "./Icons";

// Update these links with your actual URLs
const SOCIAL_LINKS = {
  github: "https://github.com/kanchan",
  linkedin: "https://linkedin.com/in/kanchan",
  portfolio: "https://yourportfolio.com",
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        borderTop: 1,
        borderColor: "divider",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
          {/* Creator Name */}
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            Created by <span style={{ fontWeight: 600, color: "inherit" }}>Kanchan Sharma</span>
          </Typography>

          {/* Social Links */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
            <IconButton
              component="a"
              href="https://github.com/kanchan0505"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: "#a855f7" }}
              title="GitHub"
            >
              <GitHubIcon width={20} height={20} />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.linkedin.com/in/kanchan-sharma-ba980828b/"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: "#a855f7" }}
              title="LinkedIn"
            >
              <LinkedInIcon width={20} height={20} />
            </IconButton>

            <IconButton
              component="a"
              href="https://starfall-portfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: "#a855f7" }}
              title="Portfolio"
            >
              <PortfolioIcon width={20} height={20} />
            </IconButton>
          </Box>

          {/* Footer Text */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
            <SparklesIcon width={16} height={16} style={{ color: "#a855f7" }} />
            <Typography variant="body2" color="text.secondary" align="center">
              GetSentiment &middot; Built by Kanchan Sharma &copy; {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
