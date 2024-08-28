import Todolist, { TaskType } from "./components/Todolist/Todolist";
import "./App.css";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import { ERROR_MESSAGES } from "./utils/errorMessages";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    updateTodolistAC,
} from "./state/todolistsReducer/todolists-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { useCallback } from "react";

export type FilterValuesType = "all" | "active" | "done";
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

function App() {
    console.log("App is called");
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(
        (state) => state.todolists
    );

    const addTodolist = useCallback(
        (title: string) => {
            const action = addTodolistAC(title);
            dispatch(action);
        },
        [dispatch]
    );

    const removeTodolist = useCallback(
        (id: string) => {
            const action = removeTodolistAC({ id });
            dispatch(action);
        },
        [dispatch]
    );

    const updateTodolistTitle = useCallback(
        (id: string, title: string) => {
            const action = updateTodolistAC({ id, title });
            dispatch(action);
        },
        [dispatch]
    );

    const changeFilter = useCallback(
        (filter: FilterValuesType, id: string) => {
            const action = changeTodolistFilterAC({ id, filter });
            dispatch(action);
        },
        [dispatch]
    );

    return (
        <div className="app">
            <div className="app__todolist-creation">
                <h3>Add a new to-do list:</h3>
                <AddItemForm
                    addItem={addTodolist}
                    errorMessage={ERROR_MESSAGES.EMPTY_TODOLIST_TITLE}
                />
            </div>
            <div className="app__todolists-container">
                {todolists.map((tl) => {
                    return (
                        <Todolist
                            id={tl.id}
                            key={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            updateTodolistTitle={updateTodolistTitle}
                            changeFilter={changeFilter}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default App;
