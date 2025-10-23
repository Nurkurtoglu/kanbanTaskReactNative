import axios from "axios";
import { API_URL } from "@/contants/Common";
import { User } from "../../types/user"
import { createAsyncThunk } from '@reduxjs/toolkit';



// Tüm verileri getirme
export const getUserData = createAsyncThunk("users/fetchUsers", async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
})

//Veri Ekleme
export const addUserData = createAsyncThunk("users/addUsers", async (user: Partial<User>): Promise<User> => {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
}
)
//Veri Güncelleme
export const updateUserData = createAsyncThunk("users/updateUsers", async (user: Partial<User> & { id: string }): Promise<User> => {
    try {
        const response = await axios.patch(`${API_URL}/users/${user.id}`, user);
        return response.data;
    } catch (error: any) {
        console.error("User güncelleme hatası:", error.response || error.message);
        throw error;
    }
})

// Veri Silme
export const deleteUserData = createAsyncThunk("users/deleteUsers", async (id: string): Promise<string> => {
    try {
        const response = await axios.delete(`${API_URL}/users/${id}`);
        return response.data.message || "User silindi"; // backend'den mesaj gelirse kullan
    } catch (error: any) {
        console.error("User silme hatası:", error.response || error.message);
        throw error;
    }
})
