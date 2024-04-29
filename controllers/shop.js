const {
    shopItemCreate, shopItemEdit, shopItemsGet, shopItemDelete
} = require('../models/shop');
const { itemPurchase } = require('../models/inventory');

const getShopItems = async (req, res) => {
    const { id } = req.user;
    try {
        const result = await shopItemsGet(id);
        if (result) {
            res.status(200).json({ shopItems: result })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

const createShopItem = async (req, res) => {
    const user_id = req.user.id;
    const { id, name, description, price, icon } = req.body;
    try {
        const result = await shopItemCreate(id, user_id, name, description, price, icon);
        if (result) {
            res.status(201).json({ message: "Shop item successfully created" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error"})
    }
};

const updateShopItem = async (req, res) => {
    const { id, name, description, price, icon } = req.body;
    try {
        const result = await shopItemEdit(id, name, description, price, icon);
        if (result) {
            res.status(200).json({ message: "Shop item successfully updated" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

const deleteShopItem = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await shopItemDelete(id);
        if (result) {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

const purchaseShopItem = async (req, res) => {
    const user_id = req.user.id;
    const { id, shop_item_id, quantity } = req.body;
    try {
        const result = await itemPurchase(id, user_id, shop_item_id, quantity);
        if (result) {
            res.status(201).json({ message: "Item successfully added to inventory" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    purchaseShopItem,
    getShopItems,
    createShopItem,
    updateShopItem,
    deleteShopItem,
    itemPurchase
};