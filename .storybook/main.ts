import type { StorybookConfig } from "@storybook/react-webpack5";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["..\\public"],
  webpackFinal: async (config) => {
    if (config.module?.rules) {
      const rules = config.module.rules as Array<any>;
      config.module.rules = rules.map((rule: any) => {
        if (rule && typeof rule === 'object' && rule.use && Array.isArray(rule.use)) {
          rule.use = rule.use.map((useRule: any) => {
            if (useRule && typeof useRule === 'object' && useRule.loader && useRule.loader.includes('react-refresh')) {
              return {
                ...useRule,
                options: {
                  ...(useRule.options || {}),
                  sourceMap: false
                }
              };
            }
            return useRule;
          });
        }
        return rule;
      });
    }
    return {
      ...config,
      devtool: false
    };
  }
};
export default config;
