const express = require('express');
const router = express.Router();
const db = require('../db');

// Create booking
router.post('/', (req, res) => {
  const { user_id, poli, tanggal, jam } = req.body;

  const nomor = Math.floor(Math.random() * 1000);

  db.query(
    'INSERT INTO bookings (user_id, poli, tanggal, jam, nomor_antrian, status) VALUES (?, ?, ?, ?, ?, "menunggu")',
    [user_id, poli, tanggal, jam, nomor],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({
        message: 'Booking berhasil',
        nomor_antrian: nomor
      });
    }
  );
});

// Get booking
router.get('/:id', (req, res) => {
  db.query(
    'SELECT * FROM bookings WHERE id=?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    }
  );
});

module.exports = router;