import { Link } from 'react-router-dom'
import styles from './MovieList.module.css'
import Icon from '../Icon/Icon'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo'
const MovieList = (props) => {

    return (
      <main className={styles.container}>
        <h1>Movie List</h1>
        {props.movies.map((movie) => (
            <Link key={movie._id} to={`/movies/${movie._id}`}>
          <article >  
            <header>
                <div>
            <h2>{movie.title}</h2>
            <Icon category={movie.category} />
            </div>
            <AuthorInfo content={movie} />
            </header>
            <p>{movie.summary}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Duration:</strong> {movie.duration} minutes</p>
          </article>
          </Link>
        ))}
      </main>
    )
  }
  
  export default MovieList