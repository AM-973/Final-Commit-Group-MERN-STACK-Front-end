import styles from './Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.container}`}>
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>© {currentYear} CinemaBooking. All rights reserved.</p>
          </div>
          <div className={styles.github}>
            <a 
              href="https://github.com/AM-973/Final-Commit-Group-MERN-STACK-Front-end" 
              className={styles.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code on GitHub"
            >
              <span className={styles.githubIcon}>⚡</span>
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
