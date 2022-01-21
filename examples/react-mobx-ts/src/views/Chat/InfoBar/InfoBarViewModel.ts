import { action, computed } from "mobx";
import ChatUIManager, { CHATPANEL, PRIVATECHATVIEW } from "../../../stores/ChatUIManager";
import AppManager from "../../../stores/AppManager";
import Managers from "../../../stores/Managers";

export default class InfoBarViewModel {

  private appManager : AppManager;
  private chatUIManager : ChatUIManager;

  constructor(managers: Managers) {
    this.appManager = managers.appManager;
    this.chatUIManager = managers.chatUIManager;
  }

  @action.bound hideChatPanel() : void {
    this.appManager.setShowChatPanel(false);
  }

  @computed get participantName() : string {
    return this.chatUIManager.selectedParticipant?.name;
  }

  @action.bound switchToParticipantsView() : void {
    if(this.chatUIManager.chatPanelToShow === CHATPANEL.PRIVATE && this.chatUIManager.privateChatViewToShow === PRIVATECHATVIEW.CHAT) {
      this.chatUIManager.setPrivateChatViewToShow(PRIVATECHATVIEW.PARTICIPANTS);
    }
  }

  @computed get showParticipantName() : boolean {
    return (this.chatUIManager.chatPanelToShow === CHATPANEL.PRIVATE);
  }
}
