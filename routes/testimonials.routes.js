const express = require('express');
const router = express.Router();
const db = require('./../db');
const shortid = require('shortid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  let random =
    db.testimonials[Math.floor(Math.random() * db.testimonials.length)];

  res.json(random);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials[req.params.id - 1]);
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  const testimonial = {
    id: shortid.generate(),
    author: author,
    text: text,
  };

  db.testimonials.push(testimonial);

  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const id = parseInt(req.params.id);
  const { author, text } = req.body;

  db.testimonials.map((testimonial, i) =>
    testimonial.id === id
      ? (db.testimonials[i] = { ...testimonial, author: author, text: text })
      : testimonial
  );

  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const id = parseInt(req.params.id);

  const filteredDb = db.testimonials.filter((testimonial) =>
    testimonial.id === id ? false : true
  );

  console.log(filteredDb);
  res.json({ message: 'OK' });
});

module.exports = router;
