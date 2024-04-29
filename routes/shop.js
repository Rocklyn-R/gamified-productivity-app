const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/authentication');
const { createShopItem, updateShopItem, getShopItems, deleteShopItem, purchaseShopItem } = require('../controllers/shop');

const shopRouter = express.Router();

shopRouter.get('/', checkAuthenticated, getShopItems);

shopRouter.post('/create-item', checkAuthenticated, createShopItem);

shopRouter.put('/edit-item', checkAuthenticated, updateShopItem);

shopRouter.delete('/delete-item', checkAuthenticated, deleteShopItem);

shopRouter.post('/buy-item', checkAuthenticated, purchaseShopItem);

module.exports = shopRouter;