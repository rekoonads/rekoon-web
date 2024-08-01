import { model, Schema } from 'mongoose';
const advertiser = new Schema(
  {
    userId: {type: String, required: true},
    advertiserId: { type: String },
    advertiserName: { type: String },
    advertiserLogo: { type: String },
    gstNumber: { type: String },
    legalName: { type: String },
    address: { type: String },
    gstCertificate: { type: String },
    cinNumber: { type: String },
  },
  {
    timestamps: true,
  },
);
export const Advertisermodel = model('Advertisers', advertiser);
