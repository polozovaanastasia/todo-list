import { action } from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";
import { ERROR_MESSAGES } from "../../utils/errorMessages";

export default {
    title: "EditableSpan Component",
    component: EditableSpan,
};

export const EditableSpanBaseExample = (props: any) => {
    const onChangeCallback = action("Title changed");
    return (
        <>
            <div>
                <EditableSpan
                    title={"Task title"}
                    onChange={onChangeCallback}
                    errorMessage={ERROR_MESSAGES.EMPTY_TODOLIST_TITLE}
                />
            </div>
            <div>
                <EditableSpan
                    title={"Todolist title"}
                    onChange={onChangeCallback}
                    errorMessage={ERROR_MESSAGES.EMPTY_TASK_TITLE}
                />
            </div>
        </>
    );
};
