"use client";

import { Box, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ThumbUpIcon, ThumbDownIcon } from "./Icons";

export default function ScoreCircle({
  score,
  size = 240,
  positive,
  negative,
  total,
  recommendation,
}) {
  const isGood = score >= 60;
  const isAverage = score >= 40 && score < 60;

  const accentColor = isGood ? "#22c55e" : isAverage ? "#f59e0b" : "#ef4444";
  const accentLight = isGood ? "#4ade80" : isAverage ? "#fbbf24" : "#f87171";
  const remainderColor = "rgba(128, 128, 128, 0.08)";

  const donutData = [
    { name: "Score", value: score },
    { name: "Remainder", value: 100 - score },
  ];

  const breakdownData = [
    { name: "Positive", value: positive || 0, color: "#22c55e" },
    { name: "Negative", value: negative || 0, color: "#ef4444" },
  ];

  const label = isGood ? "Good Product" : isAverage ? "Average" : "Not Recommended";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: { xs: 3, sm: 5 },
        }}
      >
        {/* ---- Donut Chart ---- */}
        <Box sx={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
          {/* Glow behind the chart */}
          <Box
            sx={{
              position: "absolute",
              inset: "15%",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
              filter: "blur(18px)",
              pointerEvents: "none",
            }}
          />

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* Background ring for depth */}
              <Pie
                data={[{ value: 100 }]}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="86%"
                startAngle={90}
                endAngle={-270}
                isAnimationActive={false}
                stroke="none"
              >
                <Cell fill={remainderColor} />
              </Pie>

              {/* Main score donut */}
              <Pie
                data={donutData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="86%"
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                cornerRadius={8}
                stroke="none"
                animationBegin={200}
                animationDuration={1200}
                animationEasing="ease-out"
              >
                <Cell fill={`url(#scoreGradient)`} />
                <Cell fill={remainderColor} />
              </Pie>

              {/* Tiny inner accent ring */}
              <Pie
                data={breakdownData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="65%"
                startAngle={90}
                endAngle={-270}
                paddingAngle={3}
                cornerRadius={6}
                stroke="none"
                animationBegin={600}
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {breakdownData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} opacity={0.7} />
                ))}
              </Pie>

              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={accentColor} />
                  <stop offset="100%" stopColor={accentLight} />
                </linearGradient>
              </defs>
            </PieChart>
          </ResponsiveContainer>

          {/* Center content */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: size * 0.2,
                  lineHeight: 1,
                  color: accentColor,
                }}
              >
                {score}%
              </Typography>
            </motion.div>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5, fontWeight: 600, letterSpacing: "0.04em", fontSize: "0.7rem" }}
            >
              SENTIMENT SCORE
            </Typography>
          </Box>
        </Box>

        {/* ---- Right-side legend / stats ---- */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
          {/* Recommendation badge */}
          {recommendation && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Chip
                label={recommendation}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  px: 1,
                  bgcolor: `${accentColor}14`,
                  color: accentColor,
                  border: `1px solid ${accentColor}30`,
                }}
              />
            </motion.div>
          )}

          {/* Stat rows */}
          {[
            {
              icon: <ThumbUpIcon width={16} height={16} />,
              label: "Positive Reviews",
              value: positive,
              color: "#22c55e",
            },
            {
              icon: <ThumbDownIcon width={16} height={16} />,
              label: "Negative Reviews",
              value: negative,
              color: "#ef4444",
            },
            {
              label: "Total Analyzed",
              value: total,
              color: "text.secondary",
            },
          ].map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {row.icon && (
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: 1.5,
                      bgcolor: `${row.color}14`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: row.color,
                      flexShrink: 0,
                    }}
                  >
                    {row.icon}
                  </Box>
                )}
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", lineHeight: 1.2 }}>
                    {row.label}
                  </Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: "1.05rem", color: row.color, lineHeight: 1.3 }}>
                    {row.value}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </motion.div>
  );
}
