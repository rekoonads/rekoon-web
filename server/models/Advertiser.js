import {model, Schema} from "mongoose"
const advertiser = new Schema(
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
export const Advertisermodel = model('Advertiser', advertiser);


