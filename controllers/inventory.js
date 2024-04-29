const {
    inventoryItemsGet
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

module.exports = {
    getInventoryItems
}