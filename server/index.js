import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import pkg from 'body-parser';
import {Advertisermodel} from './models/Advertiser.js';

const { urlencoded, json } = pkg;
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

  app.post("/addAdvertiser", async (req, res) => {
    const {
      advertiserName,
      advertiserLogo,
      gstNumber,
      legalName,
      address,
      gstCertificate,
      cinNumber
    } = req.body;
  
    const new_advertiser = await new Advertisermodel({
      advertiserName,
      advertiserLogo,
      gstNumber,
      legalName,
      address,
      gstCertificate,
      cinNumber
    });
    let response_data =[];
    Advertisermodel.create(new_advertiser).then((advertiser) => {
       response_data.push({advertiser_data: advertiser});
    });
    return res.json(response_data);
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
