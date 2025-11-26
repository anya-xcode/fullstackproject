import { useEffect, useState } from "react";
import { getGenres, createGenre, updateGenre, deleteGenre } from "./api";
import "./App.css";

function App() {
  const [genres, setGenres] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadGenres();
  }, []);

  async function loadGenres() {
    try {
      setLoading(true);
      setError("");
      const data = await getGenres();
      setGenres(data);
    } catch (error) {
      setError("Failed to load genres. Make sure the backend server is running.");
      console.error("Error loading genres:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;

    try {
      setLoading(true);
      setError("");
      if (editingId) {
        await updateGenre(editingId, form);
        setEditingId(null);
      } else {
        await createGenre(form);
      }
      setForm({ name: "" });
      await loadGenres();
    } catch (error) {
      setError("Failed to save genre. Please try again.");
      console.error("Error saving genre:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      setLoading(true);
      setError("");
      await deleteGenre(id);
      await loadGenres();
    } catch (error) {
      setError("Failed to delete genre. It may be associated with books.");
      console.error("Error deleting genre:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(genre) {
    setEditingId(genre.id);
    setForm({ name: genre.name });
  }

  function handleCancel() {
    setEditingId(null);
    setForm({ name: "" });
  }

  return (
    <div className="container">
      <h1>Genre Management</h1>

      <div className="form-section">
        <h2>{editingId ? "Edit Genre" : "Add New Genre"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Genre name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            disabled={loading}
          />
          <div className="button-group">
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} disabled={loading}>
                Cancel
              </button>
            )}
          </div>
        </form>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="list-section">
        <h2>All Genres ({genres.length})</h2>

        {loading && genres.length === 0 ? (
          <p>Loading...</p>
        ) : genres.length === 0 ? (
          <p>No genres found. Add your first genre above!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Books</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {genres.map((genre) => (
                <tr key={genre.id}>
                  <td>{genre.id}</td>
                  <td>{genre.name}</td>
                  <td>{genre.books ? genre.books.length : 0}</td>
                  <td>
                    <button onClick={() => handleEdit(genre)} disabled={loading}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(genre.id, genre.name)} disabled={loading}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
