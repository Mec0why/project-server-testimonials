const db = require('./db.js');
const express = require('express');

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');

const path = require('path');
const cors = require('cors');
const shortid = require('shortid');

app.use(
  cors({
    origin: 'https://kodilla.com', //origin sets domains that we approve
    methods: 'GET, POST', //we allow only GET and POST methods
  })
);

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes); // add concerts routes to server

app.get('/seats', (req, res) => {
  res.json(db.seats);
});

app.get('/seats/:id', (req, res) => {
  res.json(db.seats[req.params.id - 1]);
});

app.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;

  const seatObj = {
    id: shortid.generate(),
    day: day,
    seat: seat,
    client: client,
    email: email,
  };

  db.seats.push(seatObj);

  res.json({ message: 'OK' });
});

app.put('/seats/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { day, seat, client, email } = req.body;

  db.seats.map((seatObj, i) =>
    seatObj.id === id
      ? (db.seats[i] = {
          ...seatObj,
          day: day,
          seat: seat,
          client: client,
          email: email,
        })
      : seatObj
  );

  res.json({ message: 'OK' });
});

app.delete('/seats/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const filteredDb = db.seats.filter((seatObj) =>
    seatObj.id === id ? false : true
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
