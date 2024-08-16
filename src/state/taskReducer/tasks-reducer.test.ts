import {
    addTaskAC,
    changeTaskIsDoneAC,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC,
} from "./tasks-reducer";
import { v1 } from "uuid";
import { TasksStateType } from "../../App";

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
        removeTaskAC(taskId1, todolistId1)
    );

    expect(endState[todolistId1].length).toBe(1);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1][0].id).toBe(taskId2);
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
        addTaskAC(todolistId2, newTaskTitle)
    );

    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1].length).toBe(2);
    expect(endState[todolistId2][1].title).toBe(newTaskTitle);
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
        updateTaskTitleAC(newTaskTitle, todolistId1, taskId1)
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
        changeTaskIsDoneAC(taskId1, todolistId1, false)
    );

    expect(endState[todolistId1][0].isDone).toBe(false);
    expect(endState[todolistId1][1].isDone).toBe(true);
    expect(endState[todolistId2][0].isDone).toBe(true);
});
