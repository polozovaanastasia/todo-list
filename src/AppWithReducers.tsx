import { useReducer } from "react";
import Todolist, { TaskType } from "./components/Todolist/Todolist";
import { v1 } from "uuid";
import "./App.css";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import { ERROR_MESSAGES } from "./utils/errorMessages";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer,
    updateTodolistAC,
} from "./state/todolistsReducer/todolists-reducer";
import {
    addTaskAC,
    changeTaskIsDoneAC,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC,
} from "./state/taskReducer/tasks-reducer";

export type FilterValuesType = "all" | "active" | "done";
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

function AppWithReducers() {
    const todolistId1 = v1();
    const todolistsId2 = v1();

    let [todolists, dispatchToTodolistsReducers] = useReducer(
        todolistsReducer,
        [
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
        ]
    );

    let [tasks, dispatchToTasksReducers] = useReducer(tasksReducer, {
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
    });

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatchToTodolistsReducers(action);
        dispatchToTasksReducers(action);
    };

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatchToTodolistsReducers(action);
        dispatchToTasksReducers(action);
    };

    const updateTodolistTitle = (newTitle: string, todolistId: string) => {
        const action = updateTodolistAC(todolistId, newTitle);
        dispatchToTodolistsReducers(action);
    };

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatchToTodolistsReducers(action);
    };

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(todolistId, title);
        dispatchToTasksReducers(action);
    };

    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId);
        dispatchToTasksReducers(action);
    };

    const updateTaskTitle = (
        newTaskTitle: string,
        tackId: string,
        todolistId: string
    ) => {
        const action = updateTaskTitleAC(newTaskTitle, todolistId, tackId);
        dispatchToTasksReducers(action);
    };

    const changeTaskIsDone = (
        taskId: string,
        isDone: boolean,
        todolistId: string
    ) => {
        const action = changeTaskIsDoneAC(taskId, todolistId, isDone);
        dispatchToTasksReducers(action);
    };

    return (
        <div className="app">
            <div className="app__todolist-creation">
                <h3>Add a new to-do list:</h3>
                <AddItemForm
                    addItem={addTodolist}
                    errorMessage={ERROR_MESSAGES.EMPTY_TODOLIST_TITLE}
                />
            </div>
            <div className="app__todolists-container">
                {todolists.map((tl) => {
                    let tasksForTodoList = tasks[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodoList = tasks[tl.id].filter(
                            (task: TaskType) => !task.isDone
                        );
                    }
                    if (tl.filter === "done") {
                        tasksForTodoList = tasks[tl.id].filter(
                            (task: TaskType) => task.isDone
                        );
                    }

                    return (
                        <Todolist
                            id={tl.id}
                            key={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeFilter={changeFilter}
                            changeTaskIsDone={changeTaskIsDone}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            updateTaskTitle={updateTaskTitle}
                            updateTodolistTitle={updateTodolistTitle}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default AppWithReducers;
