import { v1 } from "uuid";
import { TasksStateType, TodolistType } from "../App";

export const todolistId1 = v1();
export const todolistsId2 = v1();

export const tasks: TasksStateType = {
    [todolistId1]: [
        { id: v1(), title: "Html", isDone: true },
        { id: v1(), title: "Css", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistsId2]: [
        { id: v1(), title: "Under the Bridge", isDone: false },
        { id: v1(), title: "Severanse", isDone: true },
        { id: v1(), title: "The last of us", isDone: false },
    ],
};

export const todolists: Array<TodolistType> = [
    {
        id: todolistId1,
        title: "What to learn",
        filter: "active",
    },
    {
        id: todolistsId2,
        title: "TV series",
        filter: "all",
    },
];
