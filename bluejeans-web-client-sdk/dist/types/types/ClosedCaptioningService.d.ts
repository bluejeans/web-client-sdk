export interface StartCCResponse {
    error?: object;
    code: StartCCResponseCode;
}
export declare enum StartCCResponseCode {
    CC_START_SUCCESS = "CC_START_SUCCESS",
    CC_START_FAILURE = "CC_START_FAILURE",
    CC_ALREADY_ACTIVE = "CC_ALREADY_ACTIVE",
    CC_NOT_AVAIABLE = "CC_NOT_AVAIABLE"
}
export interface StopCCResponse {
    error?: object;
    code: StopCCResponseCode;
}
export declare enum StopCCResponseCode {
    CC_STOP_SUCCESS = "CC_STOP_SUCCESS",
    CC_STOP_FAILURE = "CC_STOP_FAILURE",
    CC_NOT_ACTIVE = "CC_NOT_ACTIVE"
}
