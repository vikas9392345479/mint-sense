const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Expense = require('../models/Expense');

// @route   POST api/expenses
// @desc    Add expense with automatic splitting (Requirement #4)
router.post('/', auth, async (req, res) => {
  try {
    const { groupId, description, amount, payerName, participants, splitMode } = req.body;

    // --- The Split Engine ---
    let splits = [];
    const totalParticipants = participants.length; // Includes everyone involved

    if (splitMode === 'equal') {
      const sharePerPerson = amount / totalParticipants;
      splits = participants.map(p => ({
        participantName: p,
        share: Number(sharePerPerson.toFixed(2)) // Rounding for uneven splits (Req #4)
      }));
    }

    const newExpense = new Expense({
      group: groupId,
      description,
      amount,
      payer: payerName,
      splitMode,
      splits
    });

    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


  