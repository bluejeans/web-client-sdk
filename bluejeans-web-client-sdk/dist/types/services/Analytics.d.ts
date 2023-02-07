export declare enum AnalyticsEvents {
    jsError = "jsError",
    joinedMeeting = "joinedMeeting",
    closedCaptioning = "closedCaptioning",
    wrEnabledInMeeting = "wrEnabledInMeeting",
    wrParticipantApproved = "wrParticipantApproved",
    wrParticipantDenied = "wrParticipantDenied",
    wrApprovedAll = "wrApprovedAll",
    wrDeniedAll = "wrDeniedAll",
    wrParticipantDemoted = "wrParticipantDemoted",
    wrRequestDenied = "wrRequestDenied",
    wrRequestApproved = "wrRequestApproved",
    wrLandedOnWaitingRoom = "wrLandedOnWaitingRoom",
    max720pVideoCapture = "max720pVideoCapture",
    switchMaxVideoResolutionFailed = "switchMaxVideoResolutionFailed",
    meetingVideoLayoutChanged = "meetingVideoLayoutChanged"
}
export default class Analytics {
    private tracked;
    private superPropertyCache;
    constructor();
    private initSuperProperty;
    private trackJsErrors;
    setSuperProperty(property: any): void;
    private setUserProperty;
    private get superProperties();
    private get timeStamp();
    private identify;
    private get disableMixpanelTracking();
    private _track;
    private removePIIInfo;
    track(eventName: string, eventProperties?: any): void;
    trackOnce(eventName: string, eventProperties?: any): void;
    addPersistent(property: any): void;
}
