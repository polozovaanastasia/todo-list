import { useState } from "react";
import { filterValuesType } from "../../App";

export type taskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type propsType = {
    title: string;
    tasks: Array<taskType>;
    removeTask: (id: string) => void;
    addTask: (title: string) => void;
    changeFilter: (value: filterValuesType) => void;
    changeTaskIsDone: (id: string) => void;
};

function Todolist(props: propsType) {
    let initInputValue = "";
    const [newTaskTitle, setNewTaskTitle] = useState(initInputValue);

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    };

    const onNewTaskTitleChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onAddTaskKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === "Enter") {
            addTask();
        }
    };

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onDoneClickHandler = () => props.changeFilter("done");

    // const onChangeIsDoneHandler = () => {
    //     props.changeTaskIsDone(task.id);
    // }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={onNewTaskTitleChangeHandler}
                    onKeyUp={onAddTaskKeyUp}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    const onRemoveTaskHandler = () => props.removeTask(task.id);
                    const onChangeIsDoneHandler = () =>
                        props.changeTaskIsDone(task.id);
                    return (
                        <li key={task.id}>
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
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onDoneClickHandler}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;
