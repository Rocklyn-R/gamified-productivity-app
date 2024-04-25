import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserState } from "../types/types";


export const UserSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        firstName: '',
        lastName: '',
        email: '',
    } as UserState,
    reducers: {
        authenticateUser: (state) => {
            state.isAuthenticated = true;
        },
        unauthenticateUser: (state) => {
            state.isAuthenticated = false;
        },
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        }
    }
})

export const {
    authenticateUser,
    unauthenticateUser,
    setFirstName,
    setLastName,
    setEmail
} = UserSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectFirstName = (state: RootState) => state.user.firstName;
export const selectLastName = (state: RootState) => state.user.lastName;
export const selectEmail = (state: RootState) => state.user.email;

export default UserSlice.reducer;