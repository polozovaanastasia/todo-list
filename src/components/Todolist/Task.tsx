import { Checkbox, IconButton, SvgIcon } from "@mui/material";
import { memo, useCallback } from "react";
import EditableSpan from "../EditableSpan/EditableSpan";
import { ERROR_MESSAGES } from "../../utils/errorMessages";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import {
    changeTaskIsDoneAC,
    removeTaskAC,
    updateTaskTitleAC,
} from "../../state/taskReducer/tasks-reducer";
import { TaskType } from "./Todolist";

type TaskPropsType = {
    task: TaskType;
    todolistId: string;
};

const CheckBoxBlankIcon = () => (
    <SvgIcon>
        <svg
            focusable="false"
            aria-hidden="true"
            data-testid="CheckBoxBlankIcon"
        >
            <path
                d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5"
                fill="white"
            ></path>
        </svg>
    </SvgIcon>
);

const Task = memo(({ task, todolistId }: TaskPropsType) => {
    console.log("Task is called");
    const dispatch = useDispatch();

    const removeTask = () => {
        const action = removeTaskAC({
            taskId: task.id,
            todolistId,
        });
        dispatch(action);
    };
    const changeTaskIsDone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const action = changeTaskIsDoneAC({
            taskId: task.id,
            todolistId,
            isDone: e.currentTarget.checked,
        });
        dispatch(action);
    };

    const updateTaskTitle = useCallback(
        (newTaskTitle: string) => {
            const action = updateTaskTitleAC({
                title: newTaskTitle,
                todolistId,
                taskId: task.id,
            });
            dispatch(action);
        },
        [dispatch, todolistId, task.id]
    );

    return (
        <li
            key={task.id}
            className={`task ${task.isDone ? "task_status-is-done" : ""}`}
        >
            <Checkbox
                icon={<CheckBoxBlankIcon />}
                checked={task.isDone}
                onChange={changeTaskIsDone}
                sx={{
                    paddingLeft: 0,
                }}
            />
            <EditableSpan
                title={task.title}
                onChange={updateTaskTitle}
                errorMessage={ERROR_MESSAGES.EMPTY_TASK_TITLE}
            />

            <IconButton
                color="primary"
                aria-label="Delete"
                onClick={removeTask}
            >
                <DeleteOutlineIcon />
            </IconButton>
        </li>
    );
});

export default Task;
