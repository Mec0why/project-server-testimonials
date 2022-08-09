const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './img/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

const Concert = require('../models/concert.model');

router.get('/concerts', async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/concerts/:id', async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/concerts', upload.single('image'), async (req, res) => {
  try {
    const { performer, genre, price, day } = req.body;
    const image = req.file.path;

    const newConcert = new Concert({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    });
    await newConcert.save();
    res.json(newConcert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/concerts/:id', upload.single('image'), async (req, res) => {
  try {
    const { performer, genre, price, day } = req.body;
    const image = req.file.path;

    const con = await Concert.findById(req.params.id);
    if (con) {
      await Concert.updateOne(
        { _id: req.params.id },
        {
          $set: {
            performer: performer,
            genre: genre,
            price: price,
            day: day,
            image: image,
          },
        }
      );
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/concerts/:id', async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if (con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
