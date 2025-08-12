import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Tickets</h3>
            <p>Your trusted platform for tickets and bookings.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="/help">Help</a></li>
              <li><a href="/madry">madry</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p> 2025 Tickets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
