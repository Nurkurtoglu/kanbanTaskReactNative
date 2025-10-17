import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from "../../types/task";
import { allTasks } from "../../datas/statusData";

interface TasksState {
    tasks: Task[];
    //isLoading: boolean
}

const initialState: TasksState = {
    tasks: allTasks,
    //isLoading: true
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(t => t.id === action.payload.id);
            if (index !== -1) state.tasks[index] = action.payload;
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        },
    },
});

export const { addTask, updateTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
