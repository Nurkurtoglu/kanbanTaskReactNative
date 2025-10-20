import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from "../../types/task";
import { getTaskData, addTaskData, updateTaskData, deleteTaskData, getTaskById } from "../apiwithThunks/tasksApi";

interface TasksState {
    tasks: Task[];
    statusTask: "idle" | "loading" | "succeeded" | "failed";
    errorTask: string | null;
}

const initialState: TasksState = {
    tasks: [],
    statusTask: "idle",
    errorTask: null,
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // ---------- GET ----------
        builder
            .addCase(getTaskData.pending, (state) => {
                state.statusTask = "loading";
                state.errorTask = null;
            })
            .addCase(getTaskData.fulfilled, (state, action: PayloadAction<Task[] | undefined>) => {
                if (action.payload && Array.isArray(action.payload)) {
                    state.statusTask = "succeeded";
                    state.tasks = action.payload;
                } else {
                    state.statusTask = "failed";
                    state.errorTask = "Veri alınamadı.";
                }
            })
            .addCase(getTaskData.rejected, (state, action) => {
                state.statusTask = "failed";
                state.errorTask = action.error.message || "Görevler alınırken bir hata oluştu.";
            });

        // task by id 
        builder
            .addCase(getTaskById.pending, (state) => {
                state.statusTask = "loading";
                state.errorTask = null;
            })
            .addCase(getTaskById.fulfilled, (state, action: PayloadAction<Task[] | undefined>) => {
                if (action.payload && Array.isArray(action.payload)) {
                    state.statusTask = "succeeded";
                    state.tasks = action.payload;
                } else {
                    state.statusTask = "failed";
                    state.errorTask = "Veri alınamadı.";
                }
            })
            .addCase(getTaskById.rejected, (state, action) => {
                state.statusTask = "failed";
                state.errorTask = action.error.message || "Görevler alınırken bir hata oluştu.";
            });

        // ---------- ADD ----------
        builder
            .addCase(addTaskData.pending, (state) => {
                state.statusTask = "loading";
                state.errorTask = null;
            })
            .addCase(addTaskData.fulfilled, (state, action: PayloadAction<Task | undefined>) => {
                if (action.payload) {
                    state.statusTask = "succeeded";
                    state.tasks.push(action.payload);
                } else {
                    state.statusTask = "failed";
                    state.errorTask = "Yeni görev eklenemedi.";
                }
            })
            .addCase(addTaskData.rejected, (state, action) => {
                state.statusTask = "failed";
                state.errorTask = action.error.message || "Görev eklenirken bir hata oluştu.";
            });

        // ---------- UPDATE ----------
        builder
            .addCase(updateTaskData.pending, (state) => {
                state.statusTask = "loading";
                state.errorTask = null;
            })
            .addCase(updateTaskData.fulfilled, (state, action: PayloadAction<Task>) => {
                if (action.payload) {
                    state.statusTask = "succeeded";
                    state.tasks = state.tasks.map((info) =>
                        info.id === action.payload.id ? action.payload : info
                    );
                } else {
                    state.statusTask = "failed";
                    state.errorTask = "Görev güncellenemedi.";
                }
            })
            .addCase(updateTaskData.rejected, (state, action) => {
                state.statusTask = "failed";
                state.errorTask = action.error.message || "Görev güncellenirken bir hata oluştu.";
            });

        // ---------- DELETE ----------
        builder
            .addCase(deleteTaskData.pending, (state) => {
                state.statusTask = "loading";
                state.errorTask = null;
            })
            .addCase(deleteTaskData.fulfilled, (state, action: PayloadAction<string | undefined>) => {
                if (action.payload) {
                    state.statusTask = "succeeded";
                    state.tasks = state.tasks.filter((info) => info.id !== action.payload);
                } else {
                    state.statusTask = "failed";
                    state.errorTask = "Görev silinemedi.";
                }
            })
            .addCase(deleteTaskData.rejected, (state, action) => {
                state.statusTask = "failed";
                state.errorTask = action.error.message || "Görev silinirken bir hata oluştu.";
            });
    },
});

export default tasksSlice.reducer;
