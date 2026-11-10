const API_BASE = '../data/';

async function fetchData(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error('Server error');
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    return null;
  }
}
