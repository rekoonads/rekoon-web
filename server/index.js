import express from 'express';
import { mongo } from './db/mongoConnection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import pkg from 'body-parser';
import apiRouter from './routes/api.js';

const { urlencoded, json } = pkg;
const PORT = process.env.PORT || 8080;

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());

//Routing
app.use('/', apiRouter);

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);

// Save server loader function
let server;
Promise.all([mongo()])
  .then(() => {
    server = app.listen(PORT, () => {
      console.log(`The Server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    if (server) {
      server.close();
    }

    console.log('Restarting the server...');
    server = app.listen(PORT, () => {
      console.log(`The Server has been restarted on ${PORT}`);
    });
  });
