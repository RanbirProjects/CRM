import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { customersAPI } from '../api';
import './CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await customersAPI.getAll();
      setCustomers(response.data.customers);
      
      // Extract unique companies for filter
      const uniqueCompanies = [...new Set(response.data.customers.map(c => c.company))].sort();
      setCompanies(uniqueCompanies);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setLoading(false);
    }
  };

  const getCustomerStatus = (customer) => {
    const daysSinceCreated = Math.floor((new Date() - new Date(customer.createdAt)) / (1000 * 60 * 60 * 24));
    if (daysSinceCreated <= 7) return { status: 'New', color: '#10B981', bg: '#D1FAE5' };
    if (daysSinceCreated <= 30) return { status: 'Active', color: '#3B82F6', bg: '#DBEAFE' };
    return { status: 'Established', color: '#6B7280', bg: '#F3F4F6' };
  };

  const getPriorityColor = (customer) => {
    const email = customer.email.toLowerCase();
    if (email.includes('ceo') || email.includes('director') || email.includes('vp')) return '#EF4444';
    if (email.includes('manager') || email.includes('lead')) return '#F59E0B';
    return '#10B981';
  };

  const filteredCustomers = customers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(customer => 
      filterCompany ? customer.company === filterCompany : true
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'company':
          return a.company.localeCompare(b.company);
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'email':
          return a.email.localeCompare(b.email);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="customer-list-container">
      <div className="customer-list-header">
        <div className="header-left">
          <h1>Customer Management</h1>
          <p className="subtitle">Manage your customer relationships and track interactions</p>
        </div>
        <div className="header-right">
          <Link to="/app/customers/add" className="add-customer-btn">
            <i className="fas fa-plus"></i>
            Add Customer
          </Link>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search customers by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Company:</label>
            <select value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)}>
              <option value="">All Companies</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="company">Company</option>
              <option value="date">Date Added</option>
              <option value="email">Email</option>
            </select>
          </div>

          <div className="view-toggle">
            <button 
              className={viewMode === 'cards' ? 'active' : ''} 
              onClick={() => setViewMode('cards')}
            >
              <i className="fas fa-th-large"></i>
            </button>
            <button 
              className={viewMode === 'table' ? 'active' : ''} 
              onClick={() => setViewMode('table')}
            >
              <i className="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{filteredCustomers.length}</span>
          <span className="stat-label">Total Customers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{companies.length}</span>
          <span className="stat-label">Companies</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {filteredCustomers.filter(c => getCustomerStatus(c).status === 'New').length}
          </span>
          <span className="stat-label">New This Week</span>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="customer-cards">
          {filteredCustomers.map(customer => {
            const status = getCustomerStatus(customer);
            const priorityColor = getPriorityColor(customer);
            
            return (
              <div key={customer._id} className="customer-card">
                <div className="card-header">
                  <div className="customer-avatar">
                    {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div className="customer-info">
                    <h3 className="customer-name">{customer.name}</h3>
                    <p className="customer-email">{customer.email}</p>
                    <div className="customer-company">
                      <i className="fas fa-building"></i>
                      {customer.company}
                    </div>
                  </div>
                  <div className="card-actions">
                    <span 
                      className="priority-indicator" 
                      style={{ backgroundColor: priorityColor }}
                      title="Priority Level"
                    ></span>
                    <span 
                      className="status-badge"
                      style={{ color: status.color, backgroundColor: status.bg }}
                    >
                      {status.status}
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <div className="contact-info">
                    <div className="contact-item">
                      <i className="fas fa-phone"></i>
                      <span>{customer.phone || 'No phone'}</span>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-calendar"></i>
                      <span>Added {new Date(customer.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {customer.notes && (
                    <div className="customer-notes">
                      <p>{customer.notes.length > 100 ? customer.notes.substring(0, 100) + '...' : customer.notes}</p>
                    </div>
                  )}

                  <div className="card-footer">
                    <Link to={`/app/customers/${customer._id}`} className="view-btn">
                      <i className="fas fa-eye"></i>
                      View Details
                    </Link>
                    <Link to={`/app/customers/${customer._id}/edit`} className="edit-btn">
                      <i className="fas fa-edit"></i>
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="customer-table-container">
          <table className="customer-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Company</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => {
                const status = getCustomerStatus(customer);
                const priorityColor = getPriorityColor(customer);
                
                return (
                  <tr key={customer._id}>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar-small">
                          {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                          <div className="customer-name">{customer.name}</div>
                          <div className="customer-email">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="company-cell">
                        <i className="fas fa-building"></i>
                        {customer.company}
                      </div>
                    </td>
                    <td>
                      <div className="contact-cell">
                        <div>{customer.phone || 'No phone'}</div>
                        <span 
                          className="priority-dot" 
                          style={{ backgroundColor: priorityColor }}
                          title="Priority Level"
                        ></span>
                      </div>
                    </td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ color: status.color, backgroundColor: status.bg }}
                      >
                        {status.status}
                      </span>
                    </td>
                    <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/app/customers/${customer._id}`} className="action-btn view">
                          <i className="fas fa-eye"></i>
                        </Link>
                        <Link to={`/app/customers/${customer._id}/edit`} className="action-btn edit">
                          <i className="fas fa-edit"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {filteredCustomers.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-users"></i>
          <h3>No customers found</h3>
          <p>Try adjusting your search or filters</p>
          <Link to="/app/customers/add" className="add-customer-btn">
            Add Your First Customer
          </Link>
        </div>
      )}
    </div>
  );
};

export default CustomerList; 