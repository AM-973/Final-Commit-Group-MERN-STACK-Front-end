import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as movieService from '../../services/movieService'
import styles from './MovieForm.module.css'
const MovieForm = ({ handleAddMovie, handleUpdateMovie }) => {
  const { movieId } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    director: '',
    duration: '',
    category: '',
    poster: '',
  })

  useEffect(() => {
    if (movieId) {
      // fetch movie for editing
      const fetchMovie = async () => {
        const movie = await movieService.show(movieId)
        setFormData({
          title: movie.title,
          summary: movie.summary,
          director: movie.director,
          duration: movie.duration,
          category: movie.category,
          poster: movie.poster || '',
        })
      }
      fetchMovie()
    }
  }, [movieId])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (movieId) {
      await handleUpdateMovie(formData, movieId)
    } else {
      await handleAddMovie(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="summary" value={formData.summary} onChange={handleChange} placeholder="Summary" required />
      <input name="director" value={formData.director} onChange={handleChange} placeholder="Director" required />
      <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" required />
      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Horror">Horror</option>
        <option value="Comedy">Comedy</option>
        <option value="Romance">Romance</option>
        <option value="Science-fiction">Science-fiction</option>
      </select>
      <input name="poster" value={formData.poster} onChange={handleChange} placeholder="Poster URL" />
      <button type="submit">{movieId ? 'Update Movie' : 'Add Movie'}</button>
    </form>
  )
}

export default MovieForm