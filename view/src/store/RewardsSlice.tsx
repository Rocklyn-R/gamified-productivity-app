import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { InventoryItem, Reward, RewardsState, UsedRewards } from "../types/types";

const currentDate = new Date();
const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);


export const RewardsSlice = createSlice({
    name: "rewards",
    initialState: {
        totalCoins: 0,
        shop: [],
        inventory: [],
        usedRewards: []
    } as RewardsState,

    reducers: {
        setCoins: (state, action: PayloadAction<number>) => {
            state.totalCoins = action.payload;
        }, 
        addToCoins: (state, action: PayloadAction<number>) => {
            state.totalCoins = state.totalCoins + action.payload;
        },

        subtractFromCoins: (state, action: PayloadAction<number>) => {
            state.totalCoins = state.totalCoins - action.payload;
        },
        setShopItems: (state, action: PayloadAction<Reward[]>) => {
            state.shop = action.payload;
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
        setInventory: (state, action: PayloadAction<InventoryItem[]>) => {
            state.inventory = action.payload
        },
        setUsedRewards: (state, action: PayloadAction<UsedRewards[]>) => {
            state.usedRewards = action.payload;
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
                date_used: formattedDate
            });
            }
        },
        deleteUsedReward: (state, action: PayloadAction<UsedRewards>) => {
            const { id } = action.payload;
            state.usedRewards = state.usedRewards.filter(item => item.id !== id);
        }
    }
})

export const {
    setCoins,
    addToCoins,
    subtractFromCoins,
    setShopItems,
    addItemToShop,
    editItemInShop,
    deleteItemFromShop,
    buyItem,
    setInventory,
    setUsedRewards,
    spendReward,
    deleteUsedReward
} = RewardsSlice.actions;

export const selectTotalCoins = (state: RootState) => state.rewards.totalCoins;
export const selectItemsInShop = (state: RootState) => state.rewards.shop;
export const selectInventory = (state: RootState) => state.rewards.inventory;
export const selectUsedRewards = (state: RootState) => state.rewards.usedRewards;




export default RewardsSlice.reducer;