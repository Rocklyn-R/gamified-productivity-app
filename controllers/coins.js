const {
    coinsCreate,
    coinsGet,
    coinsAdd,
    coinsSubtract
} = require('../models/coins');

const createCoins = async (req, res) => {
    const { id } = req.user;
    try {
        const result = await coinsCreate(id);
        if (result) {
            res.status(201).json({ message: 'Coins Created'})
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getCoins = async (req, res) => {
    const { id } = req.user;
    try {
        const result = await coinsGet(id);
        if (result) {
            res.status(200).json({ totalCoins: result })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
};

const addCoins = async (req, res) => {
    const { id } = req.user;
    const { coins } = req.body;
    try {
        const result = await coinsAdd(coins, id);
        if (result) {
            res.status(200).json({ message: 'Added to coins successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'})
    }
};

const subtractCoins = async (req, res) => {
    const { id } = req.user;
    const { coins } = req.body;
    try {
        const result = await coinsSubtract(coins, id);
        if (result) {
            res.status(200).json({ message: 'Subtracted from coins successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    createCoins,
    getCoins,
    addCoins,
    subtractCoins
};