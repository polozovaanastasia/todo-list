import { useState } from "react";
import Todolist, { TaskType } from "./components/Todolist/Todolist";
import { v1 } from "uuid";
import "./App.css";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import { ERROR_MESSAGES } from "./utils/errorMessages";

export type FilterValuesType = "all" | "active" | "done";
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

function App() {
    const removeTask = (taskId: string, todolistId: string) => {
        const tasks = tasksObj[todolistId];
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        tasksObj[todolistId] = updatedTasks;
        setTasks({ ...tasksObj });
    };

    const addTask = (title: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        };
        tasksObj[todolistId] = [...tasks, newTask];
        setTasks({ ...tasksObj });
    };

    const updateTaskTitle = (
        newTaskTitle: string,
        tackId: string,
        todolistId: string
    ) => {
        let task = tasksObj[todolistId].find((t) => t.id === tackId);
        if (task) {
            task.title = newTaskTitle;
        }
        setTasks({ ...tasksObj });
    };

    const updateTodolistTitle = (
        newTodolistTitle: string,
        todolistId: string
    ) => {
        let todolist = todolists.find((tl) => tl.id === todolistId);
        if (todolist) {
            todolist.title = newTodolistTitle;
        }
        setTodolists([...todolists]);
    };

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find((tl) => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
        }
        setTodolists([...todolists]);
    };

    const changeTaskIsDone = (
        taskId: string,
        isDone: boolean,
        todolistId: string
    ) => {
        let tasks = tasksObj[todolistId];
        const task = tasks.find((task) => task.id === taskId);
        if (task) {
            task.isDone = isDone;
            tasksObj[todolistId] = [...tasks];
            setTasks({ ...tasksObj });
        }
    };

    const todolistId1 = v1();
    const todolistsId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
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
    ]);

    let [tasksObj, setTasks] = useState<TasksStateType>({
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

    const removeTodolist = (todolistId: string) => {
        const filteredTodolists = todolists.filter(
            (tl) => tl.id !== todolistId
        );
        setTodolists([...filteredTodolists]);

        delete tasksObj[todolistId];
        setTasks({ ...tasksObj });
    };

    const addTodolist = (title: string) => {
        let newTodolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "all",
        };
        setTodolists([...todolists, newTodolist]);
        setTasks({ ...tasksObj, [newTodolist.id]: [] });
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
                    let tasksForTodoList = tasksObj[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodoList = tasksObj[tl.id].filter(
                            (task: TaskType) => !task.isDone
                        );
                    }
                    if (tl.filter === "done") {
                        tasksForTodoList = tasksObj[tl.id].filter(
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

export default App;
