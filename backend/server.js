require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (for demo purposes)
let users = [];
let customers = [];
let interactions = [];

// Helper functions
const generateId = () => Math.random().toString(36).substr(2, 9);

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: generateId(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };
    
    users.push(user);
    
    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    
    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    
    res.json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Customer routes (no auth required)
app.get('/api/customers', (req, res) => {
  res.json({
    customers: customers,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalCustomers: customers.length,
      hasNext: false,
      hasPrev: false
    }
  });
});

app.get('/api/customers/stats', (req, res) => {
  const companies = [...new Set(customers.map(c => c.company))];
  const recentCustomers = customers
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  
  res.json({
    totalCustomers: customers.length,
    uniqueCompanies: companies.length,
    recentCustomers
  });
});

app.post('/api/customers', (req, res) => {
  const { name, email, phone, company, notes } = req.body;
  const customer = {
    _id: generateId(),
    name,
    email,
    phone,
    company,
    notes,
    user: 'demo',
    createdAt: new Date()
  };
  
  customers.push(customer);
  res.json(customer);
});

// Demo data route (no auth required)
app.post('/api/demo/seed', (req, res) => {
  // Clear existing data
  customers = [];
  interactions = [];
  
  // Demo customers
  const demoCustomers = [
    { name: 'John Smith', email: 'john.smith@techcorp.com', phone: '+1-555-0123', company: 'TechCorp Solutions', notes: 'Lead developer interested in our enterprise solutions.' },
    { name: 'Sarah Johnson', email: 'sarah.j@innovateinc.com', phone: '+1-555-0456', company: 'Innovate Inc', notes: 'Marketing director. Looking for CRM integration.' },
    { name: 'Michael Chen', email: 'mchen@startupxyz.com', phone: '+1-555-0789', company: 'StartupXYZ', notes: 'CEO of a growing startup. Needs scalable solution.' },
    { name: 'Emily Davis', email: 'emily.davis@globaltech.com', phone: '+1-555-0321', company: 'GlobalTech Industries', notes: 'VP of Sales. Interested in advanced analytics.' },
    { name: 'David Wilson', email: 'dwilson@consultingpro.com', phone: '+1-555-0654', company: 'ConsultingPro', notes: 'Senior consultant. Needs white-label solution.' },
    { name: 'Lisa Anderson', email: 'lisa.anderson@retailplus.com', phone: '+1-555-0987', company: 'RetailPlus', notes: 'Operations Manager. Looking for inventory integration.' },
    { name: 'Robert Taylor', email: 'rtaylor@financesolutions.com', phone: '+1-555-0124', company: 'Finance Solutions', notes: 'CFO. Requires compliance and security features.' },
    { name: 'Jennifer Brown', email: 'jbrown@healthcareplus.com', phone: '+1-555-0457', company: 'Healthcare Plus', notes: 'IT Director. Needs HIPAA compliance.' },
    { name: 'Alex Rodriguez', email: 'alex.r@digitalmarketing.com', phone: '+1-555-0789', company: 'Digital Marketing Pro', notes: 'Marketing Manager. Looking for lead tracking.' },
    { name: 'Maria Garcia', email: 'maria.g@realestate.com', phone: '+1-555-0321', company: 'Real Estate Partners', notes: 'Property Manager. Needs client relationship tracking.' },
    { name: 'James Wilson', email: 'james.w@manufacturing.com', phone: '+1-555-0654', company: 'Manufacturing Co', notes: 'Operations Director. Looking for supply chain integration.' },
    { name: 'Amanda Lee', email: 'amanda.lee@education.com', phone: '+1-555-0987', company: 'Education First', notes: 'School Administrator. Needs student communication tools.' },
    { name: 'Chris Thompson', email: 'chris.t@logistics.com', phone: '+1-555-0123', company: 'Logistics Express', notes: 'Fleet Manager. Looking for delivery tracking.' },
    { name: 'Rachel Green', email: 'rachel.g@restaurant.com', phone: '+1-555-0456', company: 'Restaurant Chain', notes: 'Operations Manager. Needs reservation system.' },
    { name: 'Kevin Martinez', email: 'kevin.m@construction.com', phone: '+1-555-0789', company: 'Construction Corp', notes: 'Project Manager. Looking for project tracking.' },
    { name: 'Sophie Turner', email: 'sophie.t@fashion.com', phone: '+1-555-0321', company: 'Fashion Forward', notes: 'Brand Manager. Needs customer loyalty program.' },
    { name: 'Daniel Kim', email: 'daniel.k@automotive.com', phone: '+1-555-0654', company: 'Automotive Solutions', notes: 'Dealership Manager. Looking for customer service tracking.' },
    { name: 'Emma White', email: 'emma.w@legal.com', phone: '+1-555-0987', company: 'Legal Associates', notes: 'Law Firm Partner. Needs case management.' },
    { name: 'Ryan Johnson', email: 'ryan.j@insurance.com', phone: '+1-555-0123', company: 'Insurance Group', notes: 'Claims Manager. Looking for policy management.' },
    { name: 'Nina Patel', email: 'nina.p@pharmaceutical.com', phone: '+1-555-0456', company: 'Pharmaceutical Inc', notes: 'Sales Director. Needs compliance tracking.' }
  ];
  
  // Add user ID to each customer
  const savedCustomers = demoCustomers.map(customer => ({
    ...customer,
    _id: generateId(),
    user: 'demo',
    createdAt: new Date()
  }));
  
  customers.push(...savedCustomers);
  
  // Add demo interactions
  const demoInteractions = savedCustomers.map(customer => ({
    _id: generateId(),
    customer: customer._id,
    type: ['call', 'email', 'meeting'][Math.floor(Math.random() * 3)],
    note: `Initial contact with ${customer.name} from ${customer.company}.`,
    date: new Date(),
    user: 'demo'
  }));
  
  interactions.push(...demoInteractions);
  
  res.json({ 
    msg: 'Demo data seeded successfully',
    customers: savedCustomers.length,
    interactions: demoInteractions.length
  });
});

// Interaction routes (no auth required)
app.get('/api/interactions/customer/:customerId', (req, res) => {
  const customerInteractions = interactions.filter(i => i.customer === req.params.customerId);
  res.json(customerInteractions);
});

app.post('/api/interactions', (req, res) => {
  const { customer, type, note, date } = req.body;
  const interaction = {
    _id: generateId(),
    customer,
    type,
    note,
    date: date || new Date(),
    user: 'demo'
  };
  
  interactions.push(interaction);
  res.json(interaction);
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend should be available at http://localhost:3001`);
  console.log(`🔧 API available at http://localhost:${PORT}/api`);
  console.log(`✅ No login required - CRM ready to use!`);
}); 