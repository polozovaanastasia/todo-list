import { v1 } from "uuid";
import { TasksStateType } from "../../App";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
} from "../todolistsReducer/todolists-reducer";

type ActionType =
    | RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskTitleActionType
    | ChangeTaskIsDoneActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;

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
            const stateCopy = { ...state };
            const { taskId, todolistId } = action;
            const tasks = stateCopy[todolistId];
            const filteredTasks = tasks.filter((task) => task.id !== taskId);
            stateCopy[todolistId] = filteredTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = { ...state };
            const { title, todolistId } = action;
            const tasks = stateCopy[todolistId];
            const newTask = {
                id: v1(),
                title: title,
                isDone: false,
            };
            stateCopy[todolistId] = [...tasks, newTask];
            return stateCopy;
        }
        case "UPDATE-TASK-TITLE": {
            const stateCopy = { ...state };
            const { title, todolistId, taskId } = action;
            let task = stateCopy[todolistId].find((t) => t.id === taskId);
            if (task) {
                task.title = title;
            }
            return stateCopy;
        }
        case "CHANGE-TASK-IS-DONE": {
            const stateCopy = { ...state };
            const { todolistId, taskId, isDone } = action;
            const tasks = stateCopy[todolistId];
            const task = tasks.find((task) => task.id === taskId);
            if (task) {
                task.isDone = isDone;
                state[todolistId] = [...tasks];
            }
            return stateCopy;
        }
        case "ADD-TODOLIST": {
            const stateCopy = { ...state };
            stateCopy[action.id] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = { ...state };
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            return state;
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
