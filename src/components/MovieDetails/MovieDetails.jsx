import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as movieService from '../../services/movieService'
import ReviewForm from '../ReviewForm/ReviewForm'
import { Link } from 'react-router-dom'
import styles from './MovieDetails.module.css'
import Loading from '../Loading/Loading'
import Icon from '../Icon/Icon'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo'


const MovieDetails = (props) => {

  const { movieId } = useParams()
  const [movie, setMovie] = useState()
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  
  useEffect(() => {
    // fetch a single movie
    const fetchMovie = async () => {
      // call the movie service
      const movieData = await movieService.show(movieId)
      setMovie(movieData)
    }
    
    // fetch seats for this movie
    const fetchSeats = async () => {
      const seatsData = await movieService.getSeats(movieId)
      setSeats(seatsData)
    }
    
    fetchMovie()
    fetchSeats()
  }, [movieId])

  const handleAddReview = async (reviewFormData) => {
    const newReview = await movieService.createReview(reviewFormData, movieId)
    setMovie({...movie, reviews: [...movie.reviews, newReview]})
  }

  const handleDeleteReview = async(movieId, reviewId) => {
    try {
      await movieService.deleteReview(movieId, reviewId)
      setMovie({
        ...movie,
        reviews: movie.reviews.filter((review) => review._id !== reviewId),
      });
    } catch (err) {
      console.error('Failed to delete review:', err)
    }
  }

  const handleSeatSelection = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber))
    } else {
      setSelectedSeats([...selectedSeats, seatNumber])
    }
  }

  const handleBookSeats = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat')
      return
    }
    
    try {
      await movieService.bookSeats(movieId, selectedSeats)
      alert('Seats booked successfully!')
      // Refresh seats
      const seatsData = await movieService.getSeats(movieId)
      setSeats(seatsData)
      setSelectedSeats([])
    } catch (err) {
      console.error('Failed to book seats:', err)
      alert('Failed to book seats. Please try again.')
    }
  }

  if (!movie) return <Loading />

  return (
    <main className={styles.container}>
        <section>
      <header>
        <p>{movie.category}</p>
        <h2>{movie.title}</h2>
        <AuthorInfo content={movie} />
          {props.user?.isAdmin && (
  <>
    <Link to={`/movies/${movieId}/edit`}>
      <Icon category="Edit" />
    </Link>
    <button onClick={() => props.handleDeleteMovie(movieId)}>
      <Icon category="Trash" />
    </button>
  </>
)}
             
        
      </header>
      <p><strong>Summary:</strong> {movie.summary}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Duration:</strong> {movie.duration} minutes</p>
      </section>
      
      {/* Seat Selection */}
      <section>
        <h2>Select Seats</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', margin: '20px 0' }}>
          {seats.map((seat) => (
            <button
              key={seat._id}
              onClick={() => handleSeatSelection(seat.number)}
              disabled={!seat.isAvailable}
              style={{
                padding: '10px',
                backgroundColor: !seat.isAvailable ? '#ccc' : selectedSeats.includes(seat.number) ? '#007bff' : '#fff',
                border: '1px solid #ddd',
                cursor: seat.isAvailable ? 'pointer' : 'not-allowed'
              }}
            >
              {seat.number}
            </button>
          ))}
        </div>
        {selectedSeats.length > 0 && (
          <div>
            <p>Selected seats: {selectedSeats.join(', ')}</p>
            <button onClick={handleBookSeats}>Book Selected Seats</button>
          </div>
        )}
      </section>
      
      <hr/>
      <h2>Reviews</h2>
      {!movie.reviews?.length && <p>There are no reviews.</p>}
      {movie.reviews?.map((review) => {
        const authorId = review.user._id
        
        return (
          <article key={review._id}>
            <header>
            <AuthorInfo content={review} />
            {authorId === props.user?._id || props.user?.isAdmin && (
              <>
                <Link to={`/movies/${movieId}/reviews/${review._id}/edit`}><Icon category="Edit" /></Link>
                <button onClick={() => handleDeleteReview(movieId, review._id)}><Icon category="Trash" /></button>
              </>
            )}
            <p>Rating: {review.rating}/5</p>
            <p>Reviewer: {review.user.username}</p>
            
            {authorId === props.user?._id && (
              <>
                <Link to={`/movies/${movieId}/reviews/${review._id}/edit`}><Icon category="Edit" /></Link>
                <button onClick={() => handleDeleteReview(movieId, review._id)}><Icon category="Trash" /></button>
              </>
            )}
            </header>
            
            <p>{review.comment}</p>
            <hr/>

          </article>
          
        )
      })}
      <ReviewForm handleAddReview={handleAddReview} />
      <hr/>
    </main>
  )
}

export default MovieDetails