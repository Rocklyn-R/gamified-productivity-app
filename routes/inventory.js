const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/authentication');
const { getInventoryItems } = require('../controllers/inventory');

const inventoryRouter = express.Router();

inventoryRouter.get('/', checkAuthenticated, getInventoryItems);

module.exports = inventoryRouter;