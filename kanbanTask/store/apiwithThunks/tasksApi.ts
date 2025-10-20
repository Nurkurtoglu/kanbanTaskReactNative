import axios from "axios";
import { API_URL } from '@env';
import { Task } from "../../types/task"
import { createAsyncThunk } from '@reduxjs/toolkit';



// Tüm verileri getirme
export const getTaskData = createAsyncThunk("tasks/fetchTask", async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
});

export const getTaskById = createAsyncThunk("tasks/fetchTaskById", async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/tasks/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
});


//Veri Ekleme
export const addTaskData = createAsyncThunk(
    "tasks/addTasks",
    async (task: Partial<Task>, { getState, rejectWithValue }) => {
        try {
            const state: any = getState(); // Redux state
            const token = state.auth.token; // authSlice’dan token

            const response = await axios.post(
                `${API_URL}/tasks`,
                task,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // token ekleniyor
                    }
                }
            );

            return response.data; // backend’den dönen Task objesi
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Task eklenemedi');
        }
    }
);

//Veri Güncelleme
export const updateTaskData = createAsyncThunk("tasks/updateTasks", async (task: Partial<Task> & { id: string }): Promise<Task> => {
    try {
        const response = await axios.patch(`${API_URL}/tasks/${task.id}`, task);
        return response.data; // güncellenmiş task objesini döner
    } catch (error: any) {
        console.error("Task güncelleme hatası:", error.response || error.message);
        throw error; // hatayı fırlatıyoruz, thunk içinde yakalanacak
    }
})

// Veri Silme
export const deleteTaskData = createAsyncThunk("tasks/deleteTask", async (id: string): Promise<string> => {
    try {
        const response = await axios.delete(`${API_URL}/tasks/${id}`);
        return response.data.message || "Task silindi"; // backend'den mesaj gelirse kullan
    } catch (error: any) {
        console.error("Task silme hatası:", error.response || error.message);
        throw error; // thunk içinde rejected olarak yakalanacak
    }
}) 
