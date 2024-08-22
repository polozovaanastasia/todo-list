import { configureStore } from "@reduxjs/toolkit";
import { todolistsReducer } from "./todolistsReducer/todolists-reducer";
import { tasksReducer } from "./taskReducer/tasks-reducer";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type AppRootState = ReturnType<typeof store.getState>;

//@ts-ignore
window.store = store;
