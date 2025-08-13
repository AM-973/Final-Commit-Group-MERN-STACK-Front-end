import { Link } from 'react-router-dom'
import styles from './MovieList.module.css'
import Icon from '../Icon/Icon'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo'
import Loading from '../Loading/Loading'

const MovieList = (props) => {
  if (!props.movies) {
    return <Loading />
  }

  if (props.movies.length === 0) {
    return (
      <main className={styles.container}>
        <div className="container">
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🎬</div>
            <h2 className={styles.emptyTitle}>No Movies Available</h2>
            <p className={styles.emptyDescription}>
              Check back later for new movie releases!
            </p>
            <Link to="/" className="btn btn--primary">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Featured Movies</h1>
          <p className={styles.subtitle}>
            Discover the latest blockbusters and timeless classics
          </p>
        </header>

        <div className={`grid grid--3 ${styles.movieGrid}`}>
          {props.movies.map((movie) => (
            <article key={movie._id} className={`card ${styles.movieCard}`}>
              <Link to={`/movies/${movie._id}`} className={styles.movieLink}>
                <div className={styles.moviePoster}>
                  {movie.posterUrl ? (
                    <img 
                      src={movie.posterUrl} 
                      alt={`${movie.title} poster`}
                      className={styles.posterImage}
                    />
                  ) : (
                    <div className={styles.posterPlaceholder}>
                      <Icon category={movie.category} />
                      <span className={styles.posterTitle}>{movie.title}</span>
                    </div>
                  )}
                  <div className={styles.movieOverlay}>
                    <button className="btn btn--primary btn--sm">
                      View Details
                    </button>
                  </div>
                </div>

                <div className={styles.movieContent}>
                  <header className={styles.movieHeader}>
                    <div className={styles.movieMeta}>
                      <h2 className={styles.movieTitle}>{movie.title}</h2>
                      <div className={styles.categoryBadge}>
                        <Icon category={movie.category} />
                        <span>{movie.category}</span>
                      </div>
                    </div>
                    <AuthorInfo content={movie} />
                  </header>

                  <div className={styles.movieDetails}>
                    <p className={styles.movieSummary}>
                      {movie.summary?.length > 120 
                        ? `${movie.summary.substring(0, 120)}...` 
                        : movie.summary
                      }
                    </p>
                    
                    <div className={styles.movieInfo}>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Director:</span>
                        <span className={styles.infoValue}>{movie.director}</span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Duration:</span>
                        <span className={styles.infoValue}>{movie.duration} min</span>
                      </div>
                      {movie.rating && (
                        <div className={styles.infoItem}>
                          <span className={styles.infoLabel}>Rating:</span>
                          <span className={`badge badge--gold ${styles.rating}`}>
                            ⭐ {movie.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {props.movies.length > 0 && (
          <footer className={styles.footer}>
            <p className={styles.footerText}>
              Showing {props.movies.length} movie{props.movies.length !== 1 ? 's' : ''}
            </p>
          </footer>
        )}
      </div>
    </main>
  )
}

export default MovieList