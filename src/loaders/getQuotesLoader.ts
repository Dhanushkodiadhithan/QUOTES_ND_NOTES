export async function getQuotesLoader() {
  const response = await fetch('http://localhost:5000/api/quotes');

  if (!response.ok) {
    throw new Response('Failed to load quotes', { status: response.status });
  }

  const quotes = await response.json();

  // Optionally validate data here before returning
  if (!Array.isArray(quotes)) {
    throw new Response('Invalid quotes data', { status: 500 });
  }

  return quotes;
}
