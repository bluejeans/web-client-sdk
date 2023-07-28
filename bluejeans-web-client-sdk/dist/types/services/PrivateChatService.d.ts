import BaseStore from '../utils/BaseContainer';
import SubscribableEvent from 'subscribableevent';
import { SDKLogger } from '../logger';
import { Participant } from '../sdk-objects';
import { ParticipantService } from './ParticipantService';
import { ChatMessage } from '../sdk-objects';
export declare class PrivateChatStoreEvents {
    readonly newMessage: SubscribableEvent<(message: ChatMessage) => void>;
}
export declare class PrivateChatService extends BaseStore {
    private sdkLogger;
    private participantService;
    events: PrivateChatStoreEvents;
    constructor(sdkLogger: SDKLogger, participantService: ParticipantService);
    get isPrivateChatEnabled(): boolean;
    get isPrivateChatConnected(): boolean;
    get unreadMessageCount(): number;
    get eligibleParticipants(): Participant[];
    get unreadCountByParticipant(): Map<string, number>;
    get chatHistoryByParticipant(): Map<string, ChatMessage[]>;
    sendMessage(message: string, participantGuid: string): void;
    clearUnreadMessageCountForParticipant(participantGuid: string): void;
    observe(property: keyof PrivateChatService, callback: () => void): void;
    subscribeToNewMessages(): void;
}
