import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../../App";
import { todolists } from "../initialState";
import { createAction, createReducer } from "@reduxjs/toolkit";

const prepareAddTodolistPayload = (title: string) => ({
    payload: {
        title,
        id: v1(),
    },
});

export const addTodolistAC = createAction(
    "ADD-TODOLIST",
    prepareAddTodolistPayload
);
export const removeTodolistAC = createAction<{
    id: string;
}>("REMOVE-TODOLIST");

export const updateTodolistAC = createAction<{
    id: string;
    title: string;
}>("UPDATE-TODOLIST");

export const changeTodolistFilterAC = createAction<{
    id: string;
    filter: FilterValuesType;
}>("CHANGE-TODOLIST-FILTER");

const initialState: Array<TodolistType> = todolists;

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(removeTodolistAC, (state, action) => {
            return state.filter((tl) => tl.id !== action.payload.id);
        })
        .addCase(addTodolistAC, (state, action) => {
            const { title, id } = action.payload;
            let newTodolist: TodolistType = {
                id: id,
                title: title,
                filter: "all",
            };
            state.push(newTodolist);
            console.log(JSON.parse(JSON.stringify(state)));
        })
        .addCase(updateTodolistAC, (state, action) => {
            const { id, title } = action.payload;
            const todolist = state.find((tl) => tl.id === id);
            if (todolist) {
                todolist.title = title;
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const { id, filter } = action.payload;
            const todolist = state.find((tl) => tl.id === id);
            if (todolist) {
                todolist.filter = filter;
            }
        });
});
