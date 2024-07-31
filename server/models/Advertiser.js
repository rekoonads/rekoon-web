const mongoose = require('mongoose');
const advertiser = new mongoose.Schema(
  {
    advertiserName: String,
    advertiserLogo: String,
    gstNumber: String,
    legalName: String,
    address: String,
    gstCertificate: String,
    cinNumber: String
  },
  {
    timestamps: true,
  },
);
const Advertisermodel = mongoose.model('Advertiser', advertiser);

module.exports = Advertisermodel;
