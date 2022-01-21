import { Participant } from "../sdk-objects";
import { Participant as CoreParticipant } from "@bluejeans/bjn-core-webrtc";
import { SDKLogger } from "../logger";
export declare class ParticipantService {
    private sdkLogger;
    constructor(sdkLogger: SDKLogger);
    get participants(): Participant[];
    get selfParticipant(): Participant | null;
    toParticipant(participant: CoreParticipant): Participant;
    observe(property: keyof ParticipantService, callback: () => void): void;
}
