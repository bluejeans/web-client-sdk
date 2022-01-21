import { SequinAudioVideoParticipantStore, ClientControlledLayoutOrderingStore, VideoViewStore, StreamDetailsStore, SpotLightStore, AudioStreamStore, ServerLayoutStore, DominantSpeakerStore, MediaStore, MeetingSessionStore, ScreenShareStore } from "@bluejeans/bjn-core-webrtc";
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
    constructor(sequinAudioVideoParticipantStore: SequinAudioVideoParticipantStore, clientControlledLayoutOrderingStore: ClientControlledLayoutOrderingStore, videoViewStore: VideoViewStore, meetingSessionStore: MeetingSessionStore, streamDetailsStore: StreamDetailsStore, spotLightStore: SpotLightStore, audioStreamStore: AudioStreamStore, serverLayoutStore: ServerLayoutStore, dominantSpeakerStore: DominantSpeakerStore, mediaStore: MediaStore, screenShareStore: ScreenShareStore, autoplayHandler: AutoplayHandler, isMobileDevice: boolean, meetingService: MeetingService);
    get showVideoLayout(): boolean;
}
