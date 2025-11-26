const API_URL = "http://localhost:4000"; // your backend

// Genre API calls
export async function getGenres() {
  const res = await fetch(`${API_URL}/genres`);
  return res.json();
}

export async function getGenre(id) {
  const res = await fetch(`${API_URL}/genres/${id}`);
  return res.json();
}

export async function createGenre(data) {
  const res = await fetch(`${API_URL}/genres`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateGenre(id, data) {
  const res = await fetch(`${API_URL}/genres/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteGenre(id) {
  const res = await fetch(`${API_URL}/genres/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

