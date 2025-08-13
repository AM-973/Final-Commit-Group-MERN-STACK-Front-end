
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as movieService from '../../services/movieService'
import { Link } from 'react-router-dom'
import './MovieDetails.css'

const MovieDetails = (props) => {

  const { movieId } = useParams()

  const [movie, setMovie] = useState(null)
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(5)
  const [tickets, setTickets] = useState(1)
  const [showtime, setShowtime] = useState('')
  
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
      return
    }
    const reviewData = { text: review, rating: rating }
    const newReview = await movieService.createReview(reviewData, movieId)
    setMovie({
      ...movie, 
      reviews: [...(movie.reviews || []), newReview]
    })
    setReview('')
    setRating(5)
  }

  const handleBookTickets = async (e) => {
    e.preventDefault()
    if (!props.user) {
      return
    }
    const bookingData = { 
      numberOfTickets: tickets, 
      showtime: showtime 
    }
    await movieService.bookTickets(bookingData, movieId)
    alert(`Successfully booked ${tickets} ticket(s) for ${movie.title}!`)
    setTickets(1)
    setShowtime('')
  }

  if (!movie) return <main className="movie-details-not-found">Movie not found</main>

  return (
    <main className="movie-details">
      <div className="movie-details-container">
        <div className="movie-header">
          <div className="movie-poster">
            {movie.poster ? (
              <img src={movie.poster} alt={movie.title} />
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
            <div className="movie-description">
              <h3>Description</h3>
              <p>{movie.description || 'No description available.'}</p>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        {props.user && (
          <div className="booking-section">
            <h2>Book Tickets</h2>
            <form onSubmit={handleBookTickets} className="booking-form">
              <div className="form-group">
                <label htmlFor="tickets">Number of Tickets:</label>
                <input
                  type="number"
                  id="tickets"
                  min="1"
                  max="10"
                  value={tickets}
                  onChange={(e) => setTickets(parseInt(e.target.value))}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="showtime">Select Showtime:</label>
                <select
                  id="showtime"
                  value={showtime}
                  onChange={(e) => setShowtime(e.target.value)}
                  required
                >
                  <option value="">Choose a showtime</option>
                  {movie.showtimes?.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                  )) || [
                    <option key="1" value="14:00">2:00 PM</option>,
                    <option key="2" value="17:00">5:00 PM</option>,
                    <option key="3" value="20:00">8:00 PM</option>
                  ]}
                </select>
              </div>
              
              <button type="submit" className="book-button">
                Book {tickets} Ticket{tickets > 1 ? 's' : ''}
              </button>
            </form>
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
                  <span className="reviewer-name">{review.author?.username || 'Anonymous'}</span>
                  <span className="review-rating">
                    {'★'.repeat(review.rating || 0)}{'☆'.repeat(5 - (review.rating || 0))}
                  </span>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default MovieDetails
