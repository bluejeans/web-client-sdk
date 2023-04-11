import { Participant } from "../sdk-objects";
import BaseStore from '../utils/BaseContainer';
import { SDKLogger } from "../logger";
export declare class ParticipantService extends BaseStore {
    private sdkLogger;
    constructor(sdkLogger: SDKLogger);
    get participants(): Participant[];
    get selfParticipant(): Participant | null;
    private getParticipantByGuid;
    observe(property: keyof ParticipantService, callback: () => void): void;
    get spotlightedParticipant(): Participant | null;
    get activeSpeaker(): Participant | null;
}
