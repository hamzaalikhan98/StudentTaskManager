import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "STUDENT_TASKS";

export const loadTasks = createAsyncThunk("tasks/loadTasks", async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
});

export const saveTasks = createAsyncThunk("tasks/saveTasks", async (tasks) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return tasks;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
    },

    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },

    toggleTaskStatus: (state, action) => {
      const task = state.items.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    submitTaskFile: (state, action) => {
      const { taskId, file } = action.payload;
      const task = state.items.find((task) => task.id === taskId);

      if (task) {
        task.file = file;
        task.completed = true;
        task.submittedAt = new Date().toDateString();
      }
    },

    clearAllTasks: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadTasks.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to load tasks";
      });
  },
});

export const {
  addTask,
  deleteTask,
  toggleTaskStatus,
  submitTaskFile,
  clearAllTasks,
} = taskSlice.actions;

export default taskSlice.reducer;