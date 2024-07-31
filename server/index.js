const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
require('dotenv/config');

app.use(express.json());
app.use(cookieParser());

const db =
  'mongodb+srv://kartik:rekoonweb471@cluster0.f23xyop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(db)
  .then(() => {
    console.log('Mongo db connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);

app.listen(3001, () => {
  console.log('running');
});
