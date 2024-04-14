require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(process.env.REACT_APP_WINDY_API_KEY);
  fetchCoordinates();
});

async function fetchCoordinates() {
    try {
        const apiKey = process.env.REACT_APP_WINDY_API_KEY; // Ensure this is correctly set in your .env file
        const payload = {
            lat: 49.809, // Example latitude
            lon: 16.787, // Example longitude
            model: 'gfs', // Example model
            parameters: ['wind'], // Example parameters
            levels: ['1000h'], // Example levels
            key: apiKey
        };
        const url = `https://api.windy.com/api/point-forecast/v2`; // POST endpoint
        const response = await axios.post(url, payload);
        console.log('Forecast Data:', response.data); // Log the response data
    } catch (error) {
        console.error('Failed to fetch data:', error.response ? error.response.data : error.message);
    }
}


