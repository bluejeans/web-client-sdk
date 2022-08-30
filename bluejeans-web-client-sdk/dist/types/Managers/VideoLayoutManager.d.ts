import { AutoplayHandler, VideoLayoutManagerIntf } from "@bluejeans/sequin-layouts";
import { MeetingService } from "../services/MeetingService";
export declare class VideoLayoutManager implements VideoLayoutManagerIntf {
    sequinAudioVideoParticipantStore: SequinAudioVideoParticipantStore;
    clientControlledLayoutOrderingStore: ClientControlledLayoutOrderingStore;
    videoViewStore: VideoViewStore;
    meetingSessionStore: MeetingSessionStore;
    streamDetailsStore: StreamDetailsStore;
    spotLightStore: SpotLightStore;
    audioStreamStore: AudioStreamStore;
    serverLayoutStore: ServerLayoutStore;
    dominantSpeakerStore: DominantSpeakerStore;
    mediaStore: MediaStore;
    screenShareStore: ScreenShareStore;
    autoplayHandler: AutoplayHandler;
    isMobileDevice: boolean;
    private meetingService;
    joinModeStore: JoinModeStore;
    rosterStore: RosterStore;
    networkService: NetworkService;
    constructor(sequinAudioVideoParticipantStore: SequinAudioVideoParticipantStore, clientControlledLayoutOrderingStore: ClientControlledLayoutOrderingStore, videoViewStore: VideoViewStore, meetingSessionStore: MeetingSessionStore, streamDetailsStore: StreamDetailsStore, spotLightStore: SpotLightStore, audioStreamStore: AudioStreamStore, serverLayoutStore: ServerLayoutStore, dominantSpeakerStore: DominantSpeakerStore, mediaStore: MediaStore, screenShareStore: ScreenShareStore, joinModeStore: JoinModeStore, rosterStore: RosterStore, networkService: NetworkService, autoplayHandler: AutoplayHandler, isMobileDevice: boolean, meetingService: MeetingService);
    get showVideoLayout(): boolean;
    get showVideoDebugStats(): boolean;
    get maxNumberOfStreams(): number;
}
