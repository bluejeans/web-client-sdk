export * from "./sdk-objects";
import { BlueJeansSDKInitParams, JoinError } from './sdk-objects';
import { MeetingService } from './services/MeetingService';
import { PermissionService } from './services/PermissionService';
import { AudioDeviceService } from "./services/AudioDeviceService";
import { VideoDeviceService } from "./services/VideoDeviceService";
import { LoggingService } from "./services/LoggingService";
import EnvironmentsService from "./utils/Environments";
export interface ErrorInfo {
    code: JoinError;
    reason: string;
}
export declare class BJNWebClientSDK {
    private _sdkLogger;
    meetingService: MeetingService;
    permissionService: PermissionService;
    audioDeviceService: AudioDeviceService;
    videoDeviceService: VideoDeviceService;
    loggingService: LoggingService;
    environmentsService: EnvironmentsService;
    private initParams;
    constructor(initParams?: BlueJeansSDKInitParams);
    private initializeServices;
    get version(): string;
}
