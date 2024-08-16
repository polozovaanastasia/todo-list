import { v1 } from "uuid";
import { TasksStateType } from "../../App";

type ActionType =
    | RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskTitleActionType
    | ChangeTaskIsDoneActionType;

type RemoveTaskActionType = {
    type: "REMOVE-TASK";
    taskId: string;
    todolistId: string;
};
type AddTaskActionType = {
    type: "ADD-TASK";
    title: string;
    todolistId: string;
};
type UpdateTaskTitleActionType = {
    type: "UPDATE-TASK-TITLE";
    title: string;
    taskId: string;
    todolistId: string;
};
type ChangeTaskIsDoneActionType = {
    type: "CHANGE-TASK-IS-DONE";
    taskId: string;
    todolistId: string;
    isDone: boolean;
};

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const { taskId, todolistId } = action;
            const tasks = state[todolistId];
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            return { ...state, [todolistId]: updatedTasks };
        }
        case "ADD-TASK": {
            const { title, todolistId } = action;
            let tasks = state[todolistId];
            const newTask = {
                id: v1(),
                title: title,
                isDone: false,
            };
            return { ...state, [todolistId]: [...tasks, newTask] };
        }
        case "UPDATE-TASK-TITLE": {
            const { title, todolistId, taskId } = action;
            let task = state[todolistId].find((t) => t.id === taskId);
            if (task) {
                task.title = title;
            }
            return { ...state };
        }
        case "CHANGE-TASK-IS-DONE": {
            const { todolistId, taskId, isDone } = action;
            let tasks = state[todolistId];
            const task = tasks.find((task) => task.id === taskId);
            if (task) {
                task.isDone = isDone;
                state[todolistId] = [...tasks];
            }
            return { ...state };
        }
        default:
            throw new Error("Error");
    }
};

export const removeTaskAC = (
    taskId: string,
    todolistId: string
): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK",
        taskId: taskId,
        todolistId: todolistId,
    };
};

export const addTaskAC = (
    todolistId: string,
    newTaskTitle: string
): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        todolistId: todolistId,
        title: newTaskTitle,
    };
};

export const updateTaskTitleAC = (
    newTaskTitle: string,
    todolistId: string,
    taskId: string
): UpdateTaskTitleActionType => {
    return {
        type: "UPDATE-TASK-TITLE",
        title: newTaskTitle,
        todolistId: todolistId,
        taskId: taskId,
    };
};

export const changeTaskIsDoneAC = (
    taskId: string,
    todolistId: string,
    isDone: boolean
): ChangeTaskIsDoneActionType => {
    return {
        type: "CHANGE-TASK-IS-DONE",
        taskId: taskId,
        todolistId: todolistId,
        isDone: isDone,
    };
};
