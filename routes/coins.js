const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/authentication');
const { getCoins, addCoins, subtractCoins } = require('../controllers/coins');

const coinsRouter = express.Router();

coinsRouter.get('/', checkAuthenticated, getCoins);

coinsRouter.put('/add-coins', checkAuthenticated, addCoins);

coinsRouter.put('/subtract-coins', checkAuthenticated, subtractCoins);

module.exports = coinsRouter;
