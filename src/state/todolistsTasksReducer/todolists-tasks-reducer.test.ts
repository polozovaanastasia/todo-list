import { TasksStateType, TodolistType } from "../../App";
import { tasksReducer } from "../taskReducer/tasks-reducer";
import {
    addTodolistAC,
    todolistsReducer,
} from "../todolistsReducer/todolists-reducer";

test("ids should be equals", () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC("New Todolist Title");
    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.id);
    expect(idFromTodolists).toBe(action.payload.id);
});
