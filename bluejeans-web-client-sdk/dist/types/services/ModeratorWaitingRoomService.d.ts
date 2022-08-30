import { SDKLogger } from "../logger";
import { Error, Participant } from "../sdk-objects";
import { WaitingRoomParticipant } from '../types/ModeratorWaitingRoomService';
import { AdmitAllWrResponse, AdmitParticipantWrResponse, DenyParticipantWrResponse, DenyAllWrResponse, DemoteParticipantWrResponse, ToggleWaitingRoomResponse } from '../types/ModeratorWaitingRoomService';
import SubscribableEvent from 'subscribableevent';
import Analytics from './Analytics';
export declare class WaitingRoomParticipantEvent {
    readonly added: SubscribableEvent<(participants: WaitingRoomParticipant[] | Error) => void>;
    readonly removed: SubscribableEvent<(participants: WaitingRoomParticipant[] | Error) => void>;
}
export declare class ModeratorWaitingRoomService {
    private sdkLogger;
    private analytics;
    events: WaitingRoomParticipantEvent;
    constructor(sdkLogger: SDKLogger, analytics: Analytics);
    admitParticipant(waitingRoomParticipant: WaitingRoomParticipant): Promise<AdmitParticipantWrResponse>;
    admitAll(): Promise<AdmitAllWrResponse>;
    denyAll(): Promise<DenyAllWrResponse>;
    denyParticipant(waitingRoomParticipant: WaitingRoomParticipant): Promise<DenyParticipantWrResponse>;
    demote(participant: Participant): Promise<DemoteParticipantWrResponse>;
    setWaitingRoomEnabled(enabled: any): Promise<ToggleWaitingRoomResponse>;
    get isWaitingRoomCapable(): boolean;
    get isWaitingRoomEnabled(): boolean;
    get waitingRoomParticipants(): WaitingRoomParticipant[] | Error;
    observe(property: keyof ModeratorWaitingRoomService, callback: () => void): void;
}
