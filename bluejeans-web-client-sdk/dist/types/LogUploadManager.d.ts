import { SDKLogger } from "./logger";
export default class LogUploadManager {
    private uploadInProgress;
    private email;
    private comments;
    private uploadLogAPI;
    private _sdkLogger;
    constructor(_sdkLogger: SDKLogger);
    uploadAllLogs(comments: string, email: string): Promise<void>;
    private getAllLogKeys;
    private startUploading;
    private uploadLog;
    private uploadComments;
    private upload;
    private callApi;
    private removeLog;
    addLogsToLocalStorage(): void;
}
