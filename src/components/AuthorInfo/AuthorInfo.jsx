// src/components/AuthorInfo/AuthorInfo.jsx

import styles from './AuthorInfo.module.css';
import ProfileIcon from '../../assets/images/profile.png';
import Icon from '../Icon/Icon';

const AuthorInfo = ({ content }) => {

  // Handle different data structures: movies use 'owner', reviews use 'user' or 'author'
  const author = content.owner || content.user || content.author
  const authorName = author?.username
  
  return (
    <div className={styles.container}>
      <img src={ProfileIcon} alt="The user's avatar" />
      <section>
        <p>{authorName}</p>
        <div className={styles.container}>
          <Icon category="Calendar" />
          <p>{new Date(content.createdAt || content.creationdate).toLocaleDateString()}</p>
        </div>
      </section>
    </div>
  );
};

export default AuthorInfo;