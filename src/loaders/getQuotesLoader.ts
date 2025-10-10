// src/loaders/getQuotesLoader.ts
export async function getQuotesLoader() {
  const response = await fetch('http://localhost:5000/api/quotes');
  if (!response.ok) {
    throw new Response('Failed to load quotes', { status: response.status });
  }
  return response.json(); // returns array of quotes
}
