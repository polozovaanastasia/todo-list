import { useState } from "react";

type AddItemFormPropsType = {
    todolistId?: string;
    addTask: (title: string, todolistId: string) => void;
    createList: (title: string) => void;
};

function AddItemForm({
    todolistId,
    addTask,
    createList,
}: AddItemFormPropsType) {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<null | string>(null);

    const onNewTitleChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.key === "Enter") {
            // addTaskHandler();
            addHandler();
        }
    };

    const addHandler = () => {
        title = title.trim();

        if (title === "") {
            setError("Task Title is required");
            return;
        }

        todolistId ? addTask(title, todolistId) : createList(title);
        setTitle("");
    };

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={onNewTitleChangeHandler}
                onKeyUp={onKeyUpHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default AddItemForm;
