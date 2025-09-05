import { useEffect, useState } from "react";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", note: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api/notes";

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setNotes(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load notes");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create note");
      const newNote = await res.json();
      setNotes([newNote, ...notes]); // add new note to top of list
      setForm({ title: "", note: "", author: "" }); // reset form
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h1>📝 Notes</h1>

      {/* Form to create new note */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <textarea
          name="note"
          placeholder="Note"
          value={form.note}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add Note
        </button>
      </form>

      {/* List of notes */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : notes.length === 0 ? (
        <p>No notes yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notes.map((n) => (
            <li
              key={n._id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "0.5rem",
                borderRadius: "5px",
              }}
            >
              <h3>{n.title}</h3>
              <p>{n.note}</p>
              <p>
                <em>{n.author}</em>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notes;
