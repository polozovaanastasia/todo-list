import { useState } from "react";
import Todolist, { taskType } from "./components/Todolist/Todolist";
import { v1 } from "uuid";
import "./App.css";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import { ERROR_MESSAGES } from "./utils/errorMessages";

export type filterValuesType = "all" | "active" | "done";
type todolistType = {
    id: string;
    title: string;
    filter: filterValuesType;
};

type tasksStateType = {
    [key: string]: Array<taskType>;
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

    const changeFilter = (value: filterValuesType, todolistId: string) => {
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

    const todolistsId1 = v1();
    const todolistsId2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistType>>([
        {
            id: todolistsId1,
            title: "What to learn",
            filter: "active",
        },
        {
            id: todolistsId2,
            title: "TV series",
            filter: "all",
        },
    ]);

    let [tasksObj, setTasks] = useState<tasksStateType>({
        [todolistsId1]: [
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
        let newTodolist: todolistType = {
            id: v1(),
            title: title,
            filter: "all",
        };
        setTodolists([...todolists, newTodolist]);
        setTasks({ ...tasksObj, [newTodolist.id]: [] }); // я не понимаю этот синтаксис.
    };

    return (
        <div className="app">
            <div>
                <h2>Add a new to-do list:</h2>
                <AddItemForm
                    addItem={addTodolist}
                    errorMessage={ERROR_MESSAGES.EMPTY_TODOLIST_TITLE}
                />
            </div>
            {todolists.map((tl) => {
                let tasksForTodoList = tasksObj[tl.id];
                if (tl.filter === "active") {
                    tasksForTodoList = tasksObj[tl.id].filter(
                        (task: taskType) => !task.isDone
                    );
                }
                if (tl.filter === "done") {
                    tasksForTodoList = tasksObj[tl.id].filter(
                        (task: taskType) => task.isDone
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
    );
}

export default App;
