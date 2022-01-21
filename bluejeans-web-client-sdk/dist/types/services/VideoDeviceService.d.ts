import { SDKLogger } from '../logger';
import { AudioVideoDevice } from "../sdk-objects";
import Environments from '../utils/Environments';
export declare class VideoDeviceService {
    private sdkLogger;
    private environments;
    constructor(sdkLogger: SDKLogger, environments: Environments);
    get availableCameras(): AudioVideoDevice[];
    get selectedCamera(): AudioVideoDevice | null;
    selectCamera(cameraDevice: AudioVideoDevice): void;
    private toAudioVideoDevice;
    observe(property: keyof VideoDeviceService, callback: () => void): void;
}
