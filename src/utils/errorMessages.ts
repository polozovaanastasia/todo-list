export const ERROR_MESSAGES = {
    EMPTY_TASK_TITLE: "Task title cannot be empty.",
    EMPTY_TODOLIST_TITLE: "To-do list title cannot be empty.",
} as const;

export type ErrorMessages = typeof ERROR_MESSAGES;
export type ErrorMessageValues =
    (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
