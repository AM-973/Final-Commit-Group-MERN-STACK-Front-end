import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as movieService from '../../services/movieService'
import styles from './MovieForm.module.css'

const MovieForm = ({ handleAddMovie, handleUpdateMovie }) => {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    director: '',
    duration: '',
    category: '',
    poster: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (movieId) {
      setIsEditing(true)
      // fetch movie for editing
      const fetchMovie = async () => {
        try {
          setLoading(true)
          const movie = await movieService.show(movieId)
          setFormData({
            title: movie.title || '',
            summary: movie.summary || '',
            director: movie.director || '',
            duration: movie.duration || '',
            category: movie.category || '',
            poster: movie.poster || '',
          })
        } catch (err) {
          setError('Failed to load movie data')
          console.error('Error fetching movie:', err)
        } finally {
          setLoading(false)
        }
      }
      fetchMovie()
    }
  }, [movieId])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (movieId) {
        await handleUpdateMovie(formData, movieId)
      } else {
        await handleAddMovie(formData)
      }
    } catch (err) {
      setError(err.message || 'An error occurred while saving the movie')
      console.error('Form submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (movieId) {
      navigate(`/movies/${movieId}`)
    } else {
      navigate('/movies')
    }
  }

  if (loading && isEditing) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingMessage}>
          <h2>Loading movie data...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{movieId ? 'Update Movie' : 'Add New Movie'}</h2>
        
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
        <label>Title *</label>
        <input 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          placeholder="Enter movie title" 
          required 
          disabled={loading}
        />

        <label>Summary *</label>
        <textarea 
          name="summary" 
          value={formData.summary} 
          onChange={handleChange} 
          placeholder="Enter movie summary" 
          required 
          disabled={loading}
        />

        <label>Director *</label>
        <input 
          name="director" 
          value={formData.director} 
          onChange={handleChange} 
          placeholder="Enter director name" 
          required 
          disabled={loading}
        />

        <label>Duration (minutes) *</label>
        <input 
          type="number" 
          name="duration" 
          value={formData.duration} 
          onChange={handleChange} 
          placeholder="Enter duration in minutes" 
          min="1"
          required 
          disabled={loading}
        />

        <label>Category *</label>
        <select 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          required 
          disabled={loading}
        >
          <option value="">Select Category</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Horror">Horror</option>
          <option value="Comedy">Comedy</option>
          <option value="Romance">Romance</option>
          <option value="Science-fiction">Science-fiction</option>
        </select>

        <label>Poster URL</label>
        <input 
          name="poster" 
          value={formData.poster} 
          onChange={handleChange} 
          placeholder="Enter poster image URL (e.g., https://example.com/poster.jpg)" 
          disabled={loading}
        />

        {formData.poster && (
          <div className={styles.posterPreview}>
            <p>Poster Preview:</p>
            <img 
              src={formData.poster} 
              alt="Poster preview" 
              className={styles.previewImage}
              crossOrigin="anonymous"
              onLoad={(e) => {
                console.log('Image loaded successfully:', formData.poster)
                e.target.nextSibling.style.display = 'none'
              }}
              onError={(e) => {
                console.error('Image failed to load:', formData.poster)
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'block'
              }}
            />
            <div className={styles.previewError} style={{display: 'none'}}>
              ⚠️ Unable to load image. This might be due to CORS restrictions or an invalid URL.
              <br />
              <small>Try the suggested URLs above or use a direct image link from services like Imgur, Pexels, or Lorem Picsum.</small>
              <br />
              <small>For Google Images: Right-click the image → "Copy image address" instead of the search result URL.</small>
            </div>
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Saving...' : (movieId ? 'Update Movie' : 'Add Movie')}
          </button>
          
          <button 
            type="button" 
            onClick={handleCancel} 
            disabled={loading}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default MovieForm