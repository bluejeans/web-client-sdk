import { LoggingMode, BlueJeansSDKInitParams, LoggerIntf } from './sdk-objects';
import { IPersistedStorage } from './utils/PersistedStorage';
export declare const ENTRY_PREFIX = "Bluejeans.ConsoleLog.";
export declare class LoggerFactory {
    private static logger;
    static setLogger(sdkLogger: SDKLogger): SDKLogger;
    static getLogger(): SDKLogger;
}
export declare const logFunction: ({ hide, dontExpand, }?: {
    hide?: [number?];
    dontExpand?: [number?];
}) => (parent: any, name: any, descriptor: any) => any;
export declare class SDKLogger implements LoggerIntf {
    private winstonLogger;
    private browserType;
    private OSType;
    private localStorageMessages;
    private fileChunkNumber;
    private initParams;
    private storage;
    private sequence;
    private chunkSize;
    constructor(initParams: BlueJeansSDKInitParams, storage?: IPersistedStorage);
    logValue(tag: any, value: any, winstonLevel: string, mode: LoggingMode): void;
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
    get persistedStorage(): IPersistedStorage;
    get level(): LoggingMode;
    setLevel(level: LoggingMode): void;
    private get logFileName();
    resetTimeStamp(): void;
    private logMessage;
    flushLocalStorageLogs(): void;
    private formatForSawmill;
    private localStorageLog;
    private localStorageSaveLog;
    private save;
}
