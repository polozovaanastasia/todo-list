import {
    addTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer,
    updateTodolistAC,
} from "./todolists-reducer";
import { v1 } from "uuid";
import { TodolistType } from "../../App";

test("correct todolist should be removed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(
        startState,
        removeTodolistAC(todolistId1)
    );

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(
        startState,
        addTodolistAC(newTodolistTitle)
    );

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");
});

test("correct todolist title should be updated", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTitle = "What to watch";
    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(
        startState,
        updateTodolistAC(todolistId2, newTitle)
    );

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTitle);
});

test("correct todolist filter should be changed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newFilterValue = "active";
    const startState: Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(
        startState,
        changeTodolistFilterAC(todolistId2, newFilterValue)
    );

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilterValue);
});
