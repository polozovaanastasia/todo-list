import { useState } from "react";
import { ErrorMessageValues } from "../../utils/errorMessages";
import CustomTextField from "../../styles/customComponent/CustomTextField";

type EditableSpanPropsType = {
    title: string;
    onChange: (newTaskTitle: string) => void;
    errorMessage: ErrorMessageValues;
};

const EditableSpan = ({
    title,
    onChange,
    errorMessage,
}: EditableSpanPropsType) => {
    let [newTitle, setNewTitle] = useState(title);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const activateViewMode = () => {
        const trimmedTitle = newTitle.trim();
        if (trimmedTitle === "") {
            setError(errorMessage);
            return;
        }
        onChange(trimmedTitle);
        setNewTitle(trimmedTitle);
        setEditMode(false);
    };

    const changeTaskTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    };

    return (
        <span className={"task-title-container"}>
            {editMode ? (
                <>
                    <CustomTextField
                        value={newTitle}
                        error={!!error}
                        helperText={error}
                        size="small"
                        variant="outlined"
                        onChange={changeTaskTitleValue}
                        onBlur={activateViewMode}
                        autoFocus
                    />
                </>
            ) : (
                <span onDoubleClick={activateEditMode}>{newTitle}</span>
            )}
        </span>
    );
};

export default EditableSpan;
