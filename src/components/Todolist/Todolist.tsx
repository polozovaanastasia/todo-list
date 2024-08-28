import { FilterValuesType } from "../../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import { ERROR_MESSAGES } from "../../utils/errorMessages";
import { Box, Button, ButtonGroup, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "../../state/store";
import { addTaskAC } from "../../state/taskReducer/tasks-reducer";
import { memo, useCallback } from "react";
import Task from "./Task";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    filter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
    updateTodolistTitle: (todolistId: string, todolistTitle: string) => void;
    changeFilter: (filter: FilterValuesType, todolistId: string) => void;
};

const Todolist = memo(
    ({
        id,
        title,
        filter,
        removeTodolist,
        updateTodolistTitle,
        changeFilter,
    }: PropsType) => {
        console.log("Todolist is called");
        const dispatch = useDispatch();

        let tasks = useSelector<AppRootState, Array<TaskType>>(
            (state) => state.tasks[id]
        );

        let allTodolistTasks = tasks;
        let tasksForTodolist = allTodolistTasks;
        if (filter === "active") {
            tasksForTodolist = tasks.filter((task: TaskType) => !task.isDone);
        }
        if (filter === "done") {
            tasksForTodolist = tasks.filter((task: TaskType) => task.isDone);
        }

        const onAllClickHandler = useCallback(
            () => changeFilter("all", id),
            [changeFilter, id]
        );
        const onActiveClickHandler = useCallback(
            () => changeFilter("active", id),
            [changeFilter, id]
        );
        const onDoneClickHandler = useCallback(
            () => changeFilter("done", id),
            [changeFilter, id]
        );

        const removeTodolistHandler = () => removeTodolist(id);

        const updateTodolistTitleHandler = useCallback(
            (todolistTitle: string) => {
                updateTodolistTitle(id, todolistTitle);
            },
            [updateTodolistTitle, id]
        );

        const addTask = useCallback(
            (taskTitle: string) => {
                const action = addTaskAC({ todolistId: id, title: taskTitle });
                dispatch(action);
            },
            [dispatch, id]
        );

        return (
            <Box
                height="auto"
                width={400}
                display="flex"
                p="50px 25px"
                mr={10}
                mb={10}
                sx={{
                    minWidth: "200px",
                    bgcolor: "#282828",
                    borderRadius: "16px",
                }}
            >
                <div className="todolist">
                    <div className="todolist__section">
                        <h3>
                            <EditableSpan
                                title={title}
                                onChange={updateTodolistTitleHandler}
                                errorMessage={
                                    ERROR_MESSAGES.EMPTY_TODOLIST_TITLE
                                }
                            />
                            <IconButton
                                color="primary"
                                aria-label="Delete"
                                onClick={removeTodolistHandler}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        </h3>

                        <AddItemForm
                            addItem={addTask}
                            errorMessage={ERROR_MESSAGES.EMPTY_TASK_TITLE}
                        />
                        <ul className="todolist__task-list">
                            {tasksForTodolist.map((t) => (
                                <Task key={t.id} task={t} todolistId={id} />
                            ))}
                            {!tasks.length && (
                                <div className="error-message">
                                    No tasks in the selected category
                                </div>
                            )}
                        </ul>
                    </div>

                    <div>
                        <ButtonGroup
                            size="small"
                            variant="contained"
                            aria-label="Basic button group"
                        >
                            <Button
                                variant={
                                    filter === "all" ? "contained" : "outlined"
                                }
                                onClick={onAllClickHandler}
                            >
                                All
                            </Button>
                            <Button
                                variant={
                                    filter === "active"
                                        ? "contained"
                                        : "outlined"
                                }
                                onClick={onActiveClickHandler}
                            >
                                Active
                            </Button>
                            <Button
                                variant={
                                    filter === "done" ? "contained" : "outlined"
                                }
                                onClick={onDoneClickHandler}
                            >
                                Completed
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </Box>
        );
    }
);

export default Todolist;
