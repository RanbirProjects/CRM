const express = require('express');
const Interaction = require('../models/Interaction');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all interactions for a customer (for the logged-in user)
router.get('/customer/:customerId', auth, async (req, res) => {
  const interactions = await Interaction.find({ customer: req.params.customerId, user: req.user });
  res.json(interactions);
});

// Create an interaction
router.post('/', auth, async (req, res) => {
  const { customer, type, note, date } = req.body;
  const interaction = new Interaction({ customer, type, note, date, user: req.user });
  await interaction.save();
  res.json(interaction);
});

// Update an interaction
router.put('/:id', auth, async (req, res) => {
  const interaction = await Interaction.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    req.body,
    { new: true }
  );
  if (!interaction) return res.status(404).json({ msg: 'Interaction not found' });
  res.json(interaction);
});

// Delete an interaction
router.delete('/:id', auth, async (req, res) => {
  const interaction = await Interaction.findOneAndDelete({ _id: req.params.id, user: req.user });
  if (!interaction) return res.status(404).json({ msg: 'Interaction not found' });
  res.json({ msg: 'Interaction deleted' });
});

module.exports = router; 