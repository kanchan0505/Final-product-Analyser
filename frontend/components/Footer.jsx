"use client";

import { Box, Typography, Container } from "@mui/material";
import { SparklesIcon } from "./Icons";

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
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
          <SparklesIcon width={16} height={16} style={{ color: "#a855f7" }} />
          <Typography variant="body2" color="text.secondary" align="center">
            Built with ML &middot; GetSentiment &copy; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
