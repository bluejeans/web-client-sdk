import { computed, action, observable } from "mobx";
import ChatUIManager, { PRIVATECHATVIEW } from "../../../stores/ChatUIManager";

export default class PrivateChatComponentViewModel {

    private chatUIManager : ChatUIManager;

    constructor(chatUIManager: ChatUIManager) {
        this.chatUIManager = chatUIManager;
    }

    @computed get privateChatViewToShow() : PRIVATECHATVIEW {
        return this.chatUIManager.privateChatViewToShow;
    }

}