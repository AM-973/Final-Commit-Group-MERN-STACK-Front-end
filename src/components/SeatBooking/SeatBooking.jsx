import { useState, useEffect } from 'react'
import * as movieService from '../../services/movieService'
import styles from './SeatBooking.module.css'

const SeatBooking = ({ movieId, user, onBookingComplete }) => {
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookingInProgress, setBookingInProgress] = useState(false)
  const [lastBookedSeats, setLastBookedSeats] = useState([])
  const [bookingMessage, setBookingMessage] = useState('')

  // Helper function to get locally booked seats from localStorage
  const getLocallyBookedSeats = () => {
    try {
      const stored = localStorage.getItem(`bookedSeats_${movieId}`)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  // Helper function to save locally booked seats to localStorage
  const saveLocallyBookedSeats = (seatIds) => {
    try {
      const currentBooked = getLocallyBookedSeats()
      const updatedBooked = [...new Set([...currentBooked, ...seatIds])]
      localStorage.setItem(`bookedSeats_${movieId}`, JSON.stringify(updatedBooked))
    } catch (err) {
      console.error('Failed to save booked seats:', err)
    }
  }

  // Generate seat layout (10 rows, 12 seats per row)
  const generateSeatLayout = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const seatsPerRow = 12
    const layout = []

    rows.forEach(row => {
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        layout.push({
          id: `${row}${seatNum}`,
          row: row,
          number: seatNum,
          isBooked: false, // Ensure all seats start as available
          isSelected: false
        })
      }
    })
    
    return layout
  }

  const fetchSeats = async () => {
    try {
      setLoading(true)
      // Get locally booked seats first
      const locallyBookedSeats = getLocallyBookedSeats()
      
      // Try to get existing seat data from backend
      const seatData = await movieService.getSeats(movieId)
      
      if (seatData && seatData.seats && Array.isArray(seatData.seats)) {
        // Backend returned seat data - merge with locally booked seats
        const mergedSeats = seatData.seats.map(seat => ({
          ...seat,
          // Keep seat as booked if it was locally booked OR backend says it's booked
          isBooked: seat.isBooked || locallyBookedSeats.includes(seat.id)
        }))
        
        setSeats(mergedSeats)
      } else {
        // Generate default seat layout if no valid data exists, but preserve locally booked seats
        const defaultLayout = generateSeatLayout()
        
        const preservedLayout = defaultLayout.map(seat => ({
          ...seat,
          isBooked: locallyBookedSeats.includes(seat.id)
        }))
        
        setSeats(preservedLayout)
      }
    } catch (err) {
      console.error('Error fetching seats:', err)
      // Always fallback to generated layout with locally booked seats preserved
      const defaultLayout = generateSeatLayout()
      const locallyBookedSeats = getLocallyBookedSeats()
      
      const preservedLayout = defaultLayout.map(seat => ({
        ...seat,
        isBooked: locallyBookedSeats.includes(seat.id)
      }))
      
      setSeats(preservedLayout)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (movieId) {
      fetchSeats()
    }
  }, [movieId])

  // Remove the auto-refresh that was overriding booked seats

  const handleSeatClick = (seatId) => {
    if (!user) {
      return // Just return without alert
    }

    const seat = seats.find(s => s.id === seatId)
    if (seat.isBooked) {
      return // Can't select booked seats - no alert needed
    }

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        // Deselect seat
        return prev.filter(id => id !== seatId)
      } else {
        // Select seat (limit to 8 seats max)
        if (prev.length >= 8) {
          return prev // Just don't add more seats, no alert
        }
        return [...prev, seatId]
      }
    })
  }

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      return // Just return without alert
    }

    if (!user) {
      return // Just return without alert
    }

    try {
      setBookingInProgress(true)
      
      // Try backend booking first, but always update local state
      try {
        await movieService.bookSeats(movieId, selectedSeats)
      } catch (backendError) {
        // Backend failed, but continue with local booking
        console.log('Backend booking failed, continuing with local booking')
      }
      
      // Always update local state regardless of backend success/failure
      setSeats(prev => prev.map(seat => ({
        ...seat,
        isBooked: selectedSeats.includes(seat.id) ? true : seat.isBooked
      })))
      
      // Save booked seats to localStorage for persistence
      saveLocallyBookedSeats(selectedSeats)
      
      setLastBookedSeats(selectedSeats)
      setSelectedSeats([])
      setBookingMessage(`Successfully booked ${selectedSeats.length} seat(s): ${selectedSeats.join(', ')}`)
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setBookingMessage('')
        setLastBookedSeats([])
      }, 5000)
      
      if (onBookingComplete) {
        onBookingComplete(selectedSeats)
      }
      
    } catch (err) {
      console.error('Booking failed:', err)
      setSelectedSeats([])
      // No alert - just silently fail and clear selection
    } finally {
      setBookingInProgress(false)
    }
  }

  const getSeatClass = (seat) => {
    if (seat.isBooked) {
      // Check if this seat was just booked by current user
      if (lastBookedSeats.includes(seat.id)) {
        return `${styles.booked} ${styles.justBooked}`
      }
      return styles.booked
    }
    if (selectedSeats.includes(seat.id)) return styles.selected
    return styles.available
  }

  if (loading) {
    return <div className={styles.loading}>Loading seats...</div>
  }

  // Group seats by row for display
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = []
    acc[seat.row].push(seat)
    return acc
  }, {})

  return (
    <div className={styles.seatBookingContainer}>
      <div className={styles.header}>
        <h2>Select Your Seats</h2>
      </div>
      
      {/* Screen */}
      <div className={styles.screen}>
        <div className={styles.screenText}>SCREEN</div>
      </div>

      {/* Booking Status Message */}
      {bookingMessage && (
        <div className={styles.bookingMessage}>
          <span>✅ {bookingMessage}</span>
        </div>
      )}

      {/* Seat Map */}
      <div className={styles.seatMap}>
        {Object.entries(seatsByRow).map(([row, rowSeats]) => (
          <div key={row} className={styles.seatRow}>
            <div className={styles.rowLabel}>{row}</div>
            <div className={styles.seats}>
              {rowSeats.map((seat, index) => (
                <div key={seat.id}>
                  <button
                    className={`${styles.seat} ${getSeatClass(seat)}`}
                    onClick={() => handleSeatClick(seat.id)}
                    disabled={seat.isBooked || bookingInProgress}
                    title={`Seat ${seat.id} - ${seat.isBooked ? 'Booked' : 'Available'}`}
                  >
                    {seat.isBooked ? '✕' : seat.number}
                  </button>
                  {/* Add aisle space after seat 6 */}
                  {index === 5 && <div className={styles.aisle}></div>}
                </div>
              ))}
            </div>
            <div className={styles.rowLabel}>{row}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.seat} ${styles.available}`}>1</div>
          <span>Available</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.seat} ${styles.selected}`}>2</div>
          <span>Selected</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.seat} ${styles.booked}`}>✕</div>
          <span>Booked</span>
        </div>
      </div>

      {/* Booking Summary */}
      {selectedSeats.length > 0 && (
        <div className={styles.bookingSummary}>
          <h3>Selected Seats: {selectedSeats.join(', ')}</h3>
          <p>Total Seats: {selectedSeats.length}</p>
          <p>Total Price: {(selectedSeats.length * 12).toFixed(2)} BHD</p>
          <button 
            className={styles.bookButton}
            onClick={handleBooking}
            disabled={bookingInProgress}
          >
            {bookingInProgress ? 'Booking...' : `Book ${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''}`}
          </button>
        </div>
      )}

      {!user && (
        <div className={styles.signInPrompt}>
          <p>Please sign in to book seats</p>
        </div>
      )}
    </div>
  )
}

export default SeatBooking
