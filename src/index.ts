import dotenv from "dotenv";

dotenv.config();

/**
 * Enumeration of log states.
 */
export enum LogState {
  DEFAULT = "DEFAULT",
  DEBUGMODE = "DEBUGMODE",
}

/**
 * Object containing log state methods.
 */
const logStates = {
  [LogState.DEFAULT]: (message: string): void => {
    if (process.env.NODE_ENV !== "production") {
      console.log(message);
    }
  },
  [LogState.DEBUGMODE]: (message: string): void => {
    if (
      process.env.NODE_ENV !== "production" &&
      process.env.DEV_MODE === "debug"
    ) {
      console.log(`DEBUG - ${message}`);
    }
  },
};

/**
 * ANSI escape codes for colors.
 */
const colors = {
  blue: "\x1b[34m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  black: "\x1b[30m",
  brightBlue: "\x1b[94m",
  brightGreen: "\x1b[92m",
  brightRed: "\x1b[91m",
  brightMagenta: "\x1b[95m",
  brightYellow: "\x1b[93m",
  brightCyan: "\x1b[96m",
  brightWhite: "\x1b[97m",
  brightBlack: "\x1b[90m",
  reset: "\x1b[0m",
};

/**
 * Formats a message with a specified color and header.
 * @param color - The ANSI color code.
 * @param message - The message to format.
 * @param header - The header for the message.
 * @returns The formatted message.
 */
const formatMessage = (
  color: string,
  message: string,
  header: string
): string => {
  return `${color}[${header}] ${message}${colors.reset}`;
};

/**
 * Logs a formatted message in a specified color and state.
 * @param message - The message to log.
 * @param header - The header for the message.
 * @param color - The ANSI color code.
 * @param state - The logging state.
 */
const logInColor = (
  message: string,
  header: string,
  color: string,
  state: LogState
): void => {
  logStates[state](formatMessage(color, message, header));
};

/**
 * Creates a logging function for a specific color.
 * @param color - The ANSI color code.
 * @returns The logging function.
 */
const createLogger =
  (color: string) =>
  (
    message: string,
    header: string = "tralseDb",
    state: LogState = LogState.DEFAULT
  ): void => {
    logInColor(message, header, color, state);
  };

/**
 * Exported logging functions.
 * @example
 * ```typescript
 * import dotenv from "dotenv";
 * import { log } from "@tralse/developer-logs";
 *
 * dotenv.config();
 *
 * // Logs in blue, and uses default header.
 * log.blue("This is a blue message");
 *
 * // Logs in green, and uses header CustomHeader
 * log.green("This is a green message", "CustomHeader");
 *
 * // Logs in red with a header CustomHeader, but only executes when DEV_MODE is set to debug.
 * log.red("This is a red message", "CustomHeader", "DEBUGMODE");
 *
 * // Logs in magenta, uses default header.
 * log.magenta("This is a magenta message");
 * ```
 */
export const log = {
  blue: createLogger(colors.blue),
  green: createLogger(colors.green),
  red: createLogger(colors.red),
  magenta: createLogger(colors.magenta),
  yellow: createLogger(colors.yellow),
  cyan: createLogger(colors.cyan),
  white: createLogger(colors.white),
  black: createLogger(colors.black),
  brightBlue: createLogger(colors.brightBlue),
  brightGreen: createLogger(colors.brightGreen),
  brightRed: createLogger(colors.brightRed),
  brightMagenta: createLogger(colors.brightMagenta),
  brightYellow: createLogger(colors.brightYellow),
  brightWhite: createLogger(colors.brightWhite),
  brightCyan: createLogger(colors.brightCyan),
  brightBlack: createLogger(colors.brightBlack),
};
