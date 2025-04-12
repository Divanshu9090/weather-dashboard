const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/weather', require('./routes/weather'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});