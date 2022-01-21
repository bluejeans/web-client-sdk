import { action, computed, observable } from "mobx";
import { BJNWebClientSDK, ChatMessage, Participant } from "@bluejeans/web-client-sdk";

export enum CHATPANEL {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}

export enum PRIVATECHATVIEW {
    PARTICIPANTS = "PARTICIPANTS",
    CHAT = "CHAT"
}

export default class ChatUIManager {

    private webrtcSDK : BJNWebClientSDK;
    @observable chatPanelToShow : CHATPANEL = CHATPANEL.PUBLIC;
    @observable privateChatViewToShow : PRIVATECHATVIEW = PRIVATECHATVIEW.PARTICIPANTS;
    @observable selectedParticipant : Participant;

    constructor(webrtcSDK : BJNWebClientSDK) {
        this.webrtcSDK = webrtcSDK;
        this.setChatPanelToShow(CHATPANEL.PUBLIC);
    }

    @action setChatPanelToShow(panelType : CHATPANEL) : void {
        this.chatPanelToShow = panelType
    }

    @computed get isPublicChatEnabled() : boolean {
        return this.webrtcSDK.meetingService.publicChatService?.isChatEnabled;
    }

    @computed get isPublicChatConnected() : boolean {
        return this.webrtcSDK.meetingService.publicChatService?.isChatConnected;
    }

    @computed get isPrivateChatEnabled() : boolean {
        return this.webrtcSDK.meetingService.privateChatService?.isPrivateChatEnabled;
    }

    @computed get isPrivateChatConnected() : boolean {
        return this.webrtcSDK.meetingService.privateChatService?.isPrivateChatConnected;
    }

    @computed get publicChatHistory() : ChatMessage[] {
        return this.webrtcSDK.meetingService?.publicChatService?.chatHistory;
    }

    @computed get privateChatHistory() : Map<string, ChatMessage[]> {
        return this.webrtcSDK.meetingService?.privateChatService?.chatHistoryByParticipant;
    }

    @computed get unreadPublicMessagesCount() : number {
        return this.webrtcSDK.meetingService?.publicChatService?.unreadMessageCount;
    }

    @computed get unreadPrivateMessagesCountForParticipant() : Map<string, number> {
        return this.webrtcSDK.meetingService?.privateChatService?.unreadCountByParticipant;
    }

    @computed get unreadPrivateMessagesCount() : number {
        return this.webrtcSDK.meetingService?.privateChatService?.unreadMessageCount;
    }
    
    @computed get messages() : ChatMessage[] {
        return (this.chatPanelToShow === CHATPANEL.PUBLIC) ? this.webrtcSDK.meetingService?.publicChatService?.chatHistory : this.webrtcSDK.meetingService?.privateChatService?.chatHistoryByParticipant.get(this.selectedParticipant?.participantGuid);
    }

    @computed get eligibleParticipants() : Participant[] {
        return this.webrtcSDK.meetingService?.privateChatService?.eligibleParticipants;
    }

    sendMessage(message : string) {
        this.selectedParticipant ? this.sendPrivateMessage(message, this.selectedParticipant.participantGuid) : this.sendPublicMessage(message);
    }

    sendPublicMessage(message : string) {
        this.webrtcSDK.meetingService?.publicChatService?.sendMessage(message);
    }

    sendPrivateMessage(message : string, participantGuid : string) {
        this.webrtcSDK.meetingService?.privateChatService?.sendMessage(message, participantGuid);
    }

    clearUnreadPublicMessageCount() : void {
        this.webrtcSDK.meetingService?.publicChatService?.clearUnreadMessageCount();
    }

    clearUnreadPrivateMessageCount(participantGuid : string) : void {
        this.webrtcSDK.meetingService?.privateChatService?.clearUnreadMessageCountForParticipant(participantGuid);
    }

    @action setPrivateChatViewToShow(view : PRIVATECHATVIEW) : void {
        this.privateChatViewToShow = view;
    }

    @action selectParticipant(participant : Participant) : void {
        this.selectedParticipant = participant;
    }

    clearChatCount() : void {
        if (this.chatPanelToShow === CHATPANEL.PUBLIC) {
            this.clearUnreadPublicMessageCount()
        } else {
            this.clearUnreadPrivateMessageCount(this.selectedParticipant?.participantGuid);
        }
    }

}