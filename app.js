require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json())

const home = require('./routes/home');
const user = require('./routes/user');

app.use('/api/v1',home);
app.use('/api/v1',user);

module.exports = app