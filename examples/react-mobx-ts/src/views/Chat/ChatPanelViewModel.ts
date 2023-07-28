import { computed, action } from 'mobx'
import ChatUIManager, {
  CHATPANEL,
  PRIVATECHATVIEW,
} from '../../stores/ChatUIManager'

interface Props {
  chatUIManager: ChatUIManager
}

export default class ChatPanelViewModel {
  private chatUIManager: ChatUIManager

  constructor(chatPanelUIManager: ChatUIManager) {
    this.chatUIManager = chatPanelUIManager
  }

  @computed get shouldShowPublicChat(): boolean {
    return this.chatUIManager.chatPanelToShow === CHATPANEL.PUBLIC
  }

  @computed get showPublicChatOption(): boolean {
    return this.chatUIManager.isPublicChatEnabled
  }

  @computed get showPrivateChatOption(): boolean {
    return this.chatUIManager.isPrivateChatEnabled
  }

  @computed get isPublicChatSelected(): boolean {
    return this.chatUIManager.chatPanelToShow === CHATPANEL.PUBLIC
  }

  @computed get isPrivateChatSelected(): boolean {
    return this.chatUIManager.chatPanelToShow === CHATPANEL.PRIVATE
  }

  @action.bound showPublicChatPanel(): void {
    this.chatUIManager.setChatPanelToShow(CHATPANEL.PUBLIC)
    this.chatUIManager.selectParticipant(null)
  }

  @action.bound showPrivateChatPanel(): void {
    this.chatUIManager.setChatPanelToShow(CHATPANEL.PRIVATE)
    this.chatUIManager.setPrivateChatViewToShow(PRIVATECHATVIEW.PARTICIPANTS)
  }
}
