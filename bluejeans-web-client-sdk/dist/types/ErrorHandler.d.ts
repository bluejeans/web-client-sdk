import { MeetingError } from '@bluejeans/bjn-core-webrtc';
import { JoinError, PermissionError } from './sdk-objects';
export interface ErrorInfo {
    code: JoinError | PermissionError;
    reason: string;
}
export declare function getDeviceStateErrorMessage(): ErrorInfo;
export declare function getJoinErrorMessage(error: MeetingError): ErrorInfo;
