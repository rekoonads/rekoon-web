import { model, Schema } from 'mongoose';
const agencies = new Schema(
  {
    agencyId: { type: String, required: true, unique: true },
    agencyName: { type: String, required: true },
    gstNumber: { type: String, required: true },
    legalName: { type: String, required: true },
    address: { type: String, required: true },
    gstCertificate: { type: String, required: true },
    cinNumber: { type: String, required: true },
    createdAt: { type: Date },
  },
  {
    timestamps: true,
  },
);
export const Agencymodel = model('Agencies', agencies);
