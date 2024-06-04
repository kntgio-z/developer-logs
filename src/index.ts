import dotenv from "dotenv";

dotenv.config();

/**
 * Enumeration of log states.
 */
enum LogState {
  DEFAULT = "DEFAULT",
  DEBUGMODE = "DEBUGMODE",
}

/**
 * Object containing log state methods.
 */
const logStates = {
  /**
   * Logs a message if the NODE_ENV is not production.
   * @param message - The message to log.
   */
  [LogState.DEFAULT]: (message: string): void => {
    if (process.env.NODE_ENV !== "production") {
      console.log(message);
    }
  },

  /**
   * Logs a debug message if the NODE_ENV is not production and DEV_MODE is set to 'debug'.
   * @param message - The message to log.
   */
  [LogState.DEBUGMODE]: (message: string): void => {
    if (process.env.NODE_ENV !== "production") {
      if (!process.env.DEV_MODE) {
        console.warn(
          "Cannot use DEBUGMODE when process.env.DEV_MODE is undefined or not set to 'debug'"
        );
        return;
      }
      if (process.env.DEV_MODE === "debug") {
        console.log(`DEBUG - ${message}`);
      }
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
 * Logs a message in blue color.
 * @param message - The message to log.
 * @param header - The header for the message. Default is "tralseDb".
 * @param state - The logging state. Default is LogState.DEFAULT.
 */
const blue = (
  message: string,
  header: string = "tralseDb",
  state: LogState = LogState.DEFAULT
): void => {
  logInColor(message, header, colors.blue, state);
};

/**
 * Logs a message in green color.
 * @param message - The message to log.
 * @param header - The header for the message. Default is "tralseDb".
 * @param state - The logging state. Default is LogState.DEFAULT.
 */
const green = (
  message: string,
  header: string = "tralseDb",
  state: LogState = LogState.DEFAULT
): void => {
  logInColor(message, header, colors.green, state);
};

/**
 * Logs a message in red color.
 * @param message - The message to log.
 * @param header - The header for the message. Default is "tralseDb".
 * @param state - The logging state. Default is LogState.DEFAULT.
 */
const red = (
  message: string,
  header: string = "tralseDb",
  state: LogState = LogState.DEFAULT
): void => {
  logInColor(message, header, colors.red, state);
};

/**
 * Logs a message in magenta color.
 * @param message - The message to log.
 * @param header - The header for the message. Default is "tralseDb".
 * @param state - The logging state. Default is LogState.DEFAULT.
 */
const magenta = (
  message: string,
  header: string = "tralseDb",
  state: LogState = LogState.DEFAULT
): void => {
  logInColor(message, header, colors.magenta, state);
};

/**
 * Exported logging functions.
 * @example
 * ```javascript
 * import dotenv from "dotenv";
 * import { log } from "@tralse/developer-logs";
 *
 * dotenv.config();
 *
 * // Note that these logs can be printed when the process.env.NODE_ENV is set up to `development`.
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
export const log = { blue, green, red, magenta };
