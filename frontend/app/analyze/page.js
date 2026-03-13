"use client";

import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ProductSearch from "@/components/ProductSearch";
import AnimatedPage, { fadeInUp } from "@/components/AnimatedPage";
import { AnalyticsIcon, SparklesIcon } from "@/components/Icons";

export default function AnalyzePage() {
  return (
    <AnimatedPage>
      <Box sx={{ py: { xs: 6, md: 10 }, position: "relative", minHeight: "80vh" }}>
        {/* Background glow */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 500,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative" }}>
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderradius: 1,
                  background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2.5,
                }}
              >
                <AnalyticsIcon width={28} height={28} style={{ color: "#a855f7" }} />
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.8rem", md: "2.3rem" },
                  mb: 1.5,
                }}
              >
                Analyze a Product
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 460, mx: "auto", lineHeight: 1.7 }}>
                Select a product and run ML-powered sentiment analysis to get instant insights.
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProductSearch />
          </motion.div>
        </Container>
      </Box>
    </AnimatedPage>
  );
}
