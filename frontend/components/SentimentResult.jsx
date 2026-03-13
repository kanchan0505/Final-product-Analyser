"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ScoreCircle from "./ScoreCircle";

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SentimentResult({ data }) {
  const {
    product_name,
    total_reviews,
    positive,
    negative,
    sentiment_score,
    recommendation,
  } = data;

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

        {/* ===== SCORE CARD — Donut chart + legend ===== */}
        <motion.div variants={fadeInUp}>
          <Card elevation={0}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              {/* Product name */}
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                {product_name}
              </Typography>

              {/* Donut chart with built-in legend */}
              <ScoreCircle
                score={sentiment_score}
                positive={positive}
                negative={negative}
                total={total_reviews}
                recommendation={recommendation}
              />
            </CardContent>
          </Card>
        </motion.div>


      </Box>
    </motion.div>
  );
}

