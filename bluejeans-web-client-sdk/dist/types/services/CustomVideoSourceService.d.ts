import BaseStore from '../utils/BaseContainer';
import { SDKLogger } from '../logger';
import { SetCustomVideoTrackResult, SetVideoSourceResult, VIDEO_SOURCE } from '../types/CustomVideoSourceService';
import { MeetingService } from './MeetingService';
import Analytics from './Analytics';
export declare class CustomVideoSourceService extends BaseStore {
    private sdkLogger;
    private meetingService;
    private analytics;
    constructor(sdkLogger: SDKLogger, meetingService: MeetingService, analytics: Analytics);
    setCustomVideoTrack(customVideoStream: any): SetCustomVideoTrackResult;
    setVideoSource(videoSource: VIDEO_SOURCE): SetVideoSourceResult;
    get videoSource(): VIDEO_SOURCE;
    private getErrorResponse;
    observe(property: keyof CustomVideoSourceService, callback: () => void): void;
}
