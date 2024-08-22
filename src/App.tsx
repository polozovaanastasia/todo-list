import Todolist, { TaskType } from "./components/Todolist/Todolist";
import "./App.css";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import { ERROR_MESSAGES } from "./utils/errorMessages";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    updateTodolistAC,
} from "./state/todolistsReducer/todolists-reducer";
import {
    addTaskAC,
    changeTaskIsDoneAC,
    removeTaskAC,
    updateTaskTitleAC,
} from "./state/taskReducer/tasks-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";

export type FilterValuesType = "all" | "active" | "done";
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

function AppWithRedux() {
    const dispatch = useDispatch();

    const tasks = useSelector((state: AppRootState) => state.tasks);
    const todolists = useSelector((state: AppRootState) => state.todolists);

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    };

    const removeTodolist = (id: string) => {
        const action = removeTodolistAC({ id });
        dispatch(action);
    };

    const updateTodolistTitle = (id: string, title: string) => {
        const action = updateTodolistAC({ id, title });
        dispatch(action);
    };

    const changeFilter = (filter: FilterValuesType, id: string) => {
        const action = changeTodolistFilterAC({ id, filter });
        dispatch(action);
    };

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC({ todolistId, title });
        dispatch(action);
    };

    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC({ taskId, todolistId });
        dispatch(action);
    };

    const updateTaskTitle = (
        newTaskTitle: string,
        taskId: string,
        todolistId: string
    ) => {
        const action = updateTaskTitleAC({
            title: newTaskTitle,
            todolistId,
            taskId,
        });
        dispatch(action);
    };

    const changeTaskIsDone = (
        taskId: string,
        isDone: boolean,
        todolistId: string
    ) => {
        const action = changeTaskIsDoneAC({ taskId, todolistId, isDone });
        dispatch(action);
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

export default AppWithRedux;
