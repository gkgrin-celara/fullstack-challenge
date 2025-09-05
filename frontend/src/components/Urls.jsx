import { useEffect, useState } from "react";

function Urls() {
    const [urls, setUrls] = useState([]);
    const [form, setForm] = useState({ url: "", short_url: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = "http://localhost:5000/api/urls";

    // Fetch all URLs
    const fetchUrls = async () => {
        try {
            setLoading(true);
            const res = await fetch(API_URL);
            const data = await res.json();
            setUrls(data);
            setLoading(false);
        } catch (err) {
            setError("Failed to load URLs");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUrls();
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
            if (!res.ok) throw new Error("Failed to create URL");
            const newUrl = await res.json();
            setUrls([newUrl, ...urls]);
            // @todo: reset form and show new short_url
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchFullUrl = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(API_URL + '/' + form.short_url, {
                method: "GET"
            });
            if (!res.ok) throw new Error("Failed to retrieve URL");
            const newUrl = await res.json();
            // @todo: show the full URL to user
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
            <h1> URLs</h1>
            <h2> Shorten URL</h2>
            {/* Form to create new URL */}
            <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
                <input
                    type="text"
                    name="url"
                    placeholder="URL"
                    value={form.url}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
                />
                <button type="submit" style={{ padding: "0.5rem 1rem" }}>
                    Shorten URL
                </button>
            </form>

            <h2>Full URL</h2>
            <form onSubmit={fetchFullUrl} style={{ marginBottom: "2rem" }}>
                <input
                    type="text"
                    name="short_url"
                    placeholder="Short URL"
                    value={form.short_url}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
                />
                <button type="submit" style={{ padding: "0.5rem 1rem" }}>
                    Fetch Full URL
                </button>
            </form>

            <h2>Current URL List</h2>
            {/* List of URLs */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : urls.length === 0 ? (
                <p>No URLs yet</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {urls.map((u) => (
                        <li
                            key={u._id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "1rem",
                                marginBottom: "0.5rem",
                                borderRadius: "5px",
                            }}
                        >
                            <p>
                                <strong>{u.short_url}</strong>: {u.url}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Urls;
