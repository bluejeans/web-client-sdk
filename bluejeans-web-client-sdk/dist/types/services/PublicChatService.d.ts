import BaseStore from '../utils/BaseContainer';
import SubscribableEvent from 'subscribableevent';
import { SDKLogger } from '../logger';
import { ChatMessage } from '../sdk-objects';
export declare class PublicChatStoreEvents {
    readonly newMessage: SubscribableEvent<(message: ChatMessage) => void>;
}
export declare class PublicChatService extends BaseStore {
    private sdkLogger;
    events: PublicChatStoreEvents;
    constructor(sdkLogger: SDKLogger);
    get isChatEnabled(): boolean;
    get isChatConnected(): boolean;
    get chatHistory(): ChatMessage[];
    get unreadMessageCount(): number;
    sendMessage(message: string): void;
    clearUnreadMessageCount(): void;
    observe(property: keyof PublicChatService, callback: () => void): void;
    subscribeToNewMessages(): void;
}
