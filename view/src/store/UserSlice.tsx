import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserState } from "../types/types";
import { PayloadAction } from "@reduxjs/toolkit";


export const UserSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        firstName: '',
        lastName: '',
        email: '',
        google_linked: false,
        password: true
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
        }, 
        setGoogleLinked: (state, action: PayloadAction<boolean>) => {
            state.google_linked = action.payload;
        },
        setPasswordExists: (state, action: PayloadAction<boolean>) => {
            state.password = action.payload;
        },
        resetUserState: () => ({
            isAuthenticated: false,
            firstName: '',
            lastName: '',
            email: '',
            google_linked: false,
            password: true
        } as UserState),
    }
})

export const {
    authenticateUser,
    unauthenticateUser,
    setFirstName,
    setLastName,
    setEmail, 
    setGoogleLinked,
    setPasswordExists,
    resetUserState
} = UserSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectFirstName = (state: RootState) => state.user.firstName;
export const selectLastName = (state: RootState) => state.user.lastName;
export const selectEmail = (state: RootState) => state.user.email;
export const selectGoogleLinked = (state: RootState) => state.user.google_linked;
export const selectPasswordExists = (state: RootState) => state.user.password;

export default UserSlice.reducer;