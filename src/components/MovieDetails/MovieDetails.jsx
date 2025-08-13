import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as movieService from '../../services/movieService'
import { Link } from 'react-router-dom'
import './MovieDetails.css'
import styles from './MovieDetails.module.css'
import Loading from '../Loading/Loading'
import Icon from '../Icon/Icon'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo'
import SeatBooking from '../SeatBooking/SeatBooking'


const MovieDetails = (props) => {

  const { movieId } = useParams()

  const [movie, setMovie] = useState(null)
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(5)
  const [showSeatBooking, setShowSeatBooking] = useState(false)
  
  useEffect(() => {
    // fetch a single movie
    const fetchMovie = async () => {
      const movieData = await movieService.show(movieId)
      setMovie(movieData)
    }
    fetchMovie()
  }, [movieId])

  const handleAddReview = async (e) => {
    e.preventDefault()
    if (!props.user) {
      alert('Please log in to add a review')
      return
    }
    
    if (!review.trim()) {
      alert('Please write a review before submitting')
      return
    }
    
    try {
      console.log('Submitting review:', { comment: review, rating: rating })
      const reviewData = { comment: review, rating: rating }
      const newReview = await movieService.createReview(reviewData, movieId)
      console.log('Review added successfully:', newReview)
      
      setMovie({
        ...movie, 
        reviews: [...(movie.reviews || []), newReview]
      })
      setReview('')
      setRating(5)
      alert('Review added successfully!')
    } catch (error) {
      console.error('Error adding review:', error)
      alert(`Failed to add review: ${error.message}`)
    }
  }

  const handleBookTickets = async (e) => {
    e.preventDefault()
    if (!props.user) {
      alert('Please log in to book tickets')
      return
    }
    try {
      const bookingData = { 
        numberOfTickets: 1, 
        showtime: new Date().toISOString() 
      }
      await movieService.bookTickets(bookingData, movieId)
      alert(`Successfully booked ticket(s) for ${movie.title}!`)
    } catch (error) {
      console.error('Booking error:', error)
      alert('Failed to book tickets. Please try again.')
    }
  }

  const handleSeatBookingComplete = (bookedSeats) => {
    setShowSeatBooking(false)
    // Optionally refresh movie data or show confirmation
  }

  if (!movie) return <main className="movie-details-not-found">Movie not found</main>

  return (
    <main className="movie-details">
      <div className="movie-details-container">
        <div className="movie-header">
          <div className="movie-poster">
            {movie.poster ? (
              <img 
                src={movie.poster} 
                alt={movie.title} 
                crossOrigin="anonymous"
                onError={(e) => {
                  console.error('Failed to load movie poster:', movie.poster)
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
                onLoad={() => {
                  console.log('Movie poster loaded successfully:', movie.poster)
                }}
              />
            ) : (
              <div className="poster-placeholder">
                <span>No Image</span>
              </div>
            )}
          </div>
          
          <div className="movie-info">
            <p className="movie-genre">{movie.genre?.toUpperCase() || 'MOVIE'}</p>
            <h1 className="movie-title">{movie.title}</h1>

            <div className="movie-meta">
              <p><strong>Duration:</strong> {movie.duration || 'N/A'} minutes</p>
              <p><strong>Rating:</strong> {movie.rating || 'Not Rated'}</p>
              <p><strong>Release Date:</strong> {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : 'TBA'}</p>
            </div>

            {/* Add Edit/Delete Buttons */}
            {props.user && (
              <div className="movie-buttons">
                <Link to={`/movies/${movie._id}/edit`}>
                  <button className="edit-button">Edit Movie</button>
                </Link>
                <button className="delete-button" onClick={() => props.handleDeleteMovie(movie._id)}>
                  Delete Movie
                </button>
              </div>
            )}

            <div className="movie-description">
              <h3>Description</h3>
              <p>{movie.description || 'No description available.'}</p>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        {props.user && (
          <div className="booking-section">
            <div className="booking-controls">
              <button 
                className={`book-button ${showSeatBooking ? 'active' : ''}`}
                onClick={() => setShowSeatBooking(!showSeatBooking)}
              >
                {showSeatBooking ? 'Hide Seat Selection' : 'Book Tickets - Select Seats'}
              </button>
            </div>
            
            {showSeatBooking && (
              <SeatBooking 
                movieId={movieId}
                user={props.user}
                onBookingComplete={handleSeatBookingComplete}
              />
            )}
          </div>
        )}

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2>Reviews</h2>
          
          {props.user && (
            <form onSubmit={handleAddReview} className="review-form">
              <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="review">Your Review:</label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here..."
                  rows="4"
                  required
                />
              </div>
              
              <button type="submit" className="review-button">Add Review</button>
            </form>
          )}
          
          <div className="reviews-list">
            {!movie.reviews?.length && <p>No reviews yet. Be the first to review!</p>}

            {movie.reviews?.map((review) => (
              <div key={review._id} className="review-item">
                <div className="review-header">
                  <span className="reviewer-name">{review.user?.username || 'Anonymous'}</span>
                  <span className="review-rating">
                    {'★'.repeat(review.rating || 0)}{'☆'.repeat(5 - (review.rating || 0))}
                  </span>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="review-text">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default MovieDetails