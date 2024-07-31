import express from 'express';
import mongoose from 'mongoose';
import pkg from 'body-parser';
const { urlencoded, json } = pkg;
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());

const db = process.env.MONGO_DB;

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

app.listen(PORT, () => {
  console.log('running');
});
