import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as movieService from '../../services/movieService'
import styles from './MovieForm.module.css'
const MovieForm = (props) => {

    const { movieId } = useParams()


    
  const initialState = {
		title: '',
		summary: '',
		director: '',
		duration: '',
		category: 'Action',
	}
  
	const [formData, setFormData] = useState(initialState)

    useEffect(() => {
        const fetchMovie = async () => {
            const data = await movieService.show(movieId)
            setFormData(data)
        }
        if (movieId) fetchMovie()
    }, [movieId])

	const handleChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

	const handleSubmit = (evt) => {
		evt.preventDefault()
        if (movieId) {
            props.handleUpdateMovie(formData, movieId)
        } else {
            props.handleAddMovie(formData)
        }
	}

	return (
		<main className={styles.container}>
			<form onSubmit={handleSubmit}>
                <h1>{movieId ? 'Edit Movie' : 'New Movie'}</h1>
				<label htmlFor="title-input">Title</label>
				<input
					required
					type="text"
					name="title"
					id="title-input"
					value={formData.title}
					onChange={handleChange}
				/>
				<label htmlFor="summary-input">Summary</label>
				<textarea
					required
					name="summary"
					id="summary-input"
					value={formData.summary}
					onChange={handleChange}
				/>
				<label htmlFor="director-input">Director</label>
				<input
					required
					type="text"
					name="director"
					id="director-input"
					value={formData.director}
					onChange={handleChange}
				/>
				<label htmlFor="duration-input">Duration (minutes)</label>
				<input
					required
					type="number"
					name="duration"
					id="duration-input"
					value={formData.duration}
					onChange={handleChange}
				/>
				<label htmlFor="category-input">Category</label>
				<select
					required
					name="category"
					id="category-input"
					value={formData.category}
					onChange={handleChange}
				>
					<option value="Action">Action</option>
					<option value="Adventure">Adventure</option>
					<option value="Horror">Horror</option>
					<option value="Comedy">Comedy</option>
					<option value="Romance">Romance</option>
					<option value="Science-fiction">Science-fiction</option>
				</select>
				<button type="submit">SUBMIT</button>
			</form>
		</main>
	)
}

export default MovieForm