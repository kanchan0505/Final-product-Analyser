"use client";

import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts, analyzeProduct } from "@/lib/api";
import { SearchIcon, SparklesIcon, BrainIcon, ErrorIcon } from "./Icons";
import SentimentResult from "./SentimentResult";

const loadingSteps = [
  "Analyzing product reviews...",
  "Running ML model...",
  "Extracting insights...",
];

export default function ProductSearch() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // Load products on page load
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data || []);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, []);

  // Cycle through loading steps
  useEffect(() => {
    if (!loading) {
      setLoadingStep(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingSteps.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [loading]);

  // Run analysis
  const handleAnalyze = async () => {
    if (!selectedProduct) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeProduct(selectedProduct);

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError("Failed to analyze product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Search Card */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          overflow: "visible",
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <SearchIcon width={20} height={20} style={{ color: "#a855f7" }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Select a product to analyze
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { sm: "flex-start" },
            }}
          >
            {/* Product Dropdown */}
            <TextField
              select
              label="Choose Product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              fullWidth
              disabled={loadingProducts}
              size="medium"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  borderradius: 1,
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                  },
                },
              }}
            >
              {loadingProducts ? (
                <MenuItem disabled>Loading products...</MenuItem>
              ) : (
                products.map((product) => (
                  <MenuItem key={product.product_id} value={product.product_name}>
                    {product.product_name}
                  </MenuItem>
                ))
              )}
            </TextField>

            {/* Analyze Button */}
            <Button
              variant="contained"
              onClick={handleAnalyze}
              disabled={!selectedProduct || loading}
              size="large"
              startIcon={
                loading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <SparklesIcon width={18} height={18} />
                )
              }
              sx={{
                px: 4,
                py: 1.7,
                minWidth: 180,
                fontSize: "0.95rem",
                borderradius: 1,
              }}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {/* Loading State */}
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Card
              elevation={0}
              sx={{
                textAlign: "center",
                py: 8,
                px: 4,
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(15, 15, 26, 0.8)"
                    : "rgba(255, 255, 255, 0.9)",
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderradius: 1,
                  background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <BrainIcon width={32} height={32} style={{ color: "#a855f7" }} />
                </motion.div>
              </Box>
              <AnimatePresence mode="wait">
                <motion.div
                  key={loadingStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {loadingSteps[loadingStep]}
                  </Typography>
                </motion.div>
              </AnimatePresence>
              <Typography variant="body2" color="text.secondary">
                This may take a few seconds
              </Typography>

              {/* Progress dots */}
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
                {loadingSteps.map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: i <= loadingStep ? "primary.main" : "divider",
                      transition: "background-color 0.3s ease",
                    }}
                  />
                ))}
              </Box>
            </Card>
          </motion.div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card
              elevation={0}
              sx={{
                textAlign: "center",
                py: 5,
                px: 4,
                border: "1px solid",
                borderColor: "error.main",
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(239, 68, 68, 0.05)"
                    : "rgba(239, 68, 68, 0.04)",
              }}
            >
              <Box sx={{ color: "error.main", mb: 2 }}>
                <ErrorIcon width={40} height={40} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Something went wrong
              </Typography>
              <Typography color="text.secondary">{error}</Typography>
            </Card>
          </motion.div>
        )}

        {/* Results */}
        {result && !loading && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SentimentResult data={result} />
          </motion.div>
        )}

        {/* Empty State */}
        {!result && !loading && !error && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card
              elevation={0}
              sx={{
                textAlign: "center",
                py: 8,
                px: 4,
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderradius: 1,
                  background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(168,85,247,0.05))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2.5,
                }}
              >
                <SearchIcon width={28} height={28} style={{ color: "#a855f7", opacity: 0.6 }} />
              </Box>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mb: 0.5 }}>
                No product selected
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Select a product above and click Analyze to get started.
              </Typography>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}