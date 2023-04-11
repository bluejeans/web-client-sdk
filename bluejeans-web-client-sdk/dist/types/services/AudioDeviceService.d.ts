import { AudioVideoDevice } from '../sdk-objects';
import { SDKLogger } from "../logger";
import { MeetingService } from "./MeetingService";
export declare class AudioDeviceService {
    private browserType;
    private osType;
    private sdkLogger;
    private meetingService;
    constructor(sdkLogger: SDKLogger, meetingService: MeetingService);
    get availableMicrophones(): AudioVideoDevice[] | null;
    get selectedMicrophone(): AudioVideoDevice | null;
    get availableSpeakers(): AudioVideoDevice[] | null;
    get selectedSpeaker(): AudioVideoDevice | null;
    get isSpeakerSelectionAllowed(): boolean;
    get isMicrophoneSelectionAllowed(): boolean;
    selectMicrophone(microphoneDevice: AudioVideoDevice): void;
    selectSpeaker(speakerDevice: AudioVideoDevice): void;
    private toAudioVideoDevice;
    observe(property: keyof AudioDeviceService, callback: () => void): void;
}
