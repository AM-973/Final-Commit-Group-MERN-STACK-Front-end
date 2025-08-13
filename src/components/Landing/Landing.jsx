// src/components/Landing/Landing.jsx

import styles from './Landing.module.css';
import Stars from '../../assets/images/stars.svg';
import Logotype from '../../assets/images/logotype.svg';

const Landing = () => {
  return (
    <>
      <main className={styles.container}>
        <section className={styles.splash}>
        </section>

        <section className={styles.about}>
          <header>
            <h3>WHO WE ARE</h3>
            <h1>ABOUT US</h1>
          </header>
          <article>
            <p>
              Welcome to the ultimate movie booking experience! We're building a 
              comprehensive platform where movie lovers can discover, review, and 
              book tickets for their favorite films. Our system provides an easy-to-use 
              interface for browsing movies, reading reviews, and securing your perfect seats. 
              Whether you're a casual movie-goer or a cinema enthusiast, our platform 
              makes it simple to find and book the perfect movie experience. With real-time 
              seat availability, comprehensive movie information, and user reviews, 
              you'll never miss out on the latest blockbusters or hidden gems.
            </p>
          </article>
        </section>

        <section className={styles.testimonial}>
          <header>
            <h3>WHAT USERS SAY</h3>
            <h1>TESTIMONIALS</h1>
          </header>
          <article>
            <header>
              <h4>Sarah Johnson</h4>
              <p>Movie Enthusiast</p>
            </header>
            <p>
              I discovered this platform through a friend, and it's completely transformed 
              how I book movies! The seat selection feature is incredibly intuitive, and 
              I love being able to read reviews before deciding what to watch. The booking 
              process is so smooth and convenient - no more waiting in long lines at the theater!
            </p>
            <footer>
              <img src={Stars} alt="Five star rating" />
            </footer>
          </article>
        </section>
      </main>

      <footer className={styles.footer}>
        © 2024 MOVIE BOOKING PLATFORM. ALL RIGHTS RESERVED
      </footer>
    </>
  );
};

export default Landing;