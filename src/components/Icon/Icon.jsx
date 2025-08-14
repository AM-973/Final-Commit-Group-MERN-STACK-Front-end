// src/components/Icon/Icon.jsx

import Add from '../../assets/images/add.svg';
import Edit from '../../assets/images/edit.svg';
import News from '../../assets/images/news.svg';
import Like from '../../assets/images/like.svg';
import Liked from '../../assets/images/liked.svg';
import Music from '../../assets/images/music.svg';
import Games from '../../assets/images/games.svg';
import Trash from '../../assets/images/trash.svg';
import Movies from '../../assets/images/movies.svg';
import Sports from '../../assets/images/sports.svg';
import Create from '../../assets/images/create.svg';
import Comments from '../../assets/images/comments.svg';
import Calendar from '../../assets/images/calendar.svg';
import Televison from '../../assets/images/television.svg';
import CinemaCompany from '../../assets/images/cinemacompany.jpg.png';

const Icon = ({ category }) => {
  const icons = {
    Add: Add,
    News: News,
    Like: Like,
    Edit: Edit,
    Music: Music,
    Games: Games,
    Liked: Liked,
    Trash: Trash,
    Movies: Movies,
    Sports: Sports,
    Create: Create,
    Calendar: Calendar,
    Comments: Comments,
    Television: Televison,
    CinemaCompany: CinemaCompany,
  };

  return (
    <img
      src={icons[category]}
      alt={`A ${category} icon.`}
      id={category.toLowerCase()}
      className="icon"
    />
  );
};

export default Icon;