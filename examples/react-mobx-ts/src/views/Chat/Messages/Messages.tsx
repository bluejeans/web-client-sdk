import { observer } from 'mobx-react'
import React from 'react'
import Managers from '../../../stores/Managers'
import Message from './Message/Message'
import { MessageDiv, MessagesDiv } from './Messages.Styled'
import MessagesViewModel from './MessagesViewModel'

interface MessageProps {
  managers: Managers
}

@observer
class Messages extends React.Component<MessageProps> {
  private messagesViewModel: MessagesViewModel
  messagesEnd: HTMLDivElement
  constructor(props: MessageProps) {
    super(props)
    this.messagesViewModel = new MessagesViewModel(props.managers)
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
    if (this.messagesViewModel.shouldClearChatCount) {
      this.messagesViewModel.clearChatCount()
    }
  }

  render() {
    return (
      <MessageDiv>
        {this.messagesViewModel.messages &&
          this.messagesViewModel.messages.map((message, i) => {
            return (
              <MessagesDiv key={i}>
                <Message message={message} />
              </MessagesDiv>
            )
          })}
        <div
          style={{ marginTop: '10px' }}
          ref={(el) => {
            this.messagesEnd = el
          }}
        ></div>
      </MessageDiv>
    )
  }
}

export default Messages
