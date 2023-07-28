import React from 'react'
import {
  SentTextRight,
  MessageContainer,
  MessageBoxBlue,
  SendText,
  MessageContainerRight,
  MessageBoxGray,
} from './Message.Styled'
import ReactEmoji from 'react-emoji'
import { ChatMessage } from '@bluejeans/web-client-sdk'

interface MsgProps {
  message: ChatMessage
}

let hours
let date
let minutes
let ampm
let hour
let hourData
let minute
let time

class Message extends React.Component<MsgProps> {
  constructor(props: MsgProps) {
    super(props)
  }

  render() {
    date = new Date(this.props.message.timestamp)
    hours = date.getHours()
    minutes = date.getMinutes()
    ampm = hours >= 12 ? 'pm' : 'am'
    hour = hours % 12
    hourData = hour ? hour : 12 // the hour '0' should be '12'
    minute = minutes < 10 ? '0' + minutes : minutes
    time = hourData + ':' + minute + ' ' + ampm

    return this.props.message.sentBySelf ? (
      <>
        <SentTextRight>
          <p style={{ color: '#5e5e5c', fontSize: '12px' }}>{time} </p>{' '}
          <p
            style={{
              marginLeft: '8px',
              color: '#5e5e5c',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {' '}
            Me
          </p>
        </SentTextRight>
        <MessageContainer>
          <MessageBoxBlue>
            <p> {ReactEmoji.emojify(this.props.message.messageText)} </p>
          </MessageBoxBlue>
        </MessageContainer>
      </>
    ) : (
      <>
        <SendText>
          <p
            style={{
              color: '#5e5e5c',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {this.props.message.senderName}
          </p>
          <p style={{ marginLeft: '8px', color: '#5e5e5c', fontSize: '12px' }}>
            {time}
          </p>
        </SendText>
        <MessageContainerRight>
          <MessageBoxGray>
            <p> {ReactEmoji.emojify(this.props.message.messageText)} </p>
          </MessageBoxGray>
        </MessageContainerRight>
      </>
    )
  }
}
export default Message
