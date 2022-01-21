import { LoggerIntf } from '@bluejeans/bjn-core-webrtc';
import { LoggingMode, BlueJeansSDKInitParams } from './sdk-objects';
export declare class SDKLogger implements LoggerIntf {
    private winstonLogger;
    private browserType;
    private OSType;
    private localStorageMessages;
    private fileChunkNumber;
    private initParams;
    constructor(initParams: BlueJeansSDKInitParams);
    log(tag: unknown, value: unknown): void;
    log(value: unknown): void;
    verbose(tag: unknown, value: unknown): void;
    verbose(value: unknown): void;
    debug(tag: unknown, value: unknown): void;
    debug(value: unknown): void;
    info(tag: unknown, value: unknown): void;
    info(value: unknown): void;
    warn(tag: unknown, value: unknown): void;
    warn(value: unknown): void;
    error(tag: unknown, value: unknown): void;
    error(value: unknown): void;
    get level(): LoggingMode;
    setLevel(level: LoggingMode): void;
    private get logFileName();
    resetTimeStamp(): void;
    private getOldestKey;
    private removeOldestLog;
    private shouldLocalStorageSaveLog;
    logMessage(messages: any, level: any): void;
    flushLocalStorageLogs(): void;
    private formatForConsole;
    private getConsoleColumns;
    private checkLocalStorageSaveLog;
    private formatForSawmill;
    private localStorageLog;
    private localStorageSaveLog;
}
