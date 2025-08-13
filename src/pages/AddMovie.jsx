import { useState } from "react";

const AddMovie = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState(null);
  const API_KEY = import.meta.env.VITE_OMDB_KEY;
  const BACKEND_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies(null);
        alert("Movie not found!");
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleAddToDB = async (movie) => {
  try {
    const detailRes = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
    const fullData = await detailRes.json();

    // Map OMDb data to your Movie schema
    const duration = parseInt(fullData.Runtime) || 120; // fallback 120 min
    const category = "Action"; // or assign based on Genre if you want

    const movieData = {
      title: fullData.Title,
      summary: fullData.Plot || "No summary available",
      director: fullData.Director || "Unknown",
      duration: duration,
      category: category
    };

    const res = await fetch(`${BACKEND_URL}/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieData)
    });

    if (res.ok) {
      alert("Movie added successfully!");
    } else {
      const errText = await res.text();
      console.error("Backend error:", errText);
      alert("Failed to add movie.");
    }
  } catch (err) {
    console.error("Add to DB error:", err);
    alert("Something went wrong while adding the movie.");
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

      <section className="movies-grid">
        {movies && movies.map(movie => (
          <div key={movie.imdbID} className="movie-card">
            <h3>{movie.Title} ({movie.Year})</h3>
            <img src={movie.Poster} alt={movie.Title} />
            <button onClick={() => handleAddToDB(movie)}>Add to Database</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AddMovie;
