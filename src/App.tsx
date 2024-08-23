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
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(
        (state) => state.todolists
    );

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    };

    const removeTodolist = (id: string) => {
        const action = removeTodolistAC({ id });
        dispatch(action);
    };

    const updateTodolistTitle = (id: string, title: string) => {
        const action = updateTodolistAC({ id, title });
        dispatch(action);
    };

    const changeFilter = (filter: FilterValuesType, id: string) => {
        const action = changeTodolistFilterAC({ id, filter });
        dispatch(action);
    };

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
