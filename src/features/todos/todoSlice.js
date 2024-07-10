import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";

const initialState = {
  todos: [],
  activeTodo: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        ...action.payload,
        id: state.todos.length + 1,
        status: "Pending",
        duration: 0,
        startTime: null,
        endTime: null,
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    startTodo: (state, action) => {
      if (state.activeTodo) return;
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.status = "Ongoing";
        todo.startTime = Date.now();
        state.activeTodo = todo.id;
      }
    },
    pauseTodo: (state) => {
      if (state.activeTodo) {
        const todo = state.todos.find((todo) => todo.id === state.activeTodo);
        if (todo) {
          const elapsed = Math.floor((Date.now() - todo.startTime) / 1000);
          todo.duration += elapsed;
          todo.status = "Paused";
          state.activeTodo = null;
        }
      }
    },
    resumeTodo: (state, action) => {
      if (state.activeTodo) return;
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.status = "Ongoing";
        todo.startTime = Date.now();
        state.activeTodo = todo.id;
      }
    },
    endTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        const elapsed = Math.floor((Date.now() - todo.startTime) / 1000);
        todo.duration += elapsed;
        todo.status = "Completed";
        todo.endTime = Date.now();
        state.activeTodo = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.todos = [];
      state.activeTodo = null;
    });
  },
});

export const {
  addTodo,
  removeTodo,
  startTodo,
  pauseTodo,
  resumeTodo,
  endTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
