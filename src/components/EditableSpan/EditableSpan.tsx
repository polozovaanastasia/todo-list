import { useState } from "react";

type EditableSpanPropsType = {
    title: string;
    onChange: (newTaskTitle: string) => void;
};

const EditableSpan = ({ title, onChange }: EditableSpanPropsType) => {
    let [newTitle, setNewTitle] = useState(title);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const activateViewMode = () => {
        const trimmedTitle = newTitle.trim();
        onChange(trimmedTitle);
        setNewTitle(trimmedTitle);
        setEditMode(false);
    };

    const changeTaskTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    };

    // const setTaskTitleValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.ctrlKey && e.key === "Enter") {
    //         newItemTitle = newItemTitle.trim();

    //         if (newItemTitle === "") {
    //             setError("Task Title cannot be empty.");
    //             return;
    //         }
    //         setNewitemTitle(newItemTitle);
    //         setEditMode(false);
    //     }
    // };

    return (
        <span>
            {editMode ? (
                <>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={changeTaskTitleValue}
                        // onKeyUp={setTaskTitleValue}
                        onBlur={activateViewMode}
                        autoFocus
                    />
                    {error && <div className="error-message">{error}</div>}
                </>
            ) : (
                <span onDoubleClick={activateEditMode}>{newTitle}</span>
            )}
        </span>
    );
};

export default EditableSpan;
