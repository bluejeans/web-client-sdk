import { ErrorInfo } from "./ErrorHandler";
export declare enum VideoLayout {
    SPEAKER = "SPEAKER",
    PEOPLE = "PEOPLE",
    GALLERY = "GALLERY",
    FILMSTRIP = "FILMSTRIP",
    CUSTOM = "CUSTOM"
}
export declare enum LoggingMode {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
    VERBOSE = "VERBOSE"
}
export declare enum VideoState {
    ACTIVE = "ACTIVE",
    INACTIVE_ONLY_PARTICIPANT = "INACTIVE_ONLY_PARTICIPANT",
    INACTIVE_NO_ONE_HAS_VIDEO = "INACTIVE_NO_ONE_HAS_VIDEO",
    INACTIVE_NEEDS_MODERATOR = "INACTIVE_NEEDS_MODERATOR",
    INACTIVE_DISCONNECTED = "INACTIVE_DISCONNECTED"
}
export declare enum RecordingState {
    STARTED = "started",
    STOPPED = "stopped"
}
export declare enum ConnectionState {
    IDLE = "IDLE",
    VALIDATING = "VALIDATING",
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
    RECONNECTING = "RECONNECTING",
    WAITINGROOM = "WAITINGROOM"
}
export declare enum ContentShareState {
    STARTED = "started",
    STOPPED = "stopped",
    CANCELLED = "cancelled"
}
export interface Participant {
    name: string;
    isSelf: boolean;
    isModerator: boolean;
    isVideoMuted: boolean;
    audioMuteType: {
        localMuted: boolean;
        remoteMuted: boolean;
    };
    videoMuteType: {
        localMuted: boolean;
        remoteMuted: boolean;
    };
    isAudioMuted: boolean;
    isSharing: boolean;
    participantGuid: string;
    callQuality: CallQuality;
}
export interface AudioVideoDevice {
    id: string;
    name: string;
}
export declare enum JoinError {
    NetworkError = "NetworkError",
    MeetingLocked = "MeetingLocked",
    HostAccountDisabled = "HostAccountDisabled",
    WaitingRoom = "WaitingRoom",
    MaxParticipantsExceeded = "MaxParticipantsExceeded",
    FraudDetected = "FraudDetected",
    LoginRequired = "LoginRequired",
    RestrictedMeeting = "RestrictedMeeting",
    InvalidMeetingIDOrPasscode = "InvalidMeetingIDOrPasscode",
    TryAgainLater = "TryAgainLater",
    InternalError = "InternalError"
}
export declare enum PermissionError {
    CAM_MIC_OS_DENIED = "CAM_MIC_OS_DENIED",
    CAM_OS_DENIED = "CAM_OS_DENIED",
    MIC_OS_DENIED = "MIC_OS_DENIED",
    CAM_IN_USE = "CAM_IN_USE",
    CAM_MIC_DENIED = "CAM_MIC_DENIED",
    CAM_DENIED = "CAM_DENIED",
    MIC_DENIED = "MIC_DENIED",
    CAM_MIC_UNAVAILABLE = "CAM_MIC_UNAVAILABLE",
    CAM_UNAVAILABLE = "CAM_UNAVAILABLE",
    MIC_UNAVAILABLE = "MIC_UNAVAILABLE",
    MIC_IN_USE = "MIC_IN_USE"
}
export interface ChatMessage {
    senderName: string;
    messageText: string;
    timestamp: number;
    sentBySelf: boolean;
    senderGuid: string;
}
export interface MeetingInformation {
    meetingHost: string;
    meetingTitle: string;
    meetingId: string;
    passcode: string;
}
export declare enum LogUploadResult {
    AlreadyUploading = "AlreadyUploading",
    Failed = "Failed"
}
export interface CustomizationParams {
    audioTileColor?: string;
    containerColorOfAllTiles?: string;
    videoTileBackgroundColor?: string;
}
export interface BlueJeansSDKInitParams {
    customizationParams?: CustomizationParams;
    saveLogsToLocalStorage?: boolean;
    playIVRs?: boolean;
    appMetaData?: AppMetaData;
    galleryLayoutConfiguration?: GalleryLayoutConfiguration;
}
export interface AppMetaData {
    appName: string;
    integratorAppVersion?: string;
    deviceVendor?: string;
    deviceModel?: string;
    deviceName?: string;
    appPartner?: string;
}
export declare enum ClosedCaptioningState {
    CONNECTING = "Connecting",
    CONNECTED = "Connected",
    DISCONNECTED = "Disconnected"
}
export interface Error {
    reason: string;
    error: object | boolean;
}
export interface LoggerIntf {
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
    flushLocalStorageLogs?(): void;
    addLogsToLocalStorage?(): void;
}
export interface AsyncAPIResponse {
    error?: object;
    reason?: string;
    code: string;
}
export declare enum SetMaxVideoSendResolutionFailureReason {
    ERROR_SETPARAMETERS_FAILED = "ERROR_SETPARAMETERS_FAILED",
    ERROR_RESOLUTION_SWITCH_NOT_ALLOWED = "ERROR_RESOLUTION_SWITCH_NOT_ALLOWED",
    ERROR_VIDEO_SENDER_UNAVAILABLE = "ERROR_VIDEO_SENDER_UNAVAILABLE"
}
export interface SetMaxVideoSendResolutionFailure {
    code: SetMaxVideoSendResolutionFailureReason;
    message: string;
    error?: object;
}
export declare enum SetMaxVideoSendResolutionStatus {
    SUCCESSFUL = "SUCCESSFUL",
    ERROR_OUT_OF_MEETING = "ERROR_OUT_OF_MEETING",
    ERROR_SET_MAX_RESOLUTION_FAILED = "ERROR_SET_MAX_RESOLUTION_FAILED",
    ERROR_INCORRECT_INPUT = "ERROR_INCORRECT_INPUT"
}
export interface SetMaxVideoSendResolutionResponse extends AsyncAPIResponse {
    code: SetMaxVideoSendResolutionStatus;
}
export declare enum MaxVideoQuality {
    "360p" = 360,
    "720p" = 720
}
export declare enum CallQuality {
    one = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5
}
export declare enum GalleryLayoutConfiguration {
    fiveByFive = 25,
    threeByThree = 9
}
export declare enum ConnectionMode {
    Default = "Default",
    ScreenShareOnly = "ScreenShareOnly"
}
export declare enum SwitchConnectionModeResponseCode {
    SWITCH_CONNECTION_MODE_SUCCESS = "SWITCH_CONNECTION_MODE_SUCCESS",
    SWITCH_CONNECTION_MODE_FAILURE = "SWITCH_CONNECTION_MODE_FAILURE",
    ERROR_OUT_OF_MEETING = "ERROR_OUT_OF_MEETING"
}
export interface SwitchConnectionModeResponse extends AsyncAPIResponse {
    error?: ErrorInfo;
    code: SwitchConnectionModeResponseCode;
}
