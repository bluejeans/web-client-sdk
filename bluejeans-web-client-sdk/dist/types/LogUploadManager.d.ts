import { SDKLogger } from './logger';
export default class LogUploadManager {
    private uploadInProgress;
    private email;
    private comments;
    private uploadLogAPI;
    private _sdkLogger;
    private storage;
    constructor(_sdkLogger: SDKLogger, uploadLogAPI?: (timestamp: string, filename: string, type: string, email: string, data: string) => Promise<any>);
    uploadAllLogs: (comments: string, email: string) => Promise<void>;
    private startUploading;
    private uploadComments;
    private upload;
    private callApi;
    addLogsToLocalStorage(): void;
}
