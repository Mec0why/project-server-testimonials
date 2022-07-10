const express = require('express');
const router = express.Router();
const db = require('./../db');
const shortid = require('shortid');
const multer = require('multer');
const upload = multer({ dest: 'img/uploads/' });

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts[req.params.id - 1]);
});

router.route('/concerts').post(upload.single('concertImage'), (req, res) => {
  const { performer, genre, price, day } = req.body;
  const image = req.file;

  const concert = {
    id: shortid.generate(),
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image,
  };

  db.concerts.push(concert);

  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put(upload.single('concertImage'), (req, res) => {
  const id = parseInt(req.params.id);
  const { performer, genre, price, day } = req.body;
  const image = req.file;

  db.concerts.map((concert, i) =>
    concert.id === id
      ? (db.concerts[i] = {
          ...concert,
          performer: performer,
          genre: genre,
          price: price,
          day: day,
          image: image,
        })
      : concert
  );

  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const id = parseInt(req.params.id);

  const filteredDb = db.concerts.filter((concert) =>
    concert.id === id ? false : true
  );

  console.log(filteredDb);
  res.json({ message: 'OK' });
});

module.exports = router;
