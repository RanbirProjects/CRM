const express = require('express');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all customers for the logged-in user with search, filter, and pagination
router.get('/', auth, async (req, res) => {
  try {
    const { search, company, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 10 } = req.query;
    
    // Build query
    let query = { user: req.user };
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Company filter
    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const customers = await Customer.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Customer.countDocuments(query);
    
    res.json({
      customers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalCustomers: total,
        hasNext: skip + customers.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get customer statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments({ user: req.user });
    const companies = await Customer.distinct('company', { user: req.user });
    const recentCustomers = await Customer.find({ user: req.user })
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      totalCustomers,
      uniqueCompanies: companies.length,
      recentCustomers
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get a single customer
router.get('/:id', auth, async (req, res) => {
  const customer = await Customer.findOne({ _id: req.params.id, user: req.user });
  if (!customer) return res.status(404).json({ msg: 'Customer not found' });
  res.json(customer);
});

// Create a customer
router.post('/', auth, async (req, res) => {
  const { name, email, phone, company, notes } = req.body;
  const customer = new Customer({ name, email, phone, company, notes, user: req.user });
  await customer.save();
  res.json(customer);
});

// Update a customer
router.put('/:id', auth, async (req, res) => {
  const customer = await Customer.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    req.body,
    { new: true }
  );
  if (!customer) return res.status(404).json({ msg: 'Customer not found' });
  res.json(customer);
});

// Delete a customer
router.delete('/:id', auth, async (req, res) => {
  const customer = await Customer.findOneAndDelete({ _id: req.params.id, user: req.user });
  if (!customer) return res.status(404).json({ msg: 'Customer not found' });
  res.json({ msg: 'Customer deleted' });
});

module.exports = router; 