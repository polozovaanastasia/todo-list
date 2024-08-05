import { useState } from "react";
import Todolist, { taskType } from "./components/Todolist/Todolist";

export type filterValuesType = "all" | "active" | "completed";

function App() {
    let [tasks, setTasks] = useState<Array<taskType>>([
        { id: 1, title: "Html", isDone: true },
        { id: 2, title: "Css", isDone: true },
        { id: 3, title: "JS", isDone: true },
        { id: 4, title: "React", isDone: false },
        { id: 5, title: "Redux", isDone: false },
    ]);

    let [filter, setFilter] = useState<filterValuesType>("all");

    let tasksForTodoList = tasks;
    if (filter === "active") {
        tasksForTodoList = tasks.filter((task) => !task.isDone);
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter((task) => task.isDone);
    }

    const removeTask = (taskId: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const addTask = (title: string) => {
        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            title: title,
            isDone: false,
        };
        setTasks([...tasks, newTask]);
    };

    const changeFilter = (value: filterValuesType) => {
        setFilter(value);
    };

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
