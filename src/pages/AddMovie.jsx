import { useState } from "react";

const AddMovie = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_KEY = import.meta.env.VITE_OMDB_KEY;
  const BACKEND_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

  // Search movies from OMDb
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setMessage("Please enter a movie title.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setMessage("No movies found.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setMessage("Error searching movies.");
    } finally {
      setLoading(false);
    }
  };

  // Add selected movie to backend DB
  const handleAddToDB = async (movie) => {
    setLoading(true);
    setMessage("");

    try {
      // Fetch full movie details
      const detailRes = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
      const fullData = await detailRes.json();

      // Map OMDb data to your backend movie schema
      const movieData = {
        title: fullData.Title || "Unknown",
        summary: fullData.Plot || "No summary available",
        director: fullData.Director || "Unknown",
        duration: parseInt(fullData.Runtime) || 120,
        category: fullData.Genre?.split(",")[0] || "Action",
      };

      const token = localStorage.getItem("token"); // if your backend requires auth

      const res = await fetch(`${BACKEND_URL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(movieData),
      });

      if (res.ok) {
        setMessage(`"${movieData.title}" added successfully!`);
      } else {
        const errText = await res.text();
        console.error("Backend error:", errText);
        setMessage(`Failed to add movie: ${errText}`);
      }
    } catch (err) {
      console.error("Add to DB error:", err);
      setMessage("Something went wrong while adding the movie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-movie-container">
      <h2>Add Movie</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter movie title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}

      <section className="movies-grid">
        {movies.length > 0 &&
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <h3>
                {movie.Title} ({movie.Year})
              </h3>
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                alt={movie.Title}
              />
              <button onClick={() => handleAddToDB(movie)}>Add to Database</button>
            </div>
          ))}
      </section>
    </div>
  );
};

export default AddMovie;
