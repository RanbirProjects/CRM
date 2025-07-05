import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { customersAPI, demoAPI } from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    uniqueCompanies: 0,
    recentCustomers: []
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await customersAPI.getStats();
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const loadDemoData = async () => {
    try {
      await demoAPI.seed();
      fetchStats();
    } catch (error) {
      console.error('Error loading demo data:', error);
    }
  };

  const openModal = (type, data) => {
    setModalData({ type, data });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome to Your CRM Dashboard</h1>
          <p>Manage your customer relationships and track your business growth</p>
        </div>
        <div className="header-actions">
          <button onClick={loadDemoData} className="demo-btn">
            <i className="fas fa-database"></i>
            Load Demo Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div 
          className="stat-card customers-card"
          onClick={() => openModal('customers', stats)}
        >
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalCustomers}</div>
            <div className="stat-label">Total Customers</div>
          </div>
          <div className="stat-trend">
            <i className="fas fa-arrow-up"></i>
            <span>+12%</span>
          </div>
        </div>

        <div 
          className="stat-card companies-card"
          onClick={() => openModal('companies', stats)}
        >
          <div className="stat-icon">
            <i className="fas fa-building"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.uniqueCompanies}</div>
            <div className="stat-label">Companies</div>
          </div>
          <div className="stat-trend">
            <i className="fas fa-arrow-up"></i>
            <span>+8%</span>
          </div>
        </div>

        <div 
          className="stat-card interactions-card"
          onClick={() => openModal('interactions', stats)}
        >
          <div className="stat-icon">
            <i className="fas fa-phone"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{stats.recentCustomers.length * 3}</div>
            <div className="stat-label">Interactions</div>
          </div>
          <div className="stat-trend">
            <i className="fas fa-arrow-up"></i>
            <span>+15%</span>
          </div>
        </div>

        <div 
          className="stat-card growth-card"
          onClick={() => openModal('growth', stats)}
        >
          <div className="stat-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">24%</div>
            <div className="stat-label">Growth Rate</div>
          </div>
          <div className="stat-trend">
            <i className="fas fa-arrow-up"></i>
            <span>+5%</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/app/customers/add" className="action-card add-customer">
            <div className="action-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h3>Add Customer</h3>
            <p>Create a new customer profile</p>
          </Link>

          <Link to="/app/customers" className="action-card view-customers">
            <div className="action-icon">
              <i className="fas fa-list"></i>
            </div>
            <h3>View All Customers</h3>
            <p>Browse and manage customers</p>
          </Link>

          <div className="action-card analytics">
            <div className="action-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <h3>Analytics</h3>
            <p>View detailed reports</p>
          </div>

          <div className="action-card settings">
            <div className="action-icon">
              <i className="fas fa-cog"></i>
            </div>
            <h3>Settings</h3>
            <p>Configure your CRM</p>
          </div>
        </div>
      </div>

      {/* Recent Customers */}
      <div className="recent-customers">
        <div className="section-header">
          <h2>Recent Customers</h2>
          <Link to="/app/customers" className="view-all-link">
            View All <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        
        <div className="customers-grid">
          {stats.recentCustomers.slice(0, 6).map(customer => (
            <div key={customer._id} className="customer-card">
              <div className="customer-avatar">
                {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div className="customer-info">
                <h4>{customer.name}</h4>
                <p className="company">{customer.company}</p>
                <p className="email">{customer.email}</p>
              </div>
              <Link to={`/app/customers/${customer._id}`} className="view-btn">
                <i className="fas fa-eye"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="activity-feed">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="activity-content">
              <p><strong>New customer added:</strong> John Smith from TechCorp Solutions</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-phone"></i>
            </div>
            <div className="activity-content">
              <p><strong>Call logged:</strong> Follow-up with Sarah Johnson</p>
              <span className="activity-time">4 hours ago</span>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="activity-content">
              <p><strong>Email sent:</strong> Proposal to Michael Chen</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon">
              <i className="fas fa-meeting"></i>
            </div>
            <div className="activity-content">
              <p><strong>Meeting scheduled:</strong> Demo with Emily Davis</p>
              <span className="activity-time">2 days ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalData.type.charAt(0).toUpperCase() + modalData.type.slice(1)} Details</h3>
              <button onClick={closeModal} className="close-btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              {modalData.type === 'customers' && (
                <div>
                  <p>Total customers in your CRM: <strong>{modalData.data.totalCustomers}</strong></p>
                  <p>Recent additions: <strong>{modalData.data.recentCustomers.length}</strong></p>
                </div>
              )}
              {modalData.type === 'companies' && (
                <div>
                  <p>Unique companies: <strong>{modalData.data.uniqueCompanies}</strong></p>
                  <p>Diverse client base across multiple industries</p>
                </div>
              )}
              {modalData.type === 'interactions' && (
                <div>
                  <p>Total interactions tracked: <strong>{modalData.data.recentCustomers.length * 3}</strong></p>
                  <p>Includes calls, emails, and meetings</p>
                </div>
              )}
              {modalData.type === 'growth' && (
                <div>
                  <p>Current growth rate: <strong>24%</strong></p>
                  <p>Customer base expanding steadily</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 