const mongoose = require('mongoose');
const campaign = new mongoose.Schema(
  {
    campaignName: String,
    campaignGoal: String,
    budget: String,
    campaignBudget: String,
    startDate: Date,
    endDate: Date,
  },
  {
    timestamps: true,
  },
);
const Campaignmodel = mongoose.model('Campaigns', campaign);

module.exports = Campaignmodel;
