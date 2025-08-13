import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';
import Icon from '../Icon/Icon';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';

// Temporary poster URLs for demonstration (remove when backend supports posters)
const tempPosters = {
  "The Matrix23123": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
  "The matrix part 3": "https://m.media-amazon.com/images/M/MV5BYTZkODlkZjQtMmUzOS00YzFhLTlhZjMtZDEzNTA1YWY2NTMwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
  "Weapons": "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_.jpg",
  "Test Movie with Poster": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWI5MTktXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  "Taken": "https://upload.wikimedia.org/wikipedia/en/e/ed/Taken_film_poster.jpg"
};

const MovieList = (props) => {
return (
  <main className={styles.container}>
    <h1>Movie List</h1>
    {props.movies.map((movie) => {
      // Add temporary poster for demonstration
      const movieWithPoster = {
        ...movie,
        poster: movie.poster || tempPosters[movie.title] || null
      };
      
      return (
      <Link key={movie._id} to={`/movies/${movie._id}`} className={styles.movieLink}>
        <article className={styles.movieCard}>
          <div className={styles.moviePoster}>
            {movieWithPoster.poster ? (
              <img 
                src={movieWithPoster.poster} 
                alt={movie.title} 
                className={styles.posterImage}
                crossOrigin="anonymous"
                onError={(e) => {
                  console.error('Failed to load poster in list:', movieWithPoster.poster)
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
                onLoad={() => {
                  console.log('Poster loaded in list:', movieWithPoster.poster)
                }}
              />
            ) : (
              <div className={styles.posterPlaceholder}>
                <span>No Image</span>
              </div>
            )}
          </div>
          <div className={styles.movieContent}>
            <header className={styles.movieHeader}>
              <div className={styles.titleSection}>
                <h2>{movie.title}</h2>
                <Icon category={movie.category} />
              </div>
              <AuthorInfo content={movie} />
            </header>
            <p className={styles.movieSummary}>{movie.summary}</p>
            <div className={styles.movieMeta}>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Duration:</strong> {movie.duration} minutes</p>
              <p><strong>Category:</strong> {movie.category}</p>
            </div>
          </div>
        </article>
      </Link>
    )})}
  </main>
);
}

export default MovieList;
// import { Link } from 'react-router-dom'
// import styles from './MovieList.module.css'
// import Icon from '../Icon/Icon'
// import AuthorInfo from '../../components/AuthorInfo/AuthorInfo'
// const MovieList = (props) => {

//     return (
//       <main className={styles.container}>
//         <h1>Movie List</h1>
//         {props.movies.map((movie) => (
//             <Link key={movie._id} to={`/movies/${movie._id}`}>
//           <article >  
//             <header>
//                 <div>
//             <h2>{movie.title}</h2>
//             <Icon category={movie.category} />
//             </div>
//             <AuthorInfo content={movie} />
//             </header>
//             <p>{movie.summary}</p>
//             <p><strong>Director:</strong> {movie.director}</p>
//             <p><strong>Duration:</strong> {movie.duration} minutes</p>
//           </article>
//           </Link>
//         ))}
//       </main>
//     )
//   }
  
//   export default MovieList
