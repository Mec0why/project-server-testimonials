const db = require('./db.js');
const express = require('express');
const path = require('path');
const cors = require('cors');
const shortid = require('shortid');
const multer = require('multer');
const upload = multer({ dest: 'img/uploads/' });

const app = express();

app.use(
  cors({
    origin: 'https://kodilla.com', //origin sets domains that we approve
    methods: 'GET, POST', //we allow only GET and POST methods
  })
);

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: true }));

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  let random =
    db.testimonials[Math.floor(Math.random() * db.testimonials.length)];

  res.json(random);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials[req.params.id - 1]);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  const testimonial = {
    id: shortid.generate(),
    author: author,
    text: text,
  };

  db.testimonials.push(testimonial);

  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { author, text } = req.body;

  db.testimonials.map((testimonial, i) =>
    testimonial.id === id
      ? (db.testimonials[i] = { ...testimonial, author: author, text: text })
      : testimonial
  );

  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const filteredDb = db.testimonials.filter((testimonial) =>
    testimonial.id === id ? false : true
  );

  console.log(filteredDb);
  res.json({ message: 'OK' });
});

app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
  res.json(db.concerts[req.params.id - 1]);
});

app.post('/concerts', upload.single('concertImage'), (req, res) => {
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

app.put('/concerts/:id', upload.single('concertImage'), (req, res) => {
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

app.delete('/concerts/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const filteredDb = db.concerts.filter((concert) =>
    concert.id === id ? false : true
  );

  console.log(filteredDb);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).send('404 You shall not pass!');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
