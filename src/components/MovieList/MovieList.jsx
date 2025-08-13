import { Link } from 'react-router-dom';

const MovieList = (props) => {
return (
  <main>
    {props.movies.map((movie) => (
      <Link key={movie._id} to={`/movies/${movie._id}`}>
        <article>
          <header>
            <h2>{movie.title}</h2>
          </header>
          <p>{movie.text}</p>
        </article>
      </Link>
    ))}
  </main>
);
}

export default MovieList;