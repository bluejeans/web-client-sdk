import BaseStore from '../utils/BaseContainer';
import { ContentShareState } from '../sdk-objects';
import { SDKLogger } from '../logger';
export declare class ContentShareService extends BaseStore {
    private sdkLogger;
    constructor(sdkLogger: SDKLogger);
    get receivingContentShare(): boolean | null;
    get contentShareState(): ContentShareState;
    get isContentShareSupported(): boolean;
    startContentShare(): void;
    stopContentShare(): void;
    observe(property: keyof ContentShareService, callback: () => void): void;
}
