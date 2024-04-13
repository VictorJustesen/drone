require('dotenv').config();
const express = require('express');
const axios = require('axios');
const schedule = require('node-schedule');


const app = express();
const port = 3000;

let latestApiResponse = {}; // Cache the latest API response here

// Function to fetch API data
async function fetchApiData() {
    const apiKey = process.env.REACT_APP_WINDY_API_KEY;  // Ensure the API key is correctly loaded from your environment variables
    console.log(apiKey);
    const url = 'https://api.windy.com/api/point-forecast/v2'; // Adjusted endpoint from Windy API examples
    try {
        const response = await axios.get(url, {
            params: {
                key: apiKey,
                lat: 49.2785566,
                lon: 31.1420338,
                model: 'gfs', // Specify the model as per Windy API requirements
                parameters: ['wind', 'temp'], // Example parameters that you might want to fetch
                levels: ['surface'], // The level of the forecast (if required)
                hours: [0,3,6,9] // Forecast hours array
            }
        });
        console.log('Windy API data fetched successfully:', /*response.data*/);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data from Windy API:', /*error*/);
    }
}

// Schedule task to run every hour
schedule.scheduleJob('0 * * * *', fetchApiData);

// Uncomment the following line to fetch data immediately upon server start
fetchApiData();

// Endpoint to get the latest API data
app.get('/api/data', (req, res) => {
    res.json(latestApiResponse || { error: 'No data available.' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
