import { ClosedCaptioningState } from "../sdk-objects";
import { SDKLogger } from "../logger";
export declare class ClosedCaptioningService {
    private sdkLogger;
    constructor(sdkLogger: SDKLogger);
    startClosedCaptioning(): Promise<unknown>;
    stopClosedCaptioning(): Promise<unknown>;
    get isClosedCaptioningOn(): boolean;
    get isClosedCaptioningAvailable(): boolean;
    get closedCaptionText(): string;
    get closedCaptioningState(): ClosedCaptioningState;
}
