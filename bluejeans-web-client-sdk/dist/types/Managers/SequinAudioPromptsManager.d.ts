import { BaseStore } from "@bluejeans/bjn-core-webrtc";
import { MeetingService } from "../services/MeetingService";
import AutoPlayHandler from "../utils/AutoplayHandler";
import { SDKLogger } from "../logger";
import { BlueJeansSDKInitParams } from '../sdk-objects';
export declare enum AudioPromptFileNames {
    RECORDING_IS_ON = "recording_is_on",
    RECORDING_STARTED = "recording_started",
    RECORDING_STOPPED = "recording_stopped",
    SILENT = "silent_prompt"
}
export default class SequinAudioPromptsManager extends BaseStore {
    private sequinAudioPromptsSdk;
    private avDeviceStore;
    private meetingService;
    private recordingStore;
    private sdkLogger;
    private initParams;
    private autoplayHandler;
    constructor(meetingService: MeetingService, sdkLogger: SDKLogger, initParams: BlueJeansSDKInitParams, autoPlayHandler: AutoPlayHandler);
    private playPrompt;
    private getPathWithUrl;
    private playSilentPrompt;
    get shouldPlayPrompts(): boolean;
}
