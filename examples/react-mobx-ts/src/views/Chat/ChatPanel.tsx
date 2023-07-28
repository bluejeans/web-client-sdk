import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ChatPanelViewModel from './ChatPanelViewModel'
import Chat from './Chat'
import Managers from '../../stores/Managers'
import PrivateChatComponent from './PrivateChat/PrivateChatComponent'
import {
  ChatOptions,
  PublicChat,
  PrivateChat,
  PublicChatSelected,
  PrivateChatSelected,
} from './ChatPanel.Styled'

interface Props {
  managers: Managers
}

@observer
export default class ChatPanel extends Component<Props> {
  private chatPanelViewModel: ChatPanelViewModel

  constructor(props: Props) {
    super(props)
    this.chatPanelViewModel = new ChatPanelViewModel(
      props.managers.chatUIManager,
    )
  }

  render() {
    return (
      <>
        <ChatOptions>
          {this.chatPanelViewModel.showPublicChatOption &&
            this.renderPublicChatOption()}
          {this.chatPanelViewModel.showPrivateChatOption &&
            this.renderPrivateChatOption()}
        </ChatOptions>
        {this.chatPanelViewModel.shouldShowPublicChat ? (
          <Chat managers={this.props.managers} />
        ) : (
          <PrivateChatComponent managers={this.props.managers} />
        )}
      </>
    )
  }

  renderPublicChatOption(): JSX.Element {
    return this.chatPanelViewModel.isPublicChatSelected ? (
      <PublicChatSelected onClick={this.chatPanelViewModel.showPublicChatPanel}>
        EVERYONE
      </PublicChatSelected>
    ) : (
      <PublicChat onClick={this.chatPanelViewModel.showPublicChatPanel}>
        EVERYONE
      </PublicChat>
    )
  }

  renderPrivateChatOption(): JSX.Element {
    return this.chatPanelViewModel.isPrivateChatSelected ? (
      <PrivateChatSelected
        onClick={this.chatPanelViewModel.showPrivateChatPanel}
      >
        DIRECT MESSAGE
      </PrivateChatSelected>
    ) : (
      <PrivateChat onClick={this.chatPanelViewModel.showPrivateChatPanel}>
        DIRECT MESSAGE
      </PrivateChat>
    )
  }
}
