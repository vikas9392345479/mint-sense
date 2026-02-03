const express = require('express');
const router = express.Router();
const User = require('../models/User');

// This is the route to register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists in your MongoDB
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user instance
    user = new User({
      name,
      email,
      password
    });

    // Save the user to MongoDB
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const jwt = require('jsonwebtoken');

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // 2. Check if password matches
    // (Note: Later we will add hashing, but for now we check the string)
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // 3. Create and send a JWT Token
    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;