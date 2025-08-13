import { useState, useEffect } from 'react'
import * as userService from '../../services/userService'

const Dashboard = ({ user }) => {
  const [ticketInfo, setTicketInfo] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tickets = await userService.getTickets()
        const userProfile = await userService.getProfile()
        setTicketInfo(tickets)
        setProfile(userProfile)
      } catch (err) {
        console.error('Failed to fetch user data:', err)
      }
    }
    
    fetchUserData()
  }, [])

  return (
    <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

      
      <section style={{ margin: '20px 0', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Profile Information</h2>
        {profile ? (
          <div> 
            <p><strong>Username:</strong> {user.username}</p>
            
            <p><strong>Member Since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
            <p> {profile.isAdmin ? <strong>This user is an Admin</strong> : ''}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </section>

      <section style={{ margin: '20px 0', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>My Tickets</h2>
        {ticketInfo ? (
          <div>
            <p><strong>Total Tickets:</strong> {ticketInfo.ticketCount}</p>
            <p>{ticketInfo.message}</p>
          </div>
        ) : (
          <p>Loading ticket information...</p>
        )}
      </section>

      {user.isAdmin && (
        <section style={{ margin: '20px 0', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
          <h2>Admin Panel</h2>
          <p>As an admin, you can:</p>
          <ul>
            <li><a href='/users'>View all users</a></li>
            <li>Add new movies</li>
            <li>Edit existing movies</li>
            <li>Delete movies</li>
            <li>View detailed seat bookings</li>
          </ul>
        </section>
      )}
    </main>
  );
};

export default Dashboard;