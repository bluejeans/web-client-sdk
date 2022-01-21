export declare enum VideoLayout {
    SPEAKER = "SPEAKER",
    PEOPLE = "PEOPLE",
    GALLERY = "GALLERY",
    FILMSTRIP = "FILMSTRIP"
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
export declare enum ConnectionState {
    IDLE = "IDLE",
    VALIDATING = "VALIDATING",
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
    DISCONNECTED = "DISCONNECTED",
    RECONNECTING = "RECONNECTING"
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
    isAudioMuted: boolean;
    isSharing: boolean;
    participantGuid: string;
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
    TechnicalError = "TechnicalError",
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
}
