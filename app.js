require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/booking', require('./routes/booking'));
app.use('/upload', require('./routes/upload'));
app.use('/user', require('./routes/user'));

app.get('/', (req, res) => {
  res.send('Sehat Antri API Running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});

const path = require('path');

// serve frontend
app.use(express.static(path.join(__dirname, 'public')));