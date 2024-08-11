import { useState } from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

function AddItemForm({ addItem }: AddItemFormPropsType) {
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
            addHandler();
        }
    };

    const addHandler = () => {
        title = title.trim();

        if (title === "") {
            setError("Task Title is required");
            return;
        }
        addItem(title);
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
