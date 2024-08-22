import {
    addTaskAC,
    changeTaskIsDoneAC,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC,
} from "./tasks-reducer";
import { v1 } from "uuid";
import { TasksStateType } from "../../App";
import {
    addTodolistAC,
    removeTodolistAC,
} from "../todolistsReducer/todolists-reducer";

test("correct task should be removed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let taskId1 = v1();
    let taskId2 = v1();
    let taskId3 = v1();
    let taskId4 = v1();

    const startState: TasksStateType = {
        [todolistId1]: [
            { id: taskId1, title: "Html", isDone: true },
            { id: taskId2, title: "Css", isDone: true },
        ],
        [todolistId2]: [
            { id: taskId3, title: "Under the Bridge", isDone: false },
            { id: taskId4, title: "Severanse", isDone: true },
        ],
    };

    const endState = tasksReducer(
        startState,
        removeTaskAC({ taskId: taskId1, todolistId: todolistId1 })
    );

    expect(endState[todolistId1].length).toBe(1);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1].every((t) => t.id != taskId1)).toBeTruthy();
});

test("correct task should be added", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let taskId1 = v1();
    let taskId2 = v1();
    let taskId3 = v1();

    const newTaskTitle = "Severanse";

    const startState: TasksStateType = {
        [todolistId1]: [
            { id: taskId1, title: "Html", isDone: true },
            { id: taskId2, title: "Css", isDone: true },
        ],
        [todolistId2]: [
            { id: taskId3, title: "Under the Bridge", isDone: false },
        ],
    };

    const endState = tasksReducer(
        startState,
        addTaskAC({ todolistId: todolistId2, title: newTaskTitle })
    );

    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId2][1].title).toBe(newTaskTitle);
    expect(endState[todolistId2][1].id).toBeDefined();
    expect(endState[todolistId2][1].isDone).toBeDefined();
});

test("correct task title should be updated", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let taskId1 = v1();
    let taskId2 = v1();
    let taskId3 = v1();

    const newTaskTitle = "Redux";

    const startState: TasksStateType = {
        [todolistId1]: [
            { id: taskId1, title: "Html", isDone: true },
            { id: taskId2, title: "Css", isDone: true },
        ],
        [todolistId2]: [
            { id: taskId3, title: "Under the Bridge", isDone: false },
        ],
    };

    const endState = tasksReducer(
        startState,
        updateTaskTitleAC({
            title: newTaskTitle,
            todolistId: todolistId1,
            taskId: taskId1,
        })
    );

    expect(endState[todolistId1][0].title).toBe(newTaskTitle);
    expect(endState[todolistId1][1].title).toBe("Css");
    expect(endState[todolistId2][0].title).toBe("Under the Bridge");
});

test("correct task is done status should be changed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let taskId1 = v1();
    let taskId2 = v1();
    let taskId3 = v1();

    const startState: TasksStateType = {
        [todolistId1]: [
            { id: taskId1, title: "Html", isDone: true },
            { id: taskId2, title: "Css", isDone: true },
        ],
        [todolistId2]: [
            { id: taskId3, title: "Under the Bridge", isDone: true },
        ],
    };

    const endState = tasksReducer(
        startState,
        changeTaskIsDoneAC({
            taskId: taskId1,
            todolistId: todolistId1,
            isDone: false,
        })
    );

    expect(endState[todolistId1][0].isDone).toBeFalsy();
    expect(endState[todolistId1][1].isDone).toBeTruthy();
    expect(endState[todolistId2][0].isDone).toBeTruthy();
});

test("new tasks array should be added when new todolist added", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let taskId1 = v1();
    let taskId2 = v1();
    let taskId3 = v1();

    const newTodolistTitle = "New Todolist";

    const startState: TasksStateType = {
        [todolistId1]: [
            { id: taskId1, title: "Html", isDone: true },
            { id: taskId2, title: "Css", isDone: true },
        ],
        [todolistId2]: [
            { id: taskId3, title: "Under the Bridge", isDone: true },
        ],
    };

    const endState = tasksReducer(startState, addTodolistAC(newTodolistTitle));
    const keys = Object.keys(endState);
    const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2);
    if (!newKey) {
        throw Error("new key should be added");
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let taskId1 = v1();
    let taskId2 = v1();
    let taskId3 = v1();

    const startState: TasksStateType = {
        [todolistId1]: [
            { id: taskId1, title: "Html", isDone: true },
            { id: taskId2, title: "Css", isDone: true },
        ],
        [todolistId2]: [
            { id: taskId3, title: "Under the Bridge", isDone: true },
        ],
    };

    const endState = tasksReducer(
        startState,
        removeTodolistAC({ id: todolistId1 })
    );
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todolistId1]).toBeUndefined();
});
