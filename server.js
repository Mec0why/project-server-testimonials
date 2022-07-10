// initialize server
const express = require('express');
const app = express();

// import additional packages
const path = require('path');
const cors = require('cors');

// import endpoints
const testimonialsRoutes = require('./routes/testimonials.routes'); // import testimonials routes
const concertsRoutes = require('./routes/concerts.routes'); // import concerts routes
const seatsRoutes = require('./routes/seats.routes'); // import seats routes

// use additional packages
app.use(
  cors({
    origin: 'https://kodilla.com', //origin sets domains that we approve
    methods: 'GET, POST', //we allow only GET and POST methods
  })
);
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use endpoints
app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes); // add concerts routes to server
app.use('/api', seatsRoutes); // add seats routes to server

app.use((req, res) => {
  res.status(404).send('404 You shall not pass!');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
