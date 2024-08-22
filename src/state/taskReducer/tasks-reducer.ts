import { v1 } from "uuid";
import { TasksStateType } from "../../App";
import {
    addTodolistAC,
    removeTodolistAC,
} from "../todolistsReducer/todolists-reducer";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { TaskType } from "../../components/Todolist/Todolist";
import { tasks } from "../initialState";

export const removeTaskAC = createAction<{
    taskId: string;
    todolistId: string;
}>("REMOVE-TASK");

export const addTaskAC = createAction<{ todolistId: string; title: string }>(
    "ADD-TASK"
);

export const updateTaskTitleAC = createAction<{
    title: string;
    todolistId: string;
    taskId: string;
}>("UPDATE-TASK-TITLE");

export const changeTaskIsDoneAC = createAction<{
    taskId: string;
    todolistId: string;
    isDone: boolean;
}>("CHANGE-TASK-IS-DONE");

const initialState: TasksStateType = tasks;

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(removeTaskAC, (state, action) => {
            const { taskId, todolistId } = action.payload;
            const tasks = state[todolistId];
            if (tasks) {
                state[todolistId] = tasks.filter((task) => task.id !== taskId);
            }
        })
        .addCase(addTaskAC, (state, action) => {
            const { title, todolistId } = action.payload;
            const newTask: TaskType = {
                id: v1(),
                title,
                isDone: false,
            };
            if (state[todolistId]) {
                state[todolistId].push(newTask);
            } else {
                state[todolistId] = [newTask];
            }
        })
        .addCase(updateTaskTitleAC, (state, action) => {
            const { title, todolistId, taskId } = action.payload;
            const task = state[todolistId].find((t) => t.id === taskId);
            if (task) {
                task.title = title;
            }
        })
        .addCase(changeTaskIsDoneAC, (state, action) => {
            const { todolistId, taskId, isDone } = action.payload;
            const task = state[todolistId].find((t) => t.id === taskId);
            if (task) {
                task.isDone = isDone;
            }
        })
        .addCase(addTodolistAC, (state, action) => {
            const { id } = action.payload;
            state[id] = [];
        })
        .addCase(removeTodolistAC, (state, action) => {
            const { id } = action.payload;
            delete state[id];
        });
});
