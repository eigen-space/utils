import { LoggingLevelType } from './logger.enum';

interface LoggerOptions {
    basePrefix?: string;
    logLevel?: LoggingLevelType;
    prefix?: string;
}

/**
 * Logger wraps console methods.
 * It adds such bonuses like:
 *      - base prefix, for instance: [bp] ...
 *      - log level, for instance: DEBUG
 *      - prefix, for instance: ... [wa-client] ...
 */
export class Logger {
    private static lastLoggingTimestamp = 0;

    basePrefix: string;
    logLevel: LoggingLevelType;
    prefix: string;

    constructor(options: LoggerOptions = {}) {
        this.basePrefix = options.basePrefix || '';
        this.logLevel = options.logLevel || LoggingLevelType.NONE;
        this.prefix = options.prefix || '';
    }

    /**
     * Method wraps console.log() function.
     *
     * @param args Various array of arguments to log.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(...args: Array<any>): void {
        this.invoke('log', LoggingLevelType.DEBUG, ...args);
    }

    /**
     * Method wraps console.info() function.
     *
     * @param args Various array of arguments to log.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info(...args: Array<any>): void {
        this.invoke('info', LoggingLevelType.INFO, ...args);
    }

    /**
     * Method wraps console.warn() function.
     *
     * @param args Various array of arguments to log.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn(...args: Array<any>): void {
        this.invoke('warn', LoggingLevelType.WARNING, ...args);
    }

    /**
     * Method wraps console.error() function.
     *
     * @param args Various array of arguments to log.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(...args: Array<any>): void {
        this.invoke('error', LoggingLevelType.ERROR, ...args);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private invoke(functionName: string, logLevel: LoggingLevelType, ...args: Array<any>): void {
        if (logLevel <= this.logLevel) {
            const basePrefix = this.basePrefix ? `[${this.basePrefix}]` : '';
            const prefix = this.prefix ? `[${this.prefix}]` : '';
            const currentTime = new Date();
            const timePrefix = `[${currentTime.toISOString()}]`;
            const performancePrefix = `[${currentTime.getTime() - Logger.lastLoggingTimestamp} ms]`;
            Logger.lastLoggingTimestamp = currentTime.getTime();

            const fullPrefix = `${basePrefix}${prefix}${timePrefix}${performancePrefix}`;

            if (typeof args[0] === 'string') {
                // eslint-disable-next-line no-param-reassign
                args[0] = `${fullPrefix} ${args[0]}`;
            } else {
                Array.prototype.splice.call(args, 0, 0, fullPrefix);
            }

            // @ts-ignore
            // eslint-disable-next-line no-console
            console[functionName](...args);
        }
    }
}
