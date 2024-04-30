const {
    inventoryItemsGet,
    inventoryItemUse
} = require('../models/inventory');

const getInventoryItems = async (req, res) => {
    const { id } = req.user;
    try {
        const result = await inventoryItemsGet(id);
        if (result) {
            res.status(200).json({ inventoryItems: result })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
};

const useInventoryItem = async (req, res) => {
    const { id, quantity } = req.body;
    try {
        const result = await inventoryItemUse(id, quantity);
        if (result) {
            res.status(200).json({ message: "Item successfully used"});
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
};


module.exports = {
    getInventoryItems,
    useInventoryItem
}