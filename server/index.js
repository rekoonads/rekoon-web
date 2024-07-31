const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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
