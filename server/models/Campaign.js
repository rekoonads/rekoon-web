const mongoose = require('mongoose');
const campaign = new mongoose.Schema(
  {
    campaignId: String,
    campaignName: String,
    campaignGoal: String,
    campaignAdvertiserBudget: String,
    campaignWeeklyBudget: String,
    campaignDailyBudget: String,
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
