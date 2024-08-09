import { useState } from "react";
import { filterValuesType } from "../../App";

export type taskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type propsType = {
    id: string;
    title: string;
    tasks: Array<taskType>;
    removeTask: (id: string, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeFilter: (value: filterValuesType, todolistId: string) => void;
    changeTaskIsDone: (id: string, isDone: boolean, todolistId: string) => void;
    filter: filterValuesType;
    removeTodolist: (todolistId: string) => void;
};

function Todolist(props: propsType) {
    let [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<null | string>(null);

    const addTask = () => {
        newTaskTitle = newTaskTitle.trim();

        if (newTaskTitle === "") {
            setError("Task Title is required");
            return;
        }
        props.addTask(newTaskTitle, props.id);
        setNewTaskTitle("");
    };

    const onNewTaskTitleChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onAddTaskKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.key === "Enter") {
            addTask();
        }
    };

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onDoneClickHandler = () => props.changeFilter("done", props.id);

    const removeTodolistHandler = () => props.removeTodolist(props.id);

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <div>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={onNewTaskTitleChangeHandler}
                    onKeyUp={onAddTaskKeyUp}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map((task) => {
                    const onRemoveTaskHandler = () =>
                        props.removeTask(task.id, props.id);
                    const onChangeIsDoneHandler = (
                        e: React.ChangeEvent<HTMLInputElement>
                    ) =>
                        props.changeTaskIsDone(
                            task.id,
                            e.currentTarget.checked,
                            props.id
                        );
                    return (
                        <li
                            key={task.id}
                            className={
                                task.isDone ? "task__status_is-done" : ""
                            }
                        >
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={onChangeIsDoneHandler}
                            />
                            <span>{task.title}</span>
                            <button onClick={onRemoveTaskHandler}>x</button>
                        </li>
                    );
                })}
                {!props.tasks.length && (
                    <div className="error-message">
                        No tasks in the selected category
                    </div>
                )}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}
                >
                    All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}
                >
                    Active
                </button>
                <button
                    className={props.filter === "done" ? "active-filter" : ""}
                    onClick={onDoneClickHandler}
                >
                    Completed
                </button>
            </div>
        </div>
    );
}

export default Todolist;
