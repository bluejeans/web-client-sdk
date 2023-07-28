import { JoinError, PermissionError, MeetingError } from './sdk-objects';
export interface ErrorInfo {
    code: JoinError | PermissionError;
    reason: string;
}
export declare function getDeviceStateErrorMessage(): ErrorInfo;
export declare function getJoinErrorMessage(error: MeetingError): ErrorInfo;
