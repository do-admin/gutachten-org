/**
 * Logger utility that only logs in development mode
 * In production, all logging is disabled to prevent console output
 */

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Logs a message (only in development)
 */
export const log = (...args: unknown[]): void => {
  if (isDevelopment) {
    console.log(...args);
  }
};

/**
 * Logs an error (only in development)
 */
export const error = (...args: unknown[]): void => {
  if (isDevelopment) {
    console.error(...args);
  }
};

/**
 * Logs a warning (only in development)
 */
export const warn = (...args: unknown[]): void => {
  if (isDevelopment) {
    console.warn(...args);
  }
};

/**
 * Logs an info message (only in development)
 */
export const info = (...args: unknown[]): void => {
  if (isDevelopment) {
    console.info(...args);
  }
};

/**
 * Logs a debug message (only in development)
 */
export const debug = (...args: unknown[]): void => {
  if (isDevelopment) {
    console.debug(...args);
  }
};

/**
 * Creates a console group (only in development)
 */
export const group = (label?: string): void => {
  if (isDevelopment) {
    console.group(label);
  }
};

/**
 * Ends a console group (only in development)
 */
export const groupEnd = (): void => {
  if (isDevelopment) {
    console.groupEnd();
  }
};

/**
 * Default export with all logging methods
 */
const logger = {
  log,
  error,
  warn,
  info,
  debug,
  group,
  groupEnd,
};

export default logger;
