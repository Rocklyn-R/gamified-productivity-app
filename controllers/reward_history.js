const {
    rewardHistoryAdd,
    rewardHistoryGet,
    rewardHistoryItemDelete
} = require('../models/reward-history');

const addToRewardHistory = async (req, res) => {
    const user_id = req.user.id;
    const { id, shop_item_id, date_used } = req.body;
    try {
        const result = await rewardHistoryAdd(user_id, id, shop_item_id, date_used);
        if (result) {
            res.status(201).json({ message: "Successfully added to reward history" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }   
}

const getRewardHistory = async (req, res) => {
    console.log(req.session);
    const { id } = req.user;
    try {
        const result = await rewardHistoryGet(id);
        if (result) {
            res.status(200).json({ rewardHistory: result })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const deleteRewardHistoryItem = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await rewardHistoryItemDelete(id);
        if (result) {
            res.status(201).json({ message: "Successfully deleted item" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    addToRewardHistory,
    getRewardHistory,
    deleteRewardHistoryItem
};