import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as movieService from '../../services/movieService'
import styles from './ReviewForm.module.css'

const ReviewForm = (props) => {
  const [formData, setFormData] = useState({ comment: '', rating: 5 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { movieId, reviewId } = useParams()
  const navigate = useNavigate()
  
  const isEditing = !!(movieId && reviewId)
  
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const movieData = await movieService.show(movieId)
        const review = movieData.reviews.find((review) => review._id === reviewId)
        if (review) {
          setFormData(review)
        }
      } catch (err) {
        console.error('Error fetching review:', err)
      }
    }
    
    if (isEditing) {
      fetchReview()
    }
  }, [movieId, reviewId, isEditing])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    setIsSubmitting(true)
    
    try {
      if (isEditing) {
        await movieService.updateReview(movieId, reviewId, formData)
        navigate(`/movies/${movieId}`)
      } else {
        await props.handleAddReview(formData)
        setFormData({ comment: '', rating: 5 })
      }
    } catch (err) {
      console.error('Error submitting review:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStarRating = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  if (isEditing) {
    return (
      <main className={styles.container}>
        <div className={`container ${styles.editContainer}`}>
          <header className={styles.header}>
            <h1 className={styles.title}>Edit Your Review</h1>
            <p className={styles.subtitle}>Update your thoughts about this movie</p>
          </header>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="field">
              <label htmlFor="comment-input" className="label">
                Your Review
              </label>
              <textarea
                id="comment-input"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className={`input ${styles.textarea}`}
                placeholder="Share your thoughts about this movie..."
                rows={6}
                required
              />
              <p className="helperText">
                Write a detailed review to help other movie lovers
              </p>
            </div>
            
            <div className="field">
              <label htmlFor="rating-input" className="label">
                Rating
              </label>
              <div className={styles.ratingContainer}>
                <select
                  id="rating-input"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className={`input ${styles.ratingSelect}`}
                  required
                >
                  <option value={1}>1 Star - Poor</option>
                  <option value={2}>2 Stars - Fair</option>
                  <option value={3}>3 Stars - Good</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={5}>5 Stars - Excellent</option>
                </select>
                <div className={styles.starPreview}>
                  {renderStarRating(parseInt(formData.rating))}
                </div>
              </div>
            </div>
            
            <div className={styles.actions}>
              <button 
                type="button" 
                onClick={() => navigate(`/movies/${movieId}`)}
                className="btn btn--ghost"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn--primary"
                disabled={isSubmitting || !formData.comment.trim()}
              >
                {isSubmitting ? 'Updating...' : 'Update Review'}
              </button>
            </div>
          </form>
        </div>
      </main>
    )
  }

  return (
    <section className={styles.reviewSection}>
      <header className={styles.reviewHeader}>
        <h3 className={styles.reviewTitle}>Write a Review</h3>
        <p className={styles.reviewSubtitle}>Share your experience with other movie lovers</p>
      </header>
      
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <div className="field">
          <label htmlFor="comment-input" className="label">
            Your Review
          </label>
          <textarea
            id="comment-input"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className={`input ${styles.textarea}`}
            placeholder="What did you think of this movie? Share your thoughts..."
            rows={4}
            required
          />
        </div>
        
        <div className="field">
          <label htmlFor="rating-input" className="label">
            Rating
          </label>
          <div className={styles.ratingContainer}>
            <select
              id="rating-input"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className={`input ${styles.ratingSelect}`}
              required
            >
              <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
              <option value={4}>⭐⭐⭐⭐☆ Very Good</option>
              <option value={3}>⭐⭐⭐☆☆ Good</option>
              <option value={2}>⭐⭐☆☆☆ Fair</option>
              <option value={1}>⭐☆☆☆☆ Poor</option>
            </select>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="btn btn--primary btn--full"
          disabled={isSubmitting || !formData.comment.trim()}
        >
          {isSubmitting ? 'Publishing...' : 'Publish Review'}
        </button>
      </form>
    </section>
  )
}

export default ReviewForm