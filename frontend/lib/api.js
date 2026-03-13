const API_BASE = "http://localhost:8000";

export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return data.products;
}

export async function analyzeProduct(productName) {
  const res = await fetch(
    `${API_BASE}/analyze/${encodeURIComponent(productName)}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to analyze product");
  }

  return data;
}