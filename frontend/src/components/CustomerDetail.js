import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CustomerDetail() {
  const [customer, setCustomer] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchCustomerData();
  }, [id]);

  const fetchCustomerData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      
      const [customerRes, interactionsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/customers/${id}`, config),
        axios.get(`http://localhost:5000/api/interactions/customer/${id}`, config)
      ]);
      
      setCustomer(customerRes.data);
      setInteractions(interactionsRes.data);
    } catch (err) {
      setError('Failed to fetch customer data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!customer) return <div>Customer not found</div>;

  return (
    <div className="customer-detail">
      <div className="header">
        <h2>{customer.name}</h2>
        <div className="actions">
          <Link to={`/customers/${id}/edit`} className="btn btn-warning">
            Edit Customer
          </Link>
          <Link to="/customers" className="btn btn-secondary">
            Back to List
          </Link>
        </div>
      </div>

      <div className="customer-info">
        <div className="info-grid">
          <div className="info-item">
            <label>Email:</label>
            <span>{customer.email || 'N/A'}</span>
          </div>
          <div className="info-item">
            <label>Phone:</label>
            <span>{customer.phone || 'N/A'}</span>
          </div>
          <div className="info-item">
            <label>Company:</label>
            <span>{customer.company || 'N/A'}</span>
          </div>
          <div className="info-item">
            <label>Created:</label>
            <span>{new Date(customer.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        {customer.notes && (
          <div className="notes">
            <label>Notes:</label>
            <p>{customer.notes}</p>
          </div>
        )}
      </div>

      <div className="interactions-section">
        <h3>Interactions ({interactions.length})</h3>
        <Link to={`/customers/${id}/interactions/add`} className="btn btn-primary">
          Add Interaction
        </Link>
        
        {interactions.length === 0 ? (
          <p>No interactions recorded yet.</p>
        ) : (
          <div className="interactions-list">
            {interactions.map(interaction => (
              <div key={interaction._id} className="interaction-item">
                <div className="interaction-header">
                  <span className={`type ${interaction.type}`}>
                    {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                  </span>
                  <span className="date">
                    {new Date(interaction.date).toLocaleDateString()}
                  </span>
                </div>
                {interaction.note && <p className="note">{interaction.note}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerDetail; 