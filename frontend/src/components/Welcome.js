import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to Your
              <span className="gradient-text"> CRM System</span>
            </h1>
            <p className="hero-subtitle">
              Streamline your customer relationships with our powerful, intuitive, and feature-rich CRM platform. 
              Manage contacts, track interactions, and grow your business efficiently.
            </p>
            <div className="hero-buttons">
              <Link to="/app/dashboard" className="cta-button primary">
                <i className="fas fa-rocket"></i>
                Get Started
              </Link>
              <Link to="/app/customers" className="cta-button secondary">
                <i className="fas fa-users"></i>
                View Customers
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <i className="fas fa-user-tie"></i>
              <span>Customer Management</span>
            </div>
            <div className="floating-card card-2">
              <i className="fas fa-chart-line"></i>
              <span>Analytics</span>
            </div>
            <div className="floating-card card-3">
              <i className="fas fa-phone"></i>
              <span>Interactions</span>
            </div>
            <div className="main-illustration">
              <div className="crm-illustration">
                <div className="dashboard-mockup">
                  <div className="mockup-header">
                    <div className="mockup-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="mockup-content">
                    <div className="mockup-sidebar">
                      <div className="sidebar-item active">
                        <i className="fas fa-tachometer-alt"></i>
                      </div>
                      <div className="sidebar-item">
                        <i className="fas fa-users"></i>
                      </div>
                      <div className="sidebar-item">
                        <i className="fas fa-chart-bar"></i>
                      </div>
                    </div>
                    <div className="mockup-main">
                      <div className="mockup-card">
                        <div className="card-header">
                          <div className="avatar">JD</div>
                          <div className="info">
                            <div className="name">John Doe</div>
                            <div className="company">TechCorp Solutions</div>
                          </div>
                        </div>
                      </div>
                      <div className="mockup-card">
                        <div className="card-header">
                          <div className="avatar">SJ</div>
                          <div className="info">
                            <div className="name">Sarah Johnson</div>
                            <div className="company">Innovate Inc</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="section-header">
          <h2>Why Choose Our CRM?</h2>
          <p>Discover the powerful features that will transform your customer management</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Customer Management</h3>
            <p>Organize and manage all your customer information in one place. Track contact details, company information, and interaction history.</p>
            <ul>
              <li>Complete customer profiles</li>
              <li>Company information tracking</li>
              <li>Contact history</li>
              <li>Notes and comments</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3>Interaction Tracking</h3>
            <p>Keep track of all customer interactions including calls, emails, meetings, and follow-ups. Never miss an important touchpoint.</p>
            <ul>
              <li>Call and email logging</li>
              <li>Meeting scheduling</li>
              <li>Follow-up reminders</li>
              <li>Interaction history</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Analytics & Insights</h3>
            <p>Get valuable insights into your customer relationships with comprehensive analytics and reporting tools.</p>
            <ul>
              <li>Customer statistics</li>
              <li>Interaction analytics</li>
              <li>Performance metrics</li>
              <li>Trend analysis</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-search"></i>
            </div>
            <h3>Smart Search & Filter</h3>
            <p>Find customers quickly with advanced search and filtering capabilities. Sort by company, date, or any criteria.</p>
            <ul>
              <li>Advanced search</li>
              <li>Company filtering</li>
              <li>Date range selection</li>
              <li>Quick sorting</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3>Responsive Design</h3>
            <p>Access your CRM from anywhere with our fully responsive design that works perfectly on desktop, tablet, and mobile.</p>
            <ul>
              <li>Mobile-friendly interface</li>
              <li>Touch-optimized controls</li>
              <li>Cross-device sync</li>
              <li>Offline capabilities</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Secure & Reliable</h3>
            <p>Your data is safe with our secure platform. We use industry-standard security measures to protect your information.</p>
            <ul>
              <li>Data encryption</li>
              <li>Secure authentication</li>
              <li>Regular backups</li>
              <li>Privacy protection</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Happy Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Customers Managed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Interactions Tracked</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Customer Management?</h2>
          <p>Join thousands of businesses that trust our CRM to manage their customer relationships effectively.</p>
          <div className="cta-buttons">
            <Link to="/app/dashboard" className="cta-button primary large">
              <i className="fas fa-play"></i>
              Start Using CRM
            </Link>
            <Link to="/app/customers" className="cta-button secondary large">
              <i className="fas fa-eye"></i>
              View Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="welcome-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/app/dashboard">Dashboard</Link>
            <Link to="/app/customers">Customers</Link>
            <Link to="/app/customers/add">Add Customer</Link>
          </div>
          <div className="footer-section">
            <h4>Features</h4>
            <span>Customer Management</span>
            <span>Interaction Tracking</span>
            <span>Analytics</span>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <span>Documentation</span>
            <span>Help Center</span>
            <span>Contact Us</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 CRM System. Built with ❤️ for better customer relationships.</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 