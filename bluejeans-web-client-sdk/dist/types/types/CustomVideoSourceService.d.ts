export interface SetCustomVideoTrackResult {
    success: boolean;
    error?: object;
    code?: SetCustomVideoTrackResponseCode;
}
export declare enum SetCustomVideoTrackResponseCode {
    VIDEO_SOURCE_NOT_SET_TO_CUSTOM = "VIDEO_SOURCE_NOT_SET_TO_CUSTOM",
    SUCCESS = "SUCCESS",
    NO_TRACK_PROVIDED = "NO_TRACK_PROVIDED",
    INVALID_OBJECT = "INVALID_OBJECT",
    TRACK_IS_INACTIVE = "TRACK_IS_INACTIVE",
    CUSTOM_VIDEO_SOURCE_NOT_SUPPORTED_IN_SSOM = "CUSTOM_VIDEO_SOURCE_NOT_SUPPORTED_IN_SSOM"
}
export interface SetVideoSourceResult {
    success: boolean;
    error?: object;
    code?: SetVideoSourceResponseCode;
}
export declare enum SetVideoSourceResponseCode {
    INVALID_VIDEO_SOURCE = "INVALID_VIDEO_SOURCE",
    CUSTOM_VIDEO_SOURCE_NOT_SUPPORTED_IN_SSOM = "CUSTOM_VIDEO_SOURCE_NOT_SUPPORTED_IN_SSOM"
}
export declare enum VIDEO_SOURCE {
    CAMERA = "CAMERA",
    CUSTOM = "CUSTOM"
}
