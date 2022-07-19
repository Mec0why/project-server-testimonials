// initialize server
const express = require('express');
const app = express();
const io = require('socket.io'),

// import additional packages
const path = require('path');
const cors = require('cors');

// import endpoints
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

// use additional packages
app.use(
  cors(
    {
      origin: 'https://kodilla.com', //origin sets domains that we approve
      methods: 'GET, POST', //we allow only GET and POST methods
    },
    {
      origin: 'http://localhost:3000/',
    }
  )
);
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// use endpoints
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 You shall not pass!');
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const socket = io(server);

socket.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  

  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left');
  });
});