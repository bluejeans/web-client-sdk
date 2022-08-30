import { SDKLogger } from "./logger";
import AutoplayHandler from "./utils/AutoplayHandler";
export declare const STREAM_TYPE_ATTRIBUTE = "data-bjn-stream-type";
export declare class StreamHelper {
    selfVideoPreview: boolean;
    private pauseLocalStreamAttaches;
    private autoplayHandler;
    constructor(sdkLogger: SDKLogger, autoplayHandler: AutoplayHandler);
    private registerDocumentClickListener;
    attachStreamType(videoElement: HTMLElement, streamType: StreamType): void;
    setSelfVideoPreviewEnabled(enable: boolean): void;
    setPauseLocalStreamAttaches(pause: boolean): void;
    handleAutoplayForAllMediaNodes(): void;
    private handleAutoplayForAllMediaOfType;
    private attachExisting;
    private doAttach;
}
