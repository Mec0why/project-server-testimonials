const express = require('express');
const router = express.Router();

const Seat = require('../models/seat.model');
const Concert = require('../models/concert.model');

router.get('/seats', async (req, res) => {
  try {
    res.json(await Seat.find().populate('event'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id).populate('event');
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/seats', async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;

    const eventMatch = await Concert.findOne({ day: day });

    if (!eventMatch) {
      res.status(404).json({ message: 'There are no events on this date...' });
    } else {
      const seatCheck = await Seat.findOne({
        $and: [{ seat: seat }, { event: eventMatch._id }],
      });

      if (!seatCheck) {
        const newSeat = new Seat({
          event: eventMatch,
          seat: seat,
          client: client,
          email: email,
        });
        await newSeat.save();

        const allSeats = await Seat.find().populate('event');
        req.io.emit('seatsUpdated', allSeats);

        res.json(newSeat);
      } else {
        res.status(409).json({ message: 'Seat is already taken...' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/seats/:id', async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;

    const eventMatch = await Concert.findOne({ day: day });

    if (!eventMatch) {
      res.status(404).json({ message: 'There are no events on this date...' });
    } else {
      const seatCheck = await Seat.findOne({
        $and: [{ seat: seat }, { event: eventMatch._id }],
      });

      if (seatCheck) {
        res.status(404).json({ message: 'Seat Already Booked...' });
      } else {
        const seatMatch = await Seat.findById(req.params.id);

        if (seatMatch) {
          const updatedSeat = await Seat.findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                event: eventMatch,
                seat: seat,
                client: client,
                email: email,
              },
            },
            { new: true }
          );
          res.json(updatedSeat);
        } else {
          res.status(404).json({ message: 'Seat Not found...' });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// router.route('/seats/:id').delete((req, res) => {
//   const id = parseInt(req.params.id);

//   const filteredDb = db.seats.filter((seatObj) =>
//     seatObj.id === id ? false : true
//   );

//   console.log(filteredDb);
//   res.json({ message: 'OK' });
// });

module.exports = router;
