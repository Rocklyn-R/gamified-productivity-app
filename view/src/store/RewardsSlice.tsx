import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { InventoryItem, Reward, RewardsState } from "../types/types";

const currentDate = new Date();
const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);


export const RewardsSlice = createSlice({
    name: "rewards",
    initialState: {
        totalCoins: 200,
        shop: [{
            name: "Movie",
            price: 100,
            description: "2 hour long",
            id: "124sdfgd23",
            icon: "movie"
        },
        {
            name: "TV Episode",
            price: 50,
            description: "1 hour long",
            id: "124sgshsdfhfd23",
            icon: "movie"
        },
        {
            name: "Have A Cocktail",
            price: 50,
            description: "",
            id: "124sgshsdfasdfsdfhfd23",
            icon: "cocktail"
        },
        {
            name: "Play Video Games",
            price: 100,
            description: "1 hour",
            id: "124sgsaagahsdfhfd23",
            icon: "videoGame"
        },
        {
            name: "Scroll Phone",
            price: 100,
            description: "1 hour",
            id: "12424dgashsdfhfd23",
            icon: "phone"
        }, 
    ],
        inventory: [{
            name: "Movie",
            price: 50,
            description: "2 hour long",
            id: "124sdfgd23",
            icon: "movie",
            quantity: 3
        }],
        usedRewards: [
            {
                name: "Movie",
                price: 50,
                description: "2 hour long",
                id: "124sdfgd23",
                icon: "movie",
                dateUsed: "02/14/2014"
            },
            {
                name: "Movie",
                price: 50,
                description: "2 hour long",
                id: "124sdfgd23",
                icon: "movie",
                dateUsed: "02/14/2014"
            }
        ]
    } as RewardsState,

    reducers: {
        addToCoins: (state, action: PayloadAction<number>) => {
            state.totalCoins = state.totalCoins + action.payload;
        },

        subtractCoins: (state, action: PayloadAction<number>) => {
            state.totalCoins = state.totalCoins - action.payload;
        },

        addItemToShop: (state, action: PayloadAction<Reward>) => {
            state.shop.unshift(action.payload);
        },

        editItemInShop: (state, action: PayloadAction<Reward>) => {
            const shopItemIndex = state.shop.findIndex(item => item.id === action.payload.id);
            if (shopItemIndex !== -1) {
                state.shop[shopItemIndex] = action.payload;
            }
            const inventoryItemIndex = state.inventory.findIndex(item => item.id === action.payload.id);
            if (inventoryItemIndex !== -1) {
                state.inventory[inventoryItemIndex].icon = action.payload.icon;
            }

            const usedItemIndex = state.usedRewards.findIndex(item => item.id === action.payload.id);
            if (usedItemIndex !== -1) {
                state.usedRewards = state.usedRewards.map(reward => {
                    if (reward.id === action.payload.id) {
                        return { ...reward, icon: action.payload.icon }
                    }
                    return reward;
                })
            }
        },

        deleteItemFromShop: (state, action: PayloadAction<Reward>) => {
            state.shop = state.shop.filter(item => item.id !== action.payload.id);
        },

        buyItem: (state, action: PayloadAction<{reward: Reward, quantity: number}>) => {
            const { reward, quantity } = action.payload;
            const existingItemIndex = state.inventory.findIndex(item => item.id === reward.id);
            if (existingItemIndex !== -1) {
                state.inventory[existingItemIndex].quantity += quantity;
            } else {
                const itemWithQuantity: InventoryItem = { ...reward, quantity: quantity };
                state.inventory.unshift(itemWithQuantity)
            }
            const totalPrice = reward.price * quantity;
            state.totalCoins = state.totalCoins - totalPrice;
        },

        spendReward: (state, action: PayloadAction<{item: InventoryItem, quantity: number}>) => {
            const { item, quantity } = action.payload;
            const existingItemIndex = state.inventory.findIndex(inventoryItem => inventoryItem.id === item.id);
            if (existingItemIndex !== -1) {
                state.inventory[existingItemIndex].quantity -= quantity;
                if (state.inventory[existingItemIndex].quantity === 0) {
                    // If the quantity becomes 0, remove the item from the inventory
                    state.inventory.splice(existingItemIndex, 1);
                }
            }

            for (let i = 0; i < quantity; i++) {
                 state.usedRewards.unshift({
                name: item.name,
                price: item.price,
                description: item.description,
                id: item.id,
                icon: item.icon,
                dateUsed: formattedDate
            });
            }
           

        }
    }
})

export const {
    addToCoins,
    subtractCoins,
    addItemToShop,
    editItemInShop,
    deleteItemFromShop,
    buyItem,
    spendReward
} = RewardsSlice.actions;

export const selectTotalCoins = (state: RootState) => state.rewards.totalCoins;
export const selectItemsInShop = (state: RootState) => state.rewards.shop;
export const selectInventory = (state: RootState) => state.rewards.inventory;
export const selectUsedRewards = (state: RootState) => state.rewards.usedRewards;



export default RewardsSlice.reducer;