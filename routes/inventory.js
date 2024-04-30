const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/authentication');
const { getInventoryItems, useInventoryItem } = require('../controllers/inventory');
const { addToRewardHistory, getRewardHistory, deleteRewardHistoryItem } = require('../controllers/reward_history');

const inventoryRouter = express.Router();

inventoryRouter.get('/', checkAuthenticated, getInventoryItems);

inventoryRouter.put('/use-item', useInventoryItem);

inventoryRouter.post('/add-to-history', addToRewardHistory);

inventoryRouter.get('/reward-history', getRewardHistory)

inventoryRouter.delete('/reward-history/delete-item', deleteRewardHistoryItem)

module.exports = inventoryRouter;