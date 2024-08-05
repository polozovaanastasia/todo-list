import { useState } from "react";
import { filterValuesType } from "../../App";

export type taskType = {
    id: number;
    title: string;
    isDone: boolean;
};

type propsType = {
    title: string;
    tasks: Array<taskType>;
    removeTask: (id: number) => void;
    addTask: (title: string) => void;
    changeFilter: (value: filterValuesType) => void;
};

function Todolist(props: propsType) {
    let initInputValue = "";
    let [inputValue, setInputValue] = useState(initInputValue);

    const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const addTask = () => {
        props.addTask(inputValue);
        setInputValue("");
    };

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={onChangeInputValue}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={() => {}}
                        />
                        <span>{task.title}</span>
                        <button onClick={() => props.removeTask(task.id)}>
                            x
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>
                    Active
                </button>
                <button onClick={() => props.changeFilter("completed")}>
                    Completed
                </button>
            </div>
        </div>
    );
}

export default Todolist;
