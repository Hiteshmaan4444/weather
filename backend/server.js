const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./') + '/frontend/index.html');
});

app.use('/api/weather', require('./route/weatherRoute'));

app.listen(process.env.PORT, () => {
  console.log('server running at port number 5000');
});
