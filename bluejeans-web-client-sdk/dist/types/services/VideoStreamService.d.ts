import { VideoStreamConfigurationResult, VideoStreamConfiguration, videoStream, DetachParticipantStreamResult, AttachParticipantToViewResult, VideoStreamStyle } from '../types/VideoStreamService';
import BaseStore from "../utils/BaseContainer";
export declare class VideoStreamService extends BaseStore {
    private sdkLogger;
    private videoLayout;
    private meetingService;
    private videoConfigurations;
    setVideoStreamConfiguration(videoConfigurations: VideoStreamConfiguration[]): VideoStreamConfigurationResult;
    attachParticipantToView(participantGuid: string, view: HTMLDivElement): AttachParticipantToViewResult;
    detachParticipantFromView(participantGuid: string): DetachParticipantStreamResult;
    setVideoStreamStyle(videoStreamStyle: VideoStreamStyle, view: HTMLDivElement): void;
    setDefaultVideoStreamStyle(videoStreamStyle: VideoStreamStyle): void;
    get videoStreamConfigurations(): VideoStreamConfiguration[];
    get videoStreams(): videoStream[];
    get attachedViewsForParticipantIds(): Map<string, HTMLDivElement>;
    get defaultVideoStreamStyle(): VideoStreamStyle;
    get isDebugMetadataEnabled(): boolean;
    setDebugMetadataEnabled(enableDebugMetadata: boolean): void;
    observe(property: keyof VideoStreamService, callback: () => void): void;
}
