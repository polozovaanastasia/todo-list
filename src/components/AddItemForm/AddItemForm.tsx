import { memo, useState } from "react";
import { ErrorMessageValues } from "../../utils/errorMessages";
import { Button, TextField } from "@mui/material";
import Add from "@mui/icons-material/Add";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
    errorMessage: ErrorMessageValues;
};

const AddItemForm = memo(({ addItem, errorMessage }: AddItemFormPropsType) => {
    console.log("AddItemForm is called");
    let [title, setTitle] = useState("");
    let [error, setError] = useState<null | string>(null);

    const onNewTitleChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.ctrlKey && e.key === "Enter") {
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
        <div className="item-form">
            <TextField
                value={title}
                error={!!error}
                helperText={error}
                size="small"
                variant="outlined"
                onChange={onNewTitleChangeHandler}
                onKeyUp={onKeyUpHandler}
                onFocus={onFocusHandler}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "#ffffff",
                    },
                }}
            />
            <Button
                size="small"
                variant="contained"
                startIcon={<Add />}
                onClick={addHandler}
            >
                Add
            </Button>
        </div>
    );
});

export default AddItemForm;
