import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from "../../types/user"
import { getUserData, addUserData, updateUserData, deleteUserData } from "../apiwithThunks/usersApi"


interface UserState {
    currentUser: User[];
    statusUser: "idle" | "loading" | "succeeded" | "failed";
    errorUser: string | null;
}

const initialState: UserState = {
    currentUser: [],
    statusUser: "idle",
    errorUser: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // ---------- GET ----------
        builder
            .addCase(getUserData.pending, (state) => {
                state.statusUser = "loading";
                state.errorUser = null;
            })
            .addCase(getUserData.fulfilled, (state, action: PayloadAction<User[] | undefined>) => {
                if (action.payload && Array.isArray(action.payload)) {
                    state.statusUser = "succeeded";
                    state.currentUser = action.payload;
                } else {
                    state.statusUser = "failed";
                    state.errorUser = "Veri alınamadı.";
                }
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.statusUser = "failed";
                state.errorUser = action.error.message || "Görevler alınırken bir hata oluştu.";
            });

        // ---------- ADD ----------
        builder
            .addCase(addUserData.pending, (state) => {
                state.statusUser = "loading";
                state.errorUser = null;
            })
            .addCase(addUserData.fulfilled, (state, action: PayloadAction<User | undefined>) => {
                if (action.payload) {
                    state.statusUser = "succeeded";
                    state.currentUser.push(action.payload);
                } else {
                    state.statusUser = "failed";
                    state.errorUser = "Yeni görev eklenemedi.";
                }
            })
            .addCase(addUserData.rejected, (state, action) => {
                state.statusUser = "failed";
                state.errorUser = action.error.message || "Görev eklenirken bir hata oluştu.";
            });

        // ---------- UPDATE ----------
        builder
            .addCase(updateUserData.pending, (state) => {
                state.statusUser = "loading";
                state.errorUser = null;
            })
            .addCase(updateUserData.fulfilled, (state, action: PayloadAction<User>) => {
                if (action.payload) {
                    state.statusUser = "succeeded";
                    state.currentUser = state.currentUser.map((info) =>
                        info.id === action.payload.id ? action.payload : info
                    );
                } else {
                    state.statusUser = "failed";
                    state.errorUser = "Görev güncellenemedi.";
                }
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.statusUser = "failed";
                state.errorUser = action.error.message || "Görev güncellenirken bir hata oluştu.";
            });

        // ---------- DELETE ----------
        builder
            .addCase(deleteUserData.pending, (state) => {
                state.statusUser = "loading";
                state.errorUser = null;
            })
            .addCase(deleteUserData.fulfilled, (state, action: PayloadAction<string | undefined>) => {
                if (action.payload) {
                    state.statusUser = "succeeded";
                    state.currentUser = state.currentUser.filter((info) => info.id !== action.payload);
                } else {
                    state.statusUser = "failed";
                    state.errorUser = "Görev silinemedi.";
                }
            })
            .addCase(deleteUserData.rejected, (state, action) => {
                state.statusUser = "failed";
                state.errorUser = action.error.message || "Görev silinirken bir hata oluştu.";
            });


    }
});

export const { } = userSlice.actions;
export default userSlice.reducer;
