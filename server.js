// initialize server
const express = require('express');
const app = express();
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

// import additional packages
const path = require('path');
const cors = require('cors');

// Add middleware to add req.io reference in all endpoints
app.use((req, res, next) => {
  req.io = io;
  next();
});

// import endpoints
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

// use additional packages
app.use(
  cors({
    origin: ['http://localhost:8000', 'http://localhost:3000'],
  })
);
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());

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

const NODE_ENV = process.env.NODE_ENV;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
let dbUri = '';

if (NODE_ENV === 'production')
  dbUri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@newwavefestival.esofyuj.mongodb.net/NewWaveDB`;
else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDBtest';
else
  dbUri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@newwavefestival.esofyuj.mongodb.net/NewWaveDB`;
// connects our backend code with the database based on Node environment
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  if (NODE_ENV !== 'test') {
    console.log('Connected to the database');
  }
});
db.on('error', (err) => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  if (NODE_ENV !== 'test') {
    console.log('Server is running on port: 8000');
  }
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.emit('connection');

  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left');
  });
});

module.exports = server;
