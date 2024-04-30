const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/authentication');
const { addToRewardHistory } = require('../controllers/reward_history');

const rewardHistoryRouter = express.Router();

rewardHistoryRouter.post('/add-to-history');

module.exports = rewardHistoryRouter;