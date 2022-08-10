const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if (!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  try {
    const { author, text } = req.body;

    const newTestimonial = new Testimonial({
      author: author,
      text: text,
    });
    await newTestimonial.save();
    res.json(newTestimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putOne = async (req, res) => {
  const { author, text } = req.body;
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (tes) {
      const updatedTestimonial = await Testimonial.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            author: author,
            text: text,
          },
        },
        { new: true }
      );
      res.json(updatedTestimonial);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const tes = await Testimonial.findOneAndDelete({ _id: req.params.id });
    if (tes) {
      res.json(tes);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
