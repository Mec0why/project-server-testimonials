const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
    res.status(404).send('404 You shall not pass!');
  });

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
