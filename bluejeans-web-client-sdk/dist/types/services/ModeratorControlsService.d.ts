import { SDKLogger } from "../logger";
import { Participant, Error } from "../sdk-objects";
import { MeetingService } from "./MeetingService";
export declare class ModeratorControlsService {
    private sdkLogger;
    private meetingService;
    private participantService;
    constructor(sdkLogger: SDKLogger, meetingService: MeetingService);
    get isModeratorControlsAvailable(): boolean;
    get isRecordingFeatureAvailable(): boolean;
    checkSpaceAvailabilityForRecording(): Promise<Error | string>;
    startRecording(): Promise<Error | boolean>;
    stopRecording(): Promise<Error | boolean>;
    setAudioMutedForAllParticipants(muted: boolean): Promise<Error | boolean>;
    setVideoMutedForAllParticipants(muted: boolean): Promise<Error | boolean>;
    setVideoMutedForParticipant(muted: boolean, participant: Participant): Promise<Error | boolean>;
    setAudioMutedForParticipant(muted: boolean, participant: Participant): Promise<Error | boolean>;
    removeParticipant(participant: Participant): Promise<Error | boolean>;
    endMeetingForAllParticipants(timeInSeconds: number): Promise<Error | boolean>;
    isSpotLightAllowed(participant: Participant): boolean;
    spotlightParticipantVideo(enabled: boolean, participant: Participant): Promise<Error | boolean>;
}
