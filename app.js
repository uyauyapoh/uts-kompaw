require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 WAJIB (INI KUNCI UI)
app.use(express.static(path.join(__dirname, 'public')));

// Routes API
app.use('/booking', require('./routes/booking'));
app.use('/upload', require('./routes/upload'));
app.use('/user', require('./routes/user'));

// ❌ HAPUS INI (biar index.html tampil)
// app.get('/', (req, res) => {
//   res.send('Sehat Antri API Running');
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port', PORT);
});