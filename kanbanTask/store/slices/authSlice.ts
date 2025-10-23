import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from "../../types/user"
import axios from 'axios';
import { API_URL } from "@/contants/Common";


interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/users/login`, { email, password });

            // backend'den gelen yanıtı kontrol et
            if (!response.data.user) {
                return rejectWithValue(response.data.message || 'Email veya şifre hatalı');
            }

            const { token, user } = response.data;

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));

            return { token, user };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Giriş başarısız.');
        }
    }
);


//  AsyncStorage’dan kullanıcıyı geri yükleme 
export const loadUserFromStorage = createAsyncThunk('auth/loadUser', async () => {
    const token = await AsyncStorage.getItem('token');
    const userStr = await AsyncStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    return { token, user };
});

//Logout işlemi
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
});



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || 'Bir hata oluştu';
            })

            // LOAD USER
            .addCase(loadUserFromStorage.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
            })

            // LOGOUT
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export default authSlice.reducer;