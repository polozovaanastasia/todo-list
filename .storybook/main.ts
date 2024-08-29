import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/preset-create-react-app",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        {
            name: "@storybook/addon-storysource",
            options: {
                loaderOptions: {
                    injectStoryParameters: false,
                },
            },
        },
        "@chromatic-com/storybook"
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    staticDirs: ["../public"],
};

export default config;
