import { useState } from "react";
import { ErrorMessageValues } from "../../utils/errorMessages";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
    errorMessage: ErrorMessageValues;
};

function AddItemForm({ addItem, errorMessage }: AddItemFormPropsType) {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<null | string>(null);

    const onNewTitleChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === "Enter") {
            setError(null);
            addHandler();
        }
    };

    const onFocusHandler = () => {
        setError(null);
    };

    const addHandler = () => {
        title = title.trim();

        if (title === "") {
            setError(errorMessage);
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
                onFocus={onFocusHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default AddItemForm;
