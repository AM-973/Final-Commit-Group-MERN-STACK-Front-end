import { useState } from "react";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // Make sure this is in your .env

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setMessage("Please enter a movie name.");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setMessage("No movies found.");
      }
    } catch (err) {
      setMessage("Error fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = async (movie) => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movie),
      });

      if (res.ok) {
        setMessage(`"${movie.Title}" added successfully!`);
      } else {
        const errData = await res.json();
        setMessage(errData.err || "Failed to add movie.");
      }
    } catch (err) {
      setMessage("Error adding movie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <p>Search and add movies from OMDb API to your database.</p>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={searchTerm}
          placeholder="Enter movie title"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "250px", marginRight: "10px" }}
        />
        <button onClick={handleSearch} style={{ padding: "8px 15px" }}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 200px)", gap: "15px" }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={movie.Title}
              style={{ width: "100%", height: "auto" }}
            />
            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
            <button onClick={() => handleAddMovie(movie)} style={{ padding: "5px 10px" }}>
              Add to DB
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
