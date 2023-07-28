import { computed } from 'mobx'
import { ChatMessage } from '@bluejeans/web-client-sdk'
import Managers from '../../../stores/Managers'
import ChatUIManager, { CHATPANEL } from '../../../stores/ChatUIManager'

export default class MeetingViewModel {
  private chatUIManager: ChatUIManager

  constructor(managers: Managers) {
    this.chatUIManager = managers.chatUIManager
  }

  @computed get messages(): ChatMessage[] {
    return this.chatUIManager.messages
  }

  @computed get shouldClearChatCount(): boolean {
    if (this.chatUIManager.chatPanelToShow === CHATPANEL.PUBLIC) {
      return this.chatUIManager.unreadPublicMessagesCount > 0
    } else {
      return this.chatUIManager.unreadPrivateMessagesCount > 0
    }
  }

  clearChatCount(): void {
    this.chatUIManager.clearChatCount()
  }
}
