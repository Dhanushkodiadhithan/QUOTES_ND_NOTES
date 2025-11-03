export async function getQuotesLoader() {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const response = await fetch(`${baseUrl}/quotes`);

  if (!response.ok) {
    throw new Response("Failed to load quotes", { status: response.status });
  }

  const quotes = await response.json();

  if (!Array.isArray(quotes)) {
    throw new Response("Invalid quotes data", { status: 500 });
  }

  return quotes;
}
