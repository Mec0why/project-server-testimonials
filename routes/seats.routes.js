const express = require('express');
const router = express.Router();
const db = require('./../db');
const shortid = require('shortid');

const Seat = require('../models/seat.model');

router.get('/seats', async (req, res) => {
  try {
    res.json(await Seat.find().populate('event'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// router.route('/seats').get((req, res) => {
//   res.json(db.seats);
// });

router.get('/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id).populate('event');
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// router.route('/seats/:id').get((req, res) => {
//   res.json(db.seats[req.params.id - 1]);
// });

// router.route('/seats').post((req, res) => {
//   const { day, seat, client, email } = req.body;

//   const seatCheck = db.seats.some(
//     (seatReq) => seatReq.day === day && seatReq.seat === seat
//   );

//   if (!seatCheck) {
//     const seatObj = {
//       id: shortid.generate(),
//       day: day,
//       seat: seat,
//       client: client,
//       email: email,
//     };
//     db.seats.push(seatObj);

//     req.io.emit('seatsUpdated', db.seats);

//     res.json({ message: 'OK' });
//   } else {
//     res.status(409).json({ message: 'Seat is already taken...' });
//   }
// });

// router.post('/seats', async (req, res) => {
//   try {
//     const { day, seat, client, email } = req.body;

//     const newSeat = new Seat({
//       day: day,
//       seat: seat,
//       client: client,
//       email: email,
//     });
//     await newSeat.save();
//     res.json({ message: 'OK' });
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

// router.route('/seats/:id').put((req, res) => {
//   const id = parseInt(req.params.id);
//   const { day, seat, client, email } = req.body;

//   db.seats.map((seatObj, i) =>
//     seatObj.id === id
//       ? (db.seats[i] = {
//           ...seatObj,
//           day: day,
//           seat: seat,
//           client: client,
//           email: email,
//         })
//       : seatObj
//   );

//   res.json({ message: 'OK' });
// });

// router.route('/seats/:id').delete((req, res) => {
//   const id = parseInt(req.params.id);

//   const filteredDb = db.seats.filter((seatObj) =>
//     seatObj.id === id ? false : true
//   );

//   console.log(filteredDb);
//   res.json({ message: 'OK' });
// });

module.exports = router;
