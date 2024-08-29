import { ERROR_MESSAGES } from "../../utils/errorMessages";
import AddItemForm from "./AddItemForm";
import { action } from "@storybook/addon-actions";

export default {
    title: "AddItemForm Component",
    component: AddItemForm,
};

export const AddItemFormBaseExample = (props: any) => {
    const callback = action("Button");
    return (
        <AddItemForm
            addItem={callback}
            errorMessage={ERROR_MESSAGES.EMPTY_TASK_TITLE}
        />
    );
};
