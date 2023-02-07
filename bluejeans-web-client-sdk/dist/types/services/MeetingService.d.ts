import Container from '../utils/Container';
import { VideoLayout, VideoState, ConnectionState, MeetingInformation, BlueJeansSDKInitParams, RecordingState, SetMaxVideoSendResolutionResponse, MaxVideoQuality } from '../sdk-objects';
import { PermissionService } from "./PermissionService";
import { ParticipantService } from "./ParticipantService";
import { ContentShareService } from './ContentShareService';
import Analytics from './Analytics';
import { SDKLogger } from "../logger";
import { PublicChatService } from './PublicChatService';
import { PrivateChatService } from './PrivateChatService';
import { ModeratorControlsService } from "./ModeratorControlsService";
import { ClosedCaptioningService } from "./ClosedCaptioningService";
import { VideoStreamService } from './VideoStreamService';
import { ModeratorWaitingRoomService } from "./ModeratorWaitingRoomService";
export declare const ZINC_MODE_ATTRIBUTE = "data-bjn-zinc-mode";
export declare class MeetingService extends Container {
    private permissionService;
    private _streamHelper;
    private environments;
    private videoLayoutManager;
    participantService: ParticipantService;
    contentService: ContentShareService;
    publicChatService: PublicChatService;
    privateChatService: PrivateChatService;
    moderatorControlsService: ModeratorControlsService;
    closedCaptioningService: ClosedCaptioningService;
    moderatorWaitingRoomService: ModeratorWaitingRoomService;
    videoStreamService: VideoStreamService;
    connectionState: ConnectionState;
    private cluster;
    private analytics;
    private sdkLogger;
    private activateCamOnFG;
    private initParams;
    private remoteVideoContainer;
    private autoplayHandler;
    private sequinAudioPromptsManager;
    private browserType;
    private tempLocalVideoMuteState;
    private tempLocalAudioMuteState;
    private showVideoDebugStats;
    private maxNumberOfStreams;
    private customLayout;
    constructor(permissionService: PermissionService, analytics: Analytics, sdkLogger: SDKLogger, initParams: BlueJeansSDKInitParams);
    private setUpInMeetingService;
    private resetInMeetingService;
    private handleAutoPlayforMediaNodes;
    private setConnectionState;
    private handleMobileBrowsersBg;
    private handleZincNoVideoScreen;
    private attachStreamType;
    private createNoVideoOverlayForZincMode;
    private setCluster;
    attachLocalVideo(videoElement: HTMLElement): void;
    attachRemoteVideo(remoteVideoContainer: HTMLDivElement): void;
    private renderRemoteVideo;
    private resetAppOnMeetingEnd;
    private handleLandedOnWaitingRoom;
    resetTempAudioVideoStates(): void;
    private disconnectMedia;
    private setShowVideoDebugStats;
    attachRemoteContent(videoElement: HTMLElement): void;
    get selfVideoPreviewEnabled(): boolean;
    setSelfVideoPreviewEnabled(enable: boolean): void;
    private addSpeakerPlayerNodes;
    joinMeeting(meetingID: string, passcode: string | undefined, displayName: string): Promise<void>;
    private getVersionString;
    private getAppMetaData;
    private getClientInfo;
    get videoState(): VideoState;
    get audioMuted(): boolean | null;
    get videoMuted(): boolean | null;
    setVideoLayout(videoLayout: VideoLayout): void;
    get isMultiStreamSupported(): boolean;
    setName(name: string): void;
    setVideoMuted(muted: boolean): void;
    setAudioMuted(muted: boolean): void;
    get videoLayout(): VideoLayout | null;
    get meetingInformation(): MeetingInformation;
    get showVideoLayout(): boolean;
    endMeeting(): Promise<any>;
    observe(property: keyof MeetingService, callback: () => void): void;
    get maxVideoSendResolution(): MaxVideoQuality;
    get recordingState(): RecordingState;
    private trackWRParticipantApproved;
    private trackWRParticipantDenied;
    dispose(): void;
    setMaxVideoSendResolution(resolution: MaxVideoQuality): Promise<SetMaxVideoSendResolutionResponse>;
}
