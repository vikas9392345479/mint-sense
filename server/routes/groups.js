const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Group = require('../models/Group');

// @route   POST api/groups
// @desc    Create a group (Max 3 participants + owner)
router.post('/', auth, async (req, res) => {
  try {
    const { name, participants } = req.body; // participants is an array of names

    if (participants.length > 3) {
      return res.status(400).json({ message: "Max 3 additional participants allowed" });
    }

    const newGroup = new Group({
      name,
      owner: req.user.id,
      participants: participants.map(p => ({ name: p }))
    });

    const group = await newGroup.save();
    res.json(group);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/groups
// @desc    Get all groups for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find({ owner: req.user.id });
    res.json(groups);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;