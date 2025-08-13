
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as movieService from '../../services/movieService'
import { Link } from 'react-router-dom'
import './MovieDetails.css'
import ReviewForm from '../ReviewForm/ReviewForm'
import styles from './MovieDetails.module.css'
import Loading from '../Loading/Loading'
import Icon from '../Icon/Icon'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo'


const MovieDetails = (props) => {

  const { movieId } = useParams()

  const [movie, setMovie] = useState(null)
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(5)
  const [tickets, setTickets] = useState(1)
  const [showtime, setShowtime] = useState('')
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  
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


//      // call the movie service
//       const movieData = await movieService.show(movieId)
//       setMovie(movieData)
//     }
    
//     // fetch seats for this movie
//     const fetchSeats = async () => {
//       const seatsData = await movieService.getSeats(movieId)
//       setSeats(seatsData)
//     }
    
//     fetchMovie()
//     fetchSeats()
//   }, [movieId])

//   const handleAddReview = async (reviewFormData) => {
//     const newReview = await movieService.createReview(reviewFormData, movieId)
//     setMovie({...movie, reviews: [...movie.reviews, newReview]})
//   }

//   const handleDeleteReview = async(movieId, reviewId) => {
//     try {
//       await movieService.deleteReview(movieId, reviewId)
//       setMovie({
//         ...movie,
//         reviews: movie.reviews.filter((review) => review._id !== reviewId),
//       });
//     } catch (err) {
//       console.error('Failed to delete review:', err)
//     }
//   }

//   const handleSeatSelection = (seatNumber) => {
//     if (selectedSeats.includes(seatNumber)) {
//       setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber))
//     } else {
//       setSelectedSeats([...selectedSeats, seatNumber])
//     }
//   }

//   const handleBookSeats = async () => {
//     if (selectedSeats.length === 0) {
//       alert('Please select at least one seat')
//       return
//     }
    
//     try {
//       await movieService.bookSeats(movieId, selectedSeats)
//       alert('Seats booked successfully!')
//       // Refresh seats
//       const seatsData = await movieService.getSeats(movieId)
//       setSeats(seatsData)
//       setSelectedSeats([])
//     } catch (err) {
//       console.error('Failed to book seats:', err)
//       alert('Failed to book seats. Please try again.')
//     }
//   }

//   if (!movie) return <Loading />

//   return (
//     <main className={styles.container}>
//         <section>
//       <header>
//         <p>{movie.category}</p>
//         <h2>{movie.title}</h2>
//         <AuthorInfo content={movie} />
//           {props.user?.isAdmin && (
//   <>
//     <Link to={`/movies/${movieId}/edit`}>
//       <Icon category="Edit" />
//     </Link>
//     <button onClick={() => props.handleDeleteMovie(movieId)}>
//       <Icon category="Trash" />
//     </button>
//   </>
// )}
             
        
//       </header>
//       <p><strong>Summary:</strong> {movie.summary}</p>
//       <p><strong>Director:</strong> {movie.director}</p>
//       <p><strong>Duration:</strong> {movie.duration} minutes</p>
//       </section>
      
//       {/* Seat Selection */}
//       <section>
//         <h2>Select Seats</h2>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', margin: '20px 0' }}>
//           {seats.map((seat) => (
//             <button
//               key={seat._id}
//               onClick={() => handleSeatSelection(seat.number)}
//               disabled={!seat.isAvailable}
//               style={{
//                 padding: '10px',
//                 backgroundColor: !seat.isAvailable ? '#ccc' : selectedSeats.includes(seat.number) ? '#007bff' : '#fff',
//                 border: '1px solid #ddd',
//                 cursor: seat.isAvailable ? 'pointer' : 'not-allowed'
//               }}
//             >
//               {seat.number}
//             </button>
//           ))}
//         </div>
//         {selectedSeats.length > 0 && (
//           <div>
//             <p>Selected seats: {selectedSeats.join(', ')}</p>
//             <button onClick={handleBookSeats}>Book Selected Seats</button>
//           </div>
//         )}
//       </section>
      
//       <hr/>
//       <h2>Reviews</h2>
//       {!movie.reviews?.length && <p>There are no reviews.</p>}
//       {movie.reviews?.map((review) => {
//         const authorId = review.user._id
        
//         return (
//           <article key={review._id}>
//             <header>
//             <AuthorInfo content={review} />
//             {authorId === props.user?._id || props.user?.isAdmin && (
//               <>
//                 <Link to={`/movies/${movieId}/reviews/${review._id}/edit`}><Icon category="Edit" /></Link>
//                 <button onClick={() => handleDeleteReview(movieId, review._id)}><Icon category="Trash" /></button>
//               </>
//             )}
//             <p>Rating: {review.rating}/5</p>
//             <p>Reviewer: {review.user.username}</p>
            
//             {authorId === props.user?._id && (
//               <>
//                 <Link to={`/movies/${movieId}/reviews/${review._id}/edit`}><Icon category="Edit" /></Link>
//                 <button onClick={() => handleDeleteReview(movieId, review._id)}><Icon category="Trash" /></button>
//               </>
//             )}
//             </header>
            
//             <p>{review.comment}</p>
//             <hr/>

//           </article>
          
//         )
//       })}
//       <ReviewForm handleAddReview={handleAddReview} />
//       <hr/>

export default MovieDetails
