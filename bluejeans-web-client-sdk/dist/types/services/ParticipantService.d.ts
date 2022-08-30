import { Participant } from "../sdk-objects";
import { SDKLogger } from "../logger";
export declare class ParticipantService {
    private sdkLogger;
    constructor(sdkLogger: SDKLogger);
    get participants(): Participant[];
    get selfParticipant(): Participant | null;
    observe(property: keyof ParticipantService, callback: () => void): void;
    get spotlightedParticipant(): Participant | null;
    get activeSpeaker(): Participant | null;
}
