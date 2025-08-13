import { useState } from "react"
import styles from './AddMovie.module.css'

const AddMovie = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const API_KEY = import.meta.env.VITE_OMDB_KEY
  const BACKEND_URL = import.meta.env.VITE_BACK_END_SERVER_URL

  // Search movies from OMDb
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setMessage("Please enter a movie title.")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${API_KEY}`)
      const data = await res.json()

      if (data.Response === "True") {
        setMovies(data.Search)
        setMessage("")
      } else {
        setMovies([])
        setMessage("No movies found.")
      }
    } catch (err) {
      console.error("Search error:", err)
      setMessage("Error searching movies.")
    } finally {
      setLoading(false)
    }
  }

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Add selected movie to backend DB
  const handleAddToDB = async (movie) => {
    setLoading(true)
    setMessage("")

    try {
      // Fetch full movie details
      const detailRes = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`)
      const fullData = await detailRes.json()

      // Map OMDb data to your backend movie schema
      const movieData = {
        title: fullData.Title || "Unknown",
        summary: fullData.Plot || "No summary available",
        director: fullData.Director || "Unknown",
        duration: parseInt(fullData.Runtime) || 120,
        category: fullData.Genre?.split(",")[0] || "Action",
      }

      const token = localStorage.getItem("token")

      const res = await fetch(`${BACKEND_URL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(movieData),
      })

      if (res.ok) {
        setMessage(`"${movieData.title}" added successfully!`)
        // Remove the added movie from the search results
        setMovies(prevMovies => prevMovies.filter(m => m.imdbID !== movie.imdbID))
      } else {
        const errText = await res.text()
        console.error("Backend error:", errText)
        setMessage(`Failed to add movie: ${errText}`)
      }
    } catch (err) {
      console.error("Add to DB error:", err)
      setMessage("Something went wrong while adding the movie.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.container}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Add New Movie</h1>
          <p className={styles.subtitle}>
            Search for movies from OMDb and add them to your database
          </p>
        </header>

        <section className={styles.searchSection}>
          <div className={styles.searchBar}>
            <div className="field">
              <label htmlFor="movie-search" className="label">
                Movie Title
              </label>
              <div className={styles.searchInput}>
                <input
                  id="movie-search"
                  type="text"
                  placeholder="Enter movie title (e.g., 'Inception', 'The Matrix')"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="input"
                  disabled={loading}
                />
                <button 
                  onClick={handleSearch}
                  className="btn btn--primary"
                  disabled={loading || !searchTerm.trim()}
                  type="button"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </div>

          {message && (
            <div className={`${styles.message} ${message.includes('successfully') ? styles.success : styles.error}`}>
              {message}
            </div>
          )}
        </section>

        {movies.length > 0 && (
          <section className={styles.resultsSection}>
            <h2 className={styles.resultsTitle}>Search Results</h2>
            <div className={`grid grid--4 ${styles.moviesGrid}`}>
              {movies.map((movie) => (
                <article key={movie.imdbID} className={`card ${styles.movieCard}`}>
                  <div className={styles.moviePoster}>
                    <img
                      src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
                      alt={`${movie.Title} poster`}
                      className={styles.posterImage}
                    />
                  </div>
                  
                  <div className={styles.movieContent}>
                    <header className={styles.movieHeader}>
                      <h3 className={styles.movieTitle}>{movie.Title}</h3>
                      <p className={styles.movieYear}>{movie.Year}</p>
                    </header>
                    
                    <footer className={styles.movieActions}>
                      <button 
                        onClick={() => handleAddToDB(movie)}
                        className="btn btn--secondary btn--sm btn--full"
                        disabled={loading}
                        type="button"
                      >
                        {loading ? 'Adding...' : 'Add to Database'}
                      </button>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default AddMovie