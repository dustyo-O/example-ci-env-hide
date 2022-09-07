const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
const port = 3000;

const ENVIRONMENT = process.env.ENV || process.env.NODE_ENV || 'development';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), `.${ENVIRONMENT}.env`), override: true });

app.get('/ping', (req, res) => {
  res.send('pong');
});

const { API_HOST, CLIENT_ID } = process.env;

app.get('/photos/random', async (req, res) => {
    console.log(`${API_HOST}/photos/random?client_id=${CLIENT_ID}`);
    const response = await axios.get(`${API_HOST}/photos/random?client_id=${CLIENT_ID}`);

    const data = response.data;

    res.json(data);
});

app.listen(port, () => {
    console.log(process.env);
    console.log(`Example app listening on port ${port}`);
});
