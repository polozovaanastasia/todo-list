import { useState } from "react";
import Todolist, { taskType } from "./components/Todolist/Todolist";
import { v1 } from "uuid";
import "./App.css";

export type filterValuesType = "all" | "active" | "done";

function App() {
    let [tasks, setTasks] = useState<Array<taskType>>([
        { id: v1(), title: "Html", isDone: true },
        { id: v1(), title: "Css", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "Redux", isDone: false },
    ]);

    let [filter, setFilter] = useState<filterValuesType>("all");

    let tasksForTodoList = tasks;
    if (filter === "active") {
        tasksForTodoList = tasks.filter((task) => !task.isDone);
    }
    if (filter === "done") {
        tasksForTodoList = tasks.filter((task) => task.isDone);
    }

    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        };
        setTasks([...tasks, newTask]);
    };

    const changeFilter = (value: filterValuesType) => {
        setFilter(value);
    };

    const changeTaskIsDone = (taskId: string, isDone: boolean) => {
        const task = tasks.find((task) => task.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    };

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
                changeTaskIsDone={changeTaskIsDone}
                filter={filter}
            />
        </div>
    );
}

export default App;
