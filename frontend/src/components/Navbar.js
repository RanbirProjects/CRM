import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/app/dashboard" className="navbar-brand">
          <i className="fas fa-cube"></i>
          CRM System
        </Link>
        
        <div className="navbar-menu">
          <Link 
            to="/app/dashboard" 
            className={`navbar-link ${location.pathname === '/app/dashboard' ? 'active' : ''}`}
          >
            <i className="fas fa-tachometer-alt"></i>
            Dashboard
          </Link>
          <Link 
            to="/app/customers" 
            className={`navbar-link ${location.pathname.startsWith('/app/customers') ? 'active' : ''}`}
          >
            <i className="fas fa-users"></i>
            Customers
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 