import { filterValuesType } from "../../App";
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
    updateTaskTitle: (
        taskTitle: string,
        taskId: string,
        todolistId: string
    ) => void;
    updateTodolistTitle: (todolistTitle: string, todolistId: string) => void;
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
    updateTaskTitle,
    updateTodolistTitle,
}: propsType) {
    const onAllClickHandler = () => changeFilter("all", id);
    const onActiveClickHandler = () => changeFilter("active", id);
    const onDoneClickHandler = () => changeFilter("done", id);

    const removeTodolistHandler = () => removeTodolist(id);

    const updateTodolistTitleHandler = (todolistTitle: string) => {
        updateTodolistTitle(todolistTitle, id);
    };

    const addTaskHandler = (title: string) => {
        addTask(title, id);
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
                        addItem={addTaskHandler}
                        errorMessage={ERROR_MESSAGES.EMPTY_TASK_TITLE}
                    />
                    <ul className="todolist__task-list">
                        {tasks.map((task) => {
                            const onRemoveTaskHandler = () =>
                                removeTask(task.id, id);
                            const onChangeIsDoneHandler = (
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                changeTaskIsDone(
                                    task.id,
                                    e.currentTarget.checked,
                                    id
                                );

                            const onChangeTaskTitleHandler = (
                                newTackTitle: string
                            ) => {
                                updateTaskTitle(newTackTitle, task.id, id);
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
                                        onChange={onChangeIsDoneHandler}
                                        sx={{
                                            paddingLeft: 0,
                                        }}
                                    />
                                    <EditableSpan
                                        title={task.title}
                                        onChange={onChangeTaskTitleHandler}
                                        errorMessage={
                                            ERROR_MESSAGES.EMPTY_TASK_TITLE
                                        }
                                    />

                                    <IconButton
                                        color="primary"
                                        aria-label="Delete"
                                        onClick={onRemoveTaskHandler}
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
