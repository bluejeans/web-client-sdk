export declare enum AnalyticsEvents {
    jsError = 0,
    joinedMeeting = 1,
    closedCaptioning = 2,
    wrEnabledInMeeting = 3,
    wrParticipantApproved = 4,
    wrParticipantDenied = 5,
    wrApprovedAll = 6,
    wrDeniedAll = 7,
    wrParticipantDemoted = 8,
    wrRequestDenied = 9,
    wrRequestApproved = 10,
    wrLandedOnWaitingRoom = 11,
    max720pVideoCapture = 12,
    switchMaxVideoResolutionFailed = 13,
    meetingVideoLayoutChanged = 14,
    galleryLayoutConfigChanged = 15,
    connectionModeChanged = 16,
    videoSourceChanged = 17
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
    track(eventName: AnalyticsEvents, eventProperties?: any): void;
    trackOnce(eventName: AnalyticsEvents, eventProperties?: any): void;
    addPersistent(property: any): void;
}
