const express = require('express');
const path = require('path');
const cors = require('cors');
const shortid = require('shortid');
const { parse } = require('path');

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 2,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
  { id: 3, author: 'Dustin Henderson', text: 'Never ending storyyy...' },
  { id: 4, author: 'Lucas Sinclair', text: 'Kate Bush will help You' },
  { id: 5, author: 'Mike Willer', text: 'I count to eleven' },
  { id: 6, author: 'Will Byers', text: 'Lost in time and upside down' },
  {
    id: 7,
    author: 'Jim Hopper',
    text: 'Mornings are for coffee and contemplation',
  },
];

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
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  let random = db[Math.floor(Math.random() * db.length)];

  res.json(random);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db[req.params.id - 1]);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  const testimonial = {
    id: shortid.generate(),
    author: author,
    text: text,
  };

  db.push(testimonial);

  res.json(db);
});

app.put('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { author, text } = req.body;

  db.map((testimonial, i) =>
    testimonial.id === id
      ? (db[i] = { ...testimonial, author: author, text: text })
      : testimonial
  );

  res.json(db);
});

app.use((req, res) => {
  res.status(404).send('404 You shall not pass!');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
