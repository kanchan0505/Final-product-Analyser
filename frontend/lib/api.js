const API_BASE = "https://final-product-analyser.onrender.com";
const TIMEOUT = 10000; // 10 second timeout

// Helper function to fetch with timeout
async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new Error("Request timeout. Backend may not be responding.");
    }
    throw err;
  }
}

export async function getProducts() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/products`);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return data.products;
  } catch (err) {
    if (err.message.includes("timeout") || err.message.includes("not responding")) {
      throw new Error("Backend server is not responding. Please ensure it's running on http://localhost:8000");
    }
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new Error("Cannot connect to backend. Is the server running?");
    }
    throw err;
  }
}

export async function analyzeProduct(productName) {
  try {
    const res = await fetchWithTimeout(
      `${API_BASE}/analyze/${encodeURIComponent(productName)}`
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to analyze product");
    }

    return data;
  } catch (err) {
    if (err.message.includes("timeout") || err.message.includes("not responding")) {
      throw new Error("Analysis timeout. Please try again.");
    }
    throw err;
  }
}
