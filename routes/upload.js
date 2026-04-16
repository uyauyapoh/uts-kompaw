const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const upload = require('../middleware/upload');
const db = require('../db');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Upload file
router.post('/', upload.single('file'), (req, res) => {
  const file = req.file;

    const params = {
    Bucket: process.env.S3_BUCKET,
    Key: Date.now() + '-' + file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype
    };

  s3.upload(params, (err, data) => {
    if (err) return res.status(500).send(err);

    db.query(
      'INSERT INTO documents (booking_id, file_url) VALUES (?, ?)',
      [req.body.booking_id, data.Location],
      (err2) => {
        if (err2) return res.status(500).send(err2);

        res.send({
          message: 'Upload berhasil',
          url: data.Location
        });
      }
    );
  });
});

module.exports = router;