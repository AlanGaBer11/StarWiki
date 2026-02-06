import chalk from "chalk";

export const logger = {
  success: (...args) => console.log(chalk.green.bold(...args)),
  error: (...args) => console.error(chalk.red.bold.underline(...args)),
  warning: (...args) => console.warn(chalk.yellow(...args)),
  info: (...args) => console.info(chalk.blue(...args)),
  debug: (...args) => console.debug(chalk.magenta(...args)),
};
