import { ClosedCaptioningState } from "../sdk-objects";
import { SDKLogger } from "../logger";
import Analytics from './Analytics';
import { StartCCResponse, StopCCResponse } from '../types/ClosedCaptioningService';
export declare class ClosedCaptioningService {
    private sdkLogger;
    private analytics;
    constructor(sdkLogger: SDKLogger, analytics: Analytics);
    startClosedCaptioning(): Promise<StartCCResponse>;
    stopClosedCaptioning(): Promise<StopCCResponse>;
    get isClosedCaptioningOn(): boolean;
    get isClosedCaptioningAvailable(): boolean;
    get closedCaptionText(): string;
    get closedCaptioningState(): ClosedCaptioningState;
    observe(property: keyof ClosedCaptioningService, callback: () => void): void;
}
