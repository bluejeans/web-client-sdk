import { Participant } from "@bluejeans/web-client-sdk";
import { computed } from "mobx";
import ChatUIManager, { PRIVATECHATVIEW } from "../../../stores/ChatUIManager";

export default class EligibleParticipantsViewModel {

    private chatUIManager : ChatUIManager;

    constructor(chatUIManager: ChatUIManager) {
        this.chatUIManager = chatUIManager;
    }

    @computed get eligibleParticipants() : Participant[] {
        return this.chatUIManager.eligibleParticipants;
    }

    @computed get unreadPrivateMessagesCount() : Map<string, number> {
        return this.chatUIManager.unreadPrivateMessagesCountForParticipant;
    }

    showChatHistory(participant : Participant) {
        this.chatUIManager.selectParticipant(participant);
        this.chatUIManager.setPrivateChatViewToShow(PRIVATECHATVIEW.CHAT);
        this.chatUIManager.clearUnreadPrivateMessageCount(participant.participantGuid);
    }

}