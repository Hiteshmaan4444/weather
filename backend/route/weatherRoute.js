const express = require('express');
const router = express.Router();
const axios = require('axios');

router.route('/:city').get(async (req, res) => {
  const city = req.params.city;
  const apiUrl =
    'http://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&APPID=' +
    process.env.API_KEY;

  await axios
    .get(apiUrl)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

module.exports = router;
