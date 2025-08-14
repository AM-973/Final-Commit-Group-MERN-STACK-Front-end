import { Link } from 'react-router-dom'
import styles from './Landing.module.css'
import Stars from '../../assets/images/stars.svg'
import CinemaCompany from '../../assets/images/cinemacompany.jpg.png'

const Landing = () => {
  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Your Ultimate 
              <span className={styles.accent}> Movie Booking</span>
              <br />Experience
            </h1>
            <p className={styles.heroDescription}>
              Discover, review, and book tickets for the latest blockbusters and hidden gems. 
              Experience cinema like never before with our seamless booking platform.
            </p>
            <div className={styles.heroActions}>
              <Link to="/movies" className="btn btn--primary btn--lg">
                Browse Movies
              </Link>
              <Link to="/sign-up" className="btn btn--secondary btn--lg">
                Get Started
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img 
              src={CinemaCompany} 
              alt="Cinema experience" 
              className={styles.heroImg}
            />
            <div className={styles.heroOverlay}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h6 className={styles.sectionLabel}>Features</h6>
            <h2 className={styles.sectionTitle}>Why Choose Us</h2>
            <p className={styles.sectionDescription}>
              Experience the future of movie booking with our cutting-edge features
            </p>
          </header>
          
          <div className="grid grid--3">
            <article className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>🎬</div>
              <h3 className={styles.featureTitle}>Latest Movies</h3>
              <p className={styles.featureDescription}>
                Stay up-to-date with the newest releases and upcoming blockbusters.
              </p>
            </article>
            
            <article className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>🎫</div>
              <h3 className={styles.featureTitle}>Easy Booking</h3>
              <p className={styles.featureDescription}>
                Book your seats in seconds with our intuitive seat selection system.
              </p>
            </article>
            
            <article className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}>⭐</div>
              <h3 className={styles.featureTitle}>User Reviews</h3>
              <p className={styles.featureDescription}>
                Read authentic reviews from fellow movie lovers before you book.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <div className="container">
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <header className={styles.sectionHeader}>
                <h6 className={styles.sectionLabel}>About Us</h6>
                <h2 className={styles.sectionTitle}>Revolutionizing Cinema</h2>
              </header>
              <div className="stack stack--md">
                <p>
                  We're building a comprehensive platform where movie lovers can discover, 
                  review, and book tickets for their favorite films. Our system provides 
                  an easy-to-use interface for browsing movies, reading reviews, and 
                  securing your perfect seats.
                </p>
                <p>
                  Whether you're a casual movie-goer or a cinema enthusiast, our platform 
                  makes it simple to find and book the perfect movie experience. With 
                  real-time seat availability, comprehensive movie information, and user 
                  reviews, you'll never miss out on the latest blockbusters or hidden gems.
                </p>
              </div>
            </div>
            <div className={styles.aboutStats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>10K+</div>
                <div className={styles.statLabel}>Happy Customers</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>500+</div>
                <div className={styles.statLabel}>Movies Available</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Cinema Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className={styles.testimonial}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <h6 className={styles.sectionLabel}>Testimonials</h6>
            <h2 className={styles.sectionTitle}>What Our Users Say</h2>
          </header>
          
          <div className={styles.testimonialCard}>
            <blockquote className={styles.quote}>
              "I discovered this platform through a friend, and it's completely transformed 
              how I book movies! The seat selection feature is incredibly intuitive, and 
              I love being able to read reviews before deciding what to watch. The booking 
              process is so smooth and convenient - no more waiting in long lines at the theater!"
            </blockquote>
            <footer className={styles.testimonialFooter}>
              <div className={styles.testimonialAuthor}>
                <strong>Sarah Johnson</strong>
                <span>Movie Enthusiast</span>
              </div>
              <div className={styles.rating} aria-label="5 star rating">
                <img src={Stars} alt="Five stars" />
              </div>
            </footer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Start Your Movie Journey?</h2>
            <p className={styles.ctaDescription}>
              Join thousands of movie lovers who trust our platform for their cinema experience.
            </p>
            <div className={styles.ctaActions}>
              <Link to="/sign-up" className="btn btn--primary btn--lg">
                Sign Up Now
              </Link>
              <Link to="/movies" className="btn btn--ghost btn--lg">
                Browse Movies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing