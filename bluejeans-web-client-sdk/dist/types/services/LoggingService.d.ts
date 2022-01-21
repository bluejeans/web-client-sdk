import { LoggingMode } from '../sdk-objects';
export declare class LoggingService {
    private _sdkLogger;
    private _logUploadManager;
    constructor(_sdkLogger: any);
    uploadLog(comments: string, email: string): Promise<void>;
    setLoggingMode(loggingMode: LoggingMode): void;
    get loggingMode(): LoggingMode;
}
