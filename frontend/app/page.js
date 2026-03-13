"use client";

import { Box, Container, Typography, Button, Card, CardContent } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedPage, { staggerContainer, fadeInUp, fadeIn } from "@/components/AnimatedPage";
import {
  BrainIcon,
  DatabaseIcon,
  RocketIcon,
  ArrowRightIcon,
  SparklesIcon,
  SearchIcon,
  AnalyticsIcon,
  LightbulbIcon,
  StepOneIcon,
  StepTwoIcon,
  StepThreeIcon,
} from "@/components/Icons";

const features = [
  {
    icon: <BrainIcon width={36} height={36} />,
    title: "ML Powered Sentiment Analysis",
    description:
      "Our Naive Bayes model trained on 164K+ reviews accurately classifies product sentiment with high precision.",
  },
  {
    icon: <DatabaseIcon width={36} height={36} />,
    title: "Real Product Reviews Dataset",
    description:
      "Analyze real Amazon product reviews stored in our database for authentic, data-driven insights.",
  },
  {
    icon: <RocketIcon width={36} height={36} />,
    title: "Instant Product Recommendation",
    description:
      "Get instant buy or skip recommendations based on aggregated sentiment scores and review analysis.",
  },
];

const steps = [
  {
    icon: <StepOneIcon width={40} height={40} />,
    title: "Select a Product",
    description: "Choose from our curated database of Amazon products with real customer reviews.",
  },
  {
    icon: <StepTwoIcon width={40} height={40} />,
    title: "Analyze Reviews",
    description: "Our ML model processes every review, classifying sentiment and extracting key insights.",
  },
  {
    icon: <StepThreeIcon width={40} height={40} />,
    title: "Get Insights",
    description: "Receive a comprehensive score, recommendation, and detailed sentiment breakdown.",
  },
];

export default function Home() {
  return (
    <AnimatedPage>
      <Box>
      
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            py: { xs: 12, md: 18 },
            minHeight: { md: "85vh" },
            display: "flex",
            alignItems: "center",
          }}
        >
       
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            
            <Box
              sx={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: 400, md: 700 },
                height: { xs: 400, md: 700 },
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(124,58,237,0.05) 40%, transparent 70%)",
                filter: "blur(40px)",
                animation: "pulse-glow 6s ease-in-out infinite",
              }}
            />
        
            <Box
              sx={{
                position: "absolute",
                top: "60%",
                right: "-5%",
                width: 350,
                height: 350,
                  borderRadius: "50%",
                background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
          </Box>

          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: { xs: 6, md: 8 },
              }}
            >
           
              <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
                

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "3.2rem", md: "4rem" },
                      lineHeight: 1.1,
                      mb: 3,
                    }}
                  >
                    Product{" "}
                    <Box
                      component="span"
                      sx={{
                        background: "linear-gradient(135deg, #7c3aed 0%, #c084fc 50%, #a855f7 100%)",
                        backgroundSize: "200% 200%",
                        animation: "gradient-shift 4s ease infinite",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Review Analyzer
                    </Box>
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                >
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      maxWidth: { md: 520 },
                      mb: 5,
                      fontWeight: 400,
                      lineHeight: 1.7,
                      fontSize: { xs: "1rem", md: "1.15rem" },
                    }}
                  >
                    Analyze thousands of product reviews instantly using Machine Learning.
                    Discover whether a product is worth buying before you spend a dime.
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
                    <Link href="/analyze" style={{ textDecoration: "none" }}>
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowRightIcon width={20} height={20} />}
                        sx={{ px: 4, py: 1.6, fontSize: "1rem" }}
                      >
                        Analyze a Product
                      </Button>
                    </Link>
                  </Box>
                </motion.div>
              </Box>

              {/* Right - Visual Element */}
              <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, x: 40 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Box sx={{ position: "relative" }}>
                    {/* Floating cards visual */}
                    <Box sx={{ position: "relative", width: "100%", maxWidth: 440, mx: "auto" }}>
                      {/* Main card */}
                      <Card
                        elevation={0}
                        sx={{
                          p: 3,
                          background: (theme) =>
                            theme.palette.mode === "dark"
                              ? "rgba(15, 15, 26, 0.8)"
                              : "rgba(255, 255, 255, 0.9)",
                          border: "1px solid",
                          borderColor: "divider",
                          backdropFilter: "blur(20px)",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
                          <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "8px",
                                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                          >
                            <AnalyticsIcon width={18} height={18} style={{ color: "#fff" }} />
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Sentiment Analysis
                          </Typography>
                        </Box>
                        {/* Mock sentiment bar */}
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                            <Typography variant="caption" sx={{ color: "#22c55e" }}>Positive 78%</Typography>
                            <Typography variant="caption" sx={{ color: "#ef4444" }}>Negative 22%</Typography>
                          </Box>
                          <Box sx={{ height: 8, borderradius: 1, bgcolor: "rgba(239,68,68,0.2)", overflow: "hidden" }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "78%" }}
                              transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                              style={{ height: "100%", borderradius: 1, background: "linear-gradient(90deg, #22c55e, #4ade80)" }}
                            />
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          {["Great quality", "Fast shipping", "Good value"].map((tag) => (
                            <Box
                              key={tag}
                              sx={{
                                px: 1.5,
                                py: 0.5,
                                borderradius: 1,
                                bgcolor: "rgba(34, 197, 94, 0.1)",
                                border: "1px solid rgba(34, 197, 94, 0.2)",
                              }}
                            >
                              <Typography variant="caption" sx={{ color: "#22c55e", fontWeight: 500, fontSize: "0.7rem" }}>
                                {tag}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Card>

                      {/* Floating mini card */}
                      <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ position: "absolute", top: -20, right: -20 }}
                      >
                        <Card
                          elevation={0}
                          sx={{
                            px: 2,
                            py: 1.5,
                            background: (theme) =>
                              theme.palette.mode === "dark"
                                ? "rgba(15, 15, 26, 0.9)"
                                : "rgba(255, 255, 255, 0.95)",
                            border: "1px solid",
                            borderColor: "divider",
                            backdropFilter: "blur(20px)",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ color: "#22c55e" }}>
                              <LightbulbIcon width={18} height={18} />
                            </Box>
                            <Typography variant="caption" sx={{ fontWeight: 600 }}>
                              Good Product
                            </Typography>
                          </Box>
                        </Card>
                      </motion.div>

                      {/* Score floating card */}
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        style={{ position: "absolute", bottom: -15, left: -15 }}
                      >
                        <Card
                          elevation={0}
                          sx={{
                            px: 2,
                            py: 1.5,
                            background: (theme) =>
                              theme.palette.mode === "dark"
                                ? "rgba(15, 15, 26, 0.9)"
                                : "rgba(255, 255, 255, 0.95)",
                            border: "1px solid",
                            borderColor: "divider",
                            backdropFilter: "blur(20px)",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 700,
                              background: "linear-gradient(135deg, #22c55e, #4ade80)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            82% Score
                          </Typography>
                        </Card>
                      </motion.div>
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ==================== FEATURES SECTION ==================== */}
        <Box sx={{ py: { xs: 8, md: 14 }, position: "relative" }}>
          <Container maxWidth="lg">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    mb: 1.5,
                    display: "block",
                  }}
                >
                  FEATURES
                </Typography>
                <Typography variant="h3" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" }, mb: 2 }}>
                  Why GetSentiment?
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mx: "auto" }}>
                  Powered by machine learning, we analyze real product reviews to give you actionable insights.
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                  gap: 3,
                }}
              >
                {features.map((feature) => (
                  <motion.div key={feature.title} variants={fadeInUp}>
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        p: 1,
                        "&:hover": {
                          borderColor: "primary.main",
                          boxShadow: (theme) =>
                            theme.palette.mode === "dark"
                              ? "0 0 40px rgba(168, 85, 247, 0.15)"
                              : "0 8px 40px rgba(124, 58, 237, 0.12)",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3.5 }}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 3,
                            background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "primary.main",
                            mb: 2.5,
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, fontSize: "1.1rem" }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* ==================== HOW IT WORKS SECTION ==================== */}
        <Box
          sx={{
            py: { xs: 8, md: 14 },
            borderTop: 1,
            borderColor: "divider",
            position: "relative",
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
                <Typography
                  variant="overline"
                  sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.15em", mb: 1.5, display: "block" }}
                >
                  HOW IT WORKS
                </Typography>
                <Typography variant="h3" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" }, mb: 2 }}>
                  Three Simple Steps
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: "auto" }}>
                  Get actionable product insights in seconds.
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                  gap: 3,
                }}
              >
                {steps.map((step, index) => (
                  <motion.div key={step.title} variants={fadeInUp}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 4,
                        borderradius: 1,
                        border: 1,
                        borderColor: "divider",
                        background: (theme) =>
                          theme.palette.mode === "dark"
                            ? "rgba(15, 15, 26, 0.4)"
                            : "rgba(255, 255, 255, 0.6)",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "primary.main",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          color: "primary.main",
                          mb: 2,
                        }}
                      >
                        {step.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: "1.05rem" }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {step.description}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* ==================== CTA SECTION ==================== */}
        <Box
          sx={{
            py: { xs: 10, md: 14 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 600,
              height: 300,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          />
          <Container maxWidth="sm" sx={{ position: "relative" }}>
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Typography variant="h3" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" }, mb: 2 }}>
                Ready to Analyze?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
                Select a product, run the analysis, and get instant results.
              </Typography>
              <Link href="/analyze" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRightIcon width={20} height={20} />}
                  sx={{ px: 5, py: 1.6, fontSize: "1rem" }}
                >
                  Go to Analyzer
                </Button>
              </Link>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </AnimatedPage>
  );
}
