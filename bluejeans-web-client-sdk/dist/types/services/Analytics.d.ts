export declare enum AnalyticsEvents {
    jsError = "jsError",
    joinedMeeting = "joinedMeeting"
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
