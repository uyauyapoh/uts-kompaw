const express = require('express');
const router = express.Router();
const db = require('../db');

// POST booking
router.post('/', (req, res) => {
  const { name, date } = req.body;

  // validasi sederhana
  if (!name || !date) {
    return res.status(400).json({ message: 'Nama dan tanggal wajib diisi' });
  }

  // nomor antrian random (simple)
  const nomorAntrian = Math.floor(Math.random() * 1000);

  const query = `
    INSERT INTO bookings 
    (user_id, poli, tanggal, jam, nomor_antrian, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,          // sementara kita pakai name sebagai user_id
    'umum',        // default poli
    date,
    '08:00',       // default jam
    nomorAntrian,
    'menunggu'
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({
      message: 'Booking berhasil',
      nomor_antrian: nomorAntrian
    });
  });
});

module.exports = router;