import Task from "./Task";
import { ReduxStoreProviderDecorator } from "../../stories/ReduxStoreProviderDecorator";

export default {
    title: "Task Component",
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
};

export const TaskBaseExample = (props: any) => {
    return (
        <>
            <Task
                task={{ id: "1", title: "Severanse", isDone: true }}
                todolistId="12320482048"
            />
            <Task
                task={{ id: "2", title: "The last of us", isDone: false }}
                todolistId="12320482048"
            />
        </>
    );
};
