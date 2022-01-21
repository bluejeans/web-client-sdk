import { AudioVideoDevice } from '../sdk-objects';
import { SDKLogger } from "../logger";
export declare class AudioDeviceService {
    private browserType;
    private osType;
    private sdkLogger;
    constructor(sdkLogger: SDKLogger);
    get availableMicrophones(): AudioVideoDevice[];
    get selectedMicrophone(): AudioVideoDevice | null;
    get availableSpeakers(): AudioVideoDevice[];
    get selectedSpeaker(): AudioVideoDevice | null;
    get isSpeakerSelectionAllowed(): boolean;
    get isMicrophoneSelectionAllowed(): boolean;
    selectMicrophone(microphoneDevice: AudioVideoDevice): void;
    selectSpeaker(speakerDevice: AudioVideoDevice): void;
    private toAudioVideoDevice;
    observe(property: keyof AudioDeviceService, callback: () => void): void;
}
