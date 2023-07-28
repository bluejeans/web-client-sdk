import ChatUIManager from '../../stores/ChatUIManager'
export default class ChatViewModel {
  private chatUIManager: ChatUIManager

  constructor(chatUIManager: ChatUIManager) {
    this.chatUIManager = chatUIManager
  }

  clearChatCount(): void {
    this.chatUIManager.clearChatCount()
  }
}
