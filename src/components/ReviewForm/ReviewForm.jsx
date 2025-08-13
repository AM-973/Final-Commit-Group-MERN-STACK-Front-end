import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as movieService from '../../services/movieService';
import { useNavigate } from 'react-router-dom';
import styles from './ReviewForm.module.css'
import Icon from '../Icon/Icon'

const ReviewForm = (props) => {
  const [formData, setFormData] = useState({ comment: '', rating: 5 });
  const { movieId, reviewId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchMovie = async () => {
        const movieData = await movieService.show(movieId);
        
        setFormData(movieData.reviews.find((review) => review._id === reviewId));
      };
      if (movieId && reviewId) fetchMovie();
    }, [movieId, reviewId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//     props.handleAddComment(formData);
//     setFormData({ text: '' });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="text-input">Your Review:</label>
//       <textarea
//         required
//         type="text"
//         name="text"
//         id="text-input"
//         value={formData.text}
//         onChange={handleChange}
//       />
//       <button type="submit">SUBMIT REVIEW</button>
const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (movieId && reviewId) {
      await movieService.updateReview(movieId, reviewId, formData);
      navigate(`/movies/${movieId}`);
    } else {
      props.handleAddReview(formData);
    }
    setFormData({ comment: '', rating: 5 });
  };

  if (movieId && reviewId) return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Edit Review</h1>
        <label htmlFor="comment-input">Your review:</label>
        <textarea
          required
          name="comment"
          id="comment-input"
          value={formData.comment}
          onChange={handleChange}
        />
        <label htmlFor="rating-input">Rating:</label>
        <select
          required
          name="rating"
          id="rating-input"
          value={formData.rating}
          onChange={handleChange}
        >
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
        <button type="submit">Edit</button>
      </form>
    </main>
  );

  return (
    
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment-input">Your review:</label>
      <textarea
        required
        name="comment"
        id="comment-input"
        value={formData.comment}
        onChange={handleChange}
      />
      <label htmlFor="rating-input">Rating:</label>
      <select
        required
        name="rating"
        id="rating-input"
        value={formData.rating}
        onChange={handleChange}
      >
        <option value={1}>1 Star</option>
        <option value={2}>2 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={5}>5 Stars</option>
      </select>
      <button type="submit"><Icon category="Create" /></button>
    </form>
  );
};

export default ReviewForm;
