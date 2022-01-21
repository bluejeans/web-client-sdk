import { SDKLogger } from "../logger";
import { AutoplayHandler as AutoplayHandlerIntf } from "@bluejeans/sequin-layouts";
export default class AutoplayHandler implements AutoplayHandlerIntf {
    private browserType;
    autoPlayResolved: boolean;
    private sdkLogger;
    constructor(sdkLogger: SDKLogger);
    isMediaPaused(mediaElement: HTMLMediaElement): boolean;
    handleAutoplayForMediaNodes(mediaElement: HTMLMediaElement): void;
    private setAutoplayResolved;
    private playMediaNode;
    checkIfMedaiNodeIsPaused(mediaNode: HTMLMediaElement): boolean;
    needFireFoxAutoplayHandling(mediaElement: HTMLMediaElement): boolean;
    needChromiumAutoplayHandling(mediaElement: HTMLMediaElement): boolean;
}
