import { v1 } from "uuid";
import { tasksStateType } from "../../App";

type actionType =
    | removeTaskActionType
    | addTaskActionType
    | updateTaskTitleActionType
    | changeTaskIsDoneActionType;

type removeTaskActionType = {
    type: "REMOVE-TASK";
    taskId: string;
    todolistId: string;
};
type addTaskActionType = {
    type: "ADD-TASK";
    title: string;
    todolistId: string;
};
type updateTaskTitleActionType = {
    type: "UPDATE-TASK-TITLE";
    title: string;
    taskId: string;
    todolistId: string;
};
type changeTaskIsDoneActionType = {
    type: "CHANGE-TASK-IS-DONE";
    taskId: string;
    todolistId: string;
    isDone: boolean;
};

export const tasksReducer = (state: tasksStateType, action: actionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            {
                const { taskId, todolistId } = action;
                const tasks = state[todolistId];
                const updatedTasks = tasks.filter((task) => task.id !== taskId);
                return { ...state, [todolistId]: updatedTasks };
            }
            break;
        case "ADD-TASK":
            {
                const { title, todolistId } = action;
                let tasks = state[todolistId];
                const newTask = {
                    id: v1(),
                    title: title,
                    isDone: false,
                };
                return { ...state, [todolistId]: [...tasks, newTask] };
            }
            break;
        case "UPDATE-TASK-TITLE":
            {
                const { title, todolistId, taskId } = action;
                let task = state[todolistId].find((t) => t.id === taskId);
                if (task) {
                    task.title = title;
                }
                return { ...state };
            }
            break;
        case "CHANGE-TASK-IS-DONE":
            {
                const { todolistId, taskId, isDone } = action;
                let tasks = state[todolistId];
                const task = tasks.find((task) => task.id === taskId);
                if (task) {
                    task.isDone = isDone;
                    state[todolistId] = [...tasks];
                }
                return { ...state };
            }
            break;
        default:
            throw new Error("Error");
    }
};
