import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ChatUIManager from '../../../stores/ChatUIManager'
import EligibleParticipantsViewModel from './EligibleParticipantsViewModel'
import {
  ParticipantListContainer,
  ParticipantListItem,
  ParticipantName,
} from './styles/PrivateChatComponent'
import { Participant } from '@bluejeans/web-client-sdk'

interface Props {
  chatUIManager: ChatUIManager
}

@observer
export default class EligibleParticipants extends Component<Props> {
  private chatUIManager: ChatUIManager
  private viewModel: EligibleParticipantsViewModel

  constructor(props: Props) {
    super(props)
    this.chatUIManager = props.chatUIManager
    this.viewModel = new EligibleParticipantsViewModel(this.chatUIManager)
  }

  render() {
    return (
      <ParticipantListContainer>
        <h3>Participants List</h3>
        <hr />
        {this.renderParticipants()}
      </ParticipantListContainer>
    )
  }

  renderParticipants(): JSX.Element {
    let participants = this.viewModel.eligibleParticipants
    return (
      <>
        {participants.map((participant, n) => {
          {
            return this.renderParticipant(participant, n)
          }
        })}
      </>
    )
  }

  renderParticipant(participant: Participant, n): JSX.Element {
    let unreadMessagesCount = this.viewModel.unreadPrivateMessagesCount.get(
      participant.participantGuid,
    )
    let shouldShowUnreadMessagesCount = unreadMessagesCount > 0
    return (
      <ParticipantListItem
        key={n.toString()}
        onClick={() => this.viewModel.showChatHistory(participant)}
      >
        <ParticipantName title={participant.name}>
          {participant.name}
          {shouldShowUnreadMessagesCount && <span>{unreadMessagesCount}</span>}
        </ParticipantName>
      </ParticipantListItem>
    )
  }
}
