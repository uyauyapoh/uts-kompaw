const express = require('express');
const router = express.Router();
const db = require('../db');

// Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, "user")',
    [name, email, password],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'User registered' });
    }
  );
});

module.exports = router;