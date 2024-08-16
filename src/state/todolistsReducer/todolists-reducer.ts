import { v1 } from "uuid";
import { todolistType } from "../../App";

type actionType =
    | removeTodolistActionType
    | addTodolistActionType
    | updateTodolistActionType
    | changeTodolistFilterActionType;

type removeTodolistActionType = {
    type: "REMOVE-TODOLIST";
    id: string;
};
type addTodolistActionType = {
    type: "ADD-TODOLIST";
    title: string;
};
type updateTodolistActionType = {
    type: "UPDATE-TODOLIST";
    id: string;
    newTitle: string;
};
type changeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER";
    id: string;
    newFilterValue: "all" | "active" | "done";
};

export const todolistsReducer = (
    state: Array<todolistType>,
    action: actionType
) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            {
                return state.filter((tl) => tl.id !== action.id);
            }
            break;
        case "ADD-TODOLIST":
            {
                let newTodolist: todolistType = {
                    id: v1(),
                    title: action.title,
                    filter: "all",
                };

                return [...state, newTodolist];
            }
            break;
        case "UPDATE-TODOLIST":
            {
                let todolist = state.find((tl) => tl.id === action.id);
                if (todolist) {
                    todolist.title = action.newTitle;
                }
                return [...state];
            }
            break;
        case "CHANGE-TODOLIST-FILTER":
            {
                let todolist = state.find((tl) => tl.id === action.id);
                if (todolist) {
                    todolist.filter = action.newFilterValue;
                }
                return [...state];
            }
            break;
        default:
            throw new Error("Error");
    }
};
