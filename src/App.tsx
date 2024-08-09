import { useState } from "react";
import Todolist, { taskType } from "./components/Todolist/Todolist";
import { v1 } from "uuid";
import "./App.css";

export type filterValuesType = "all" | "active" | "done";
type todolistsType = {
    id: string;
    title: string;
    filter: filterValuesType;
};

function App() {
    const removeTask = (taskId: string, todolistId: string) => {
        const updatedTasks = tasksObj[todolistId].filter(
            (task) => task.id !== taskId
        );
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

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {
            id: todolistsId1,
            title: "What to learn",
            filter: "active",
        },
        {
            id: todolistsId2,
            title: "Series",
            filter: "all",
        },
    ]);

    let [tasksObj, setTasks] = useState({
        [todolistsId1]: [
            { id: v1(), title: "Html", isDone: true },
            { id: v1(), title: "Css", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "Redux", isDone: false },
        ],
        [todolistsId2]: [
            { id: v1(), title: "Under the Bridge", isDone: false },
            { id: v1(), title: "Severance", isDone: true },
            { id: v1(), title: "The last of us", isDone: false },
        ],
    });

    return (
        <div className="App">
            {todolists.map((tl) => {
                let tasksForTodoList = tasksObj[tl.id];
                if (tl.filter === "active") {
                    tasksForTodoList = tasksObj[tl.id].filter(
                        (task) => !task.isDone
                    );
                }
                if (tl.filter === "done") {
                    tasksForTodoList = tasksObj[tl.id].filter(
                        (task) => task.isDone
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
                    />
                );
            })}
        </div>
    );
}

export default App;
