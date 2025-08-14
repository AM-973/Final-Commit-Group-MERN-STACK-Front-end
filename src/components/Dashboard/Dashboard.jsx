import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as userService from '../../services/userService'
import styles from './Dashboard.module.css'

const Dashboard = ({ user }) => {
  const [ticketInfo, setTicketInfo] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tickets = await userService.getTickets()
        const userProfile = await userService.getProfile()
        setTicketInfo(tickets)
        setProfile(userProfile)
      } catch (err) {
        console.error('Failed to fetch user data:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUserData()
  }, [])

  if (loading) {
    return (
      <main className={styles.container}>
        <div className="container">
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>My Dashboard</h1>
          <p className={styles.subtitle}>
            Welcome back, {user.username}! Here's your account overview.
          </p>
        </header>

        <div className={styles.dashboardGrid}>
          {/* Profile Information Card */}
          <section className={`card ${styles.profileCard}`}>
            <header className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Profile Information</h2>
              <div className={styles.profileAvatar}>
                {user.username.charAt(0).toUpperCase()}
              </div>
            </header>
            
            <div className={styles.cardContent}>
              <div className={styles.profileInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Username</span>
                  <span className={styles.infoValue}>{user.username}</span>
                </div>
                
                {profile && (
                  <>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Member Since</span>
                      <span className={styles.infoValue}>
                        {new Date(profile.createdAt).toLocaleDateString('en-US')}
                      </span>
                    </div>
                    
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Account Type</span>
                      <span className={`${styles.infoValue} ${profile.isAdmin ? styles.adminBadge : styles.userBadge}`}>
                        {profile.isAdmin ? '👑 Administrator' : '🎬 Movie Lover'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Tickets Card */}
          <section className={`card ${styles.ticketsCard}`}>
            <header className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>My Tickets</h2>
              <div className={styles.ticketIcon}>🎫</div>
            </header>
            
            <div className={styles.cardContent}>
              {ticketInfo ? (
                <div className={styles.ticketStats}>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>{ticketInfo.ticketCount}</div>
                    <div className={styles.statLabel}>Total Tickets</div>
                  </div>
                  <p className={styles.ticketMessage}>{ticketInfo.message}</p>
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>No ticket information available</p>
                </div>
              )}
              
              <div className={styles.cardActions}>
                <Link to="/movies" className="btn btn--primary btn--sm">
                  Book New Tickets
                </Link>
              </div>
            </div>
          </section>

          {/* Admin Panel Card */}
          {user.isAdmin && (
            <section className={`card ${styles.adminCard}`}>
              <header className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Admin Panel</h2>
                <div className={styles.adminIcon}>⚡</div>
              </header>
              
              <div className={styles.cardContent}>
                <p className={styles.adminDescription}>
                  Manage your cinema platform with administrator privileges.
                </p>
                
                <div className={styles.adminActions}>
                  <Link to="/add-movie" className="btn btn--secondary btn--sm btn--full">
                    📽️ Add New Movies
                  </Link>
                  <Link to="/movies" className="btn btn--ghost btn--sm btn--full">
                    📝 Manage Movies
                  </Link>
                  <a 
                    className="btn btn--ghost btn--sm btn--full"
                  >
                    👥 View All Users
                  </a>
                </div>
                
                <div className={styles.adminFeatures}>
                  <h3 className={styles.featuresTitle}>Admin Capabilities</h3>
                  <ul className={styles.featuresList}>
                    <li>✅ Add movies from OMDb database</li>
                    <li>✅ Edit and delete any movie</li>
                    <li>✅ Manage user reviews and ratings</li>
                    <li>✅ View detailed booking analytics</li>
                  </ul>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}

export default Dashboard