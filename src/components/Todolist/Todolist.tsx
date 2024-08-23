import { FilterValuesType } from "../../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import { ERROR_MESSAGES } from "../../utils/errorMessages";
import {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    IconButton,
    SvgIcon,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "../../state/store";
import {
    addTaskAC,
    changeTaskIsDoneAC,
    removeTaskAC,
    updateTaskTitleAC,
} from "../../state/taskReducer/tasks-reducer";

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
    updateTodolistTitle: (todolistTitle: string, todolistId: string) => void;
    changeFilter: (filter: FilterValuesType, todolistId: string) => void;
};

function Todolist({
    id,
    title,
    filter,
    removeTodolist,
    updateTodolistTitle,
    changeFilter,
}: PropsType) {
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

    const onAllClickHandler = () => changeFilter("all", id);
    const onActiveClickHandler = () => changeFilter("active", id);
    const onDoneClickHandler = () => changeFilter("done", id);

    const removeTodolistHandler = () => removeTodolist(id);

    const updateTodolistTitleHandler = (todolistTitle: string) => {
        updateTodolistTitle(todolistTitle, id);
    };

    const addTask = (taskTitle: string) => {
        const action = addTaskAC({ todolistId: id, title: taskTitle });
        dispatch(action);
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
                            errorMessage={ERROR_MESSAGES.EMPTY_TODOLIST_TITLE}
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
                        {tasksForTodolist.map((task) => {
                            const removeTask = () => {
                                const action = removeTaskAC({
                                    taskId: task.id,
                                    todolistId: id,
                                });
                                dispatch(action);
                            };
                            const changeTaskIsDone = (
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                const action = changeTaskIsDoneAC({
                                    taskId: task.id,
                                    todolistId: id,
                                    isDone: e.currentTarget.checked,
                                });
                                dispatch(action);
                            };

                            const updateTaskTitle = (newTaskTitle: string) => {
                                const action = updateTaskTitleAC({
                                    title: newTaskTitle,
                                    todolistId: id,
                                    taskId: task.id,
                                });
                                dispatch(action);
                            };
                            return (
                                <li
                                    key={task.id}
                                    className={`task ${
                                        task.isDone ? "task_status-is-done" : ""
                                    }`}
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
                                        errorMessage={
                                            ERROR_MESSAGES.EMPTY_TASK_TITLE
                                        }
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
                        })}
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
                                filter === "active" ? "contained" : "outlined"
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

export default Todolist;
