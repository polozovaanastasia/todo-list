import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../../App";

type ActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | UpdateTodolistActionType
    | ChangeTodolistFilterActionType;

type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST";
    id: string;
};
type AddTodolistActionType = {
    type: "ADD-TODOLIST";
    title: string;
};
type UpdateTodolistActionType = {
    type: "UPDATE-TODOLIST";
    id: string;
    newTitle: string;
};
type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER";
    id: string;
    newFilterValue: FilterValuesType;
};

export const todolistsReducer = (
    state: Array<TodolistType>,
    action: ActionType
) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((tl) => tl.id !== action.id);
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {
                id: v1(),
                title: action.title,
                filter: "all",
            };

            return [...state, newTodolist];
        }
        case "UPDATE-TODOLIST": {
            let todolist = state.find((tl) => tl.id === action.id);
            if (todolist) {
                todolist.title = action.newTitle;
            }
            return [...state];
        }
        case "CHANGE-TODOLIST-FILTER": {
            let todolist = state.find((tl) => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.newFilterValue;
            }
            return [...state];
        }
        default:
            throw new Error("Error");
    }
};

export const removeTodolistAC = (
    todolistId1: string
): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id: todolistId1,
    };
};

export const addTodolistAC = (
    newTodolistTitle: string
): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title: newTodolistTitle,
    };
};

export const updateTodolistAC = (
    todolistId: string,
    newTitle: string
): UpdateTodolistActionType => {
    return {
        type: "UPDATE-TODOLIST",
        id: todolistId,
        newTitle: newTitle,
    };
};

export const changeTodolistFilterAC = (
    todolistId: string,
    newFilterValue: FilterValuesType
): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId,
        newFilterValue: newFilterValue,
    };
};
