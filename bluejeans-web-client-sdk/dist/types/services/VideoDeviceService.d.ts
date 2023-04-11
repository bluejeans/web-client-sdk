import { SDKLogger } from '../logger';
import { AudioVideoDevice } from "../sdk-objects";
import Environments from '../utils/Environments';
import { MeetingService } from "./MeetingService";
export declare class VideoDeviceService {
    private sdkLogger;
    private environments;
    private meetingService;
    constructor(sdkLogger: SDKLogger, environments: Environments, meetingService: MeetingService);
    get availableCameras(): AudioVideoDevice[] | null;
    get selectedCamera(): AudioVideoDevice | null;
    selectCamera(cameraDevice: AudioVideoDevice): void;
    private toAudioVideoDevice;
    observe(property: keyof VideoDeviceService, callback: () => void): void;
}
