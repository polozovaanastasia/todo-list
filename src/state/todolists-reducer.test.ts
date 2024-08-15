import { todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { todolistType } from "../App";

test("correct todolist should be removed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<todolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(startState, {
        type: "REMOVE-TODOLIST",
        id: todolistId1,
    });

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTodolist = "New Todolist";

    const startState: Array<todolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(startState, {
        type: "ADD-TODOLIST",
        title: newTodolist,
    });

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolist);
    expect(endState[2].filter).toBe("all");
});

test("correct todolist title should be updated", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTitle = "What to watch";
    const startState: Array<todolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(startState, {
        type: "UPDATE-TODOLIST",
        id: todolistId2,
        newTitle: newTitle,
    });

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTitle);
});

test("correct todolist filter should be changed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const newFilterValue = "active";
    const startState: Array<todolistType> = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" },
    ];

    const endState = todolistsReducer(startState, {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId2,
        newFilterValue: newFilterValue,
    });

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilterValue);
});
