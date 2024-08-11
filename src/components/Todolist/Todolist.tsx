import { filterValuesType } from "../../App";
import AddItemForm from "../AddItemForm/AddItemForm";

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

function Todolist({
    id,
    title,
    tasks,
    removeTask,
    addTask,
    changeFilter,
    changeTaskIsDone,
    filter,
    removeTodolist,
}: propsType) {
    const onAllClickHandler = () => changeFilter("all", id);
    const onActiveClickHandler = () => changeFilter("active", id);
    const onDoneClickHandler = () => changeFilter("done", id);

    const removeTodolistHandler = () => removeTodolist(id);

    const addTaskHandler = (title: string) => {
        addTask(title, id);
    };
    return (
        <div>
            <h3>
                {title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>

            <AddItemForm addItem={addTaskHandler} />

            <ul>
                {tasks.map((task) => {
                    const onRemoveTaskHandler = () => removeTask(task.id, id);
                    const onChangeIsDoneHandler = (
                        e: React.ChangeEvent<HTMLInputElement>
                    ) => changeTaskIsDone(task.id, e.currentTarget.checked, id);
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
                {!tasks.length && (
                    <div className="error-message">
                        No tasks in the selected category
                    </div>
                )}
            </ul>
            <div>
                <button
                    className={filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}
                >
                    All
                </button>
                <button
                    className={filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}
                >
                    Active
                </button>
                <button
                    className={filter === "done" ? "active-filter" : ""}
                    onClick={onDoneClickHandler}
                >
                    Completed
                </button>
            </div>
        </div>
    );
}

export default Todolist;
