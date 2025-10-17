import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "../../types/user"


interface UserState {
    currentUser: User | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    currentUser: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        },
        updateProfile: (state, action: PayloadAction<Partial<User>>) => {
            if (state.currentUser) {
                state.currentUser = { ...state.currentUser, ...action.payload };
            }
        },
    },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
