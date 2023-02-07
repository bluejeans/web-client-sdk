export interface VideoStreamConfigurationResult {
    success: boolean;
    error?: object;
    code?: VideoStreamConfigurationResponseCode;
}
export interface VideoStreamConfiguration {
    participantGuid?: string;
    streamQuality: StreamQuality;
    streamPriority?: StreamPriority;
}
export declare enum VideoStreamConfigurationResponseCode {
    NOT_USING_CUSTOM_LAYOUTS = "NOT_USING_CUSTOM_LAYOUTS",
    EMPTY_CONFIGURATION = "EMPTY_CONFIGURATION",
    STREAM_LIMIT_EXCEEDED = "STREAM_LIMIT_EXCEEDED",
    DUPLICATE_PARTICIPANT_IDS = "DUPLICATE_PARTICIPANT_IDS",
    NO_PARTICIPANTS_WITH_IDS = "NO_PARTICIPANTS_WITH_IDS",
    INVALID_STREAM_QUALITY_CONFIG = "INVALID_STREAM_QUALITY_CONFIG",
    INVALID_PRIORITY_COMBINATION = "INVALID_PRIORITY_COMBINATION"
}
export declare enum StreamPriority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}
export declare enum StreamQuality {
    r90p_15fps = "r90p_15fps",
    r180p_15fps = "r180p_15fps",
    r180p_30fps = "r180p_30fps",
    r360p_15fps = "r360p_15fps",
    r360p_30fps = "r360p_30fps",
    r720p_15fps = "r720p_15fps",
    r720p_30fps = "r720p_30fps"
}
export interface videoStream {
    participantGuid: string;
    resolution: {
        height: number;
        width: number;
    };
    metaData?: {
        fps: number;
    };
}
export interface AttachParticipantToViewResult {
    success: boolean;
    error?: object;
    code?: AttachParticipantToViewResponseCode;
}
export declare enum AttachParticipantToViewResponseCode {
    NO_STREAM_FOR_PARTICIPANT_ID = "NO_STREAM_FOR_PARTICIPANT_ID",
    NO_PARTICIPANT_WITH_ID = "NO_PARTICIPANT_WITH_ID",
    NOT_USING_CUSTOM_LAYOUTS = "NOT_USING_CUSTOM_LAYOUTS",
    UNKNOWN = "UNKNOWN"
}
export interface DetachParticipantStreamResult {
    success: boolean;
    error?: object;
    code?: DetachParticipantStreamFailureReason;
}
export declare enum DetachParticipantStreamFailureReason {
    OBJECT_NOT_ATTACHED = "OBJECT_NOT_ATTACHED",
    UNKNOWN = "UNKNOWN"
}
export declare enum VideoStreamStyle {
    FIT_TO_VIEW = "FIT_TO_VIEW",
    SCALE_AND_CROP = "SCALE_AND_CROP"
}
