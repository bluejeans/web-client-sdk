import { action, observable, computed } from "mobx";
import ChatUIManager from "../../../stores/ChatUIManager";
import Managers from "../../../stores/Managers";
import { CHATPANEL } from "../../../stores/ChatUIManager";

export default class InputViewModel {

  private chatUIManager: ChatUIManager;
  @observable message : string;

  constructor(managers: Managers) {
    this.chatUIManager = managers.chatUIManager;
  }

  @action.bound setMessage(message : string) : void {
    this.message = message;
  }

  sendMessage(event): void {
    event.preventDefault();
    this.chatUIManager.sendMessage(this.message);
    this.setMessage("");
  }

  @computed get shouldSendPrivateChat() : boolean {
    return (this.chatUIManager.chatPanelToShow === CHATPANEL.PRIVATE);
  }

  @computed get isChatEnabled() : boolean {
    return this.shouldSendPrivateChat ? this.chatUIManager.isPrivateChatConnected : this.chatUIManager.isPublicChatConnected;
  }
}