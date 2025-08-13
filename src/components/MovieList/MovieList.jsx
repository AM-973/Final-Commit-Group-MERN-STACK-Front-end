import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';
import Icon from '../Icon/Icon';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';

const MovieList = (props) => {
return (
  <main className={styles.container}>
    <h1>Movie List</h1>
    {props.movies.map((movie) => (
      <Link key={movie._id} to={`/movies/${movie._id}`} className={styles.movieLink}>
        <article className={styles.movieCard}>
          <div className={styles.moviePoster}>
            {movie.poster ? (
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className={styles.posterImage}
                crossOrigin="anonymous"
                onError={(e) => {
                  console.error('Failed to load poster in list:', movie.poster)
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
                onLoad={() => {
                  console.log('Poster loaded in list:', movie.poster)
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
    ))}
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
