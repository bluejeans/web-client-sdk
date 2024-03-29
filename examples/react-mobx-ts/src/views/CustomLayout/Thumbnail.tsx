import { Participant, videoStream } from '@bluejeans/web-client-sdk'
import { observer } from 'mobx-react'
import React from 'react'
import Managers from '../../stores/Managers'
import {
  StudentDiv,
  TileDiv,
  ParticipantNameDiv,
  TilesContainer,
} from './CustomLayout.Styled'
import {
  AudioContainer,
  EndpointName,
  ParticipantInitials,
  StreamInformation,
} from './Student.Styled'
import StudentViewModel from './StudentViewModel'

interface Props {
  participant: Participant
  random: boolean
  managers: Managers
  streams: videoStream
}

@observer
class Thumbnail extends React.Component<Props> {
  private viewModel: StudentViewModel
  private divElement: any

  constructor(props: Props) {
    super(props)
    this.viewModel = new StudentViewModel(props.managers)
    this.divElement = React.createRef()
  }

  componentDidMount(): void {
    let participant = this.props.participant
    this.viewModel.renderParticipants(
      participant.participantGuid,
      this.divElement,
    )
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {
    let participant = this.props.participant
    if (this.shouldRenderParticipant(prevProps)) {
      this.viewModel.renderParticipants(
        participant.participantGuid,
        this.divElement,
      )
    }
    if (this.props.random !== prevProps.random) {
      this.viewModel.updateBackgroundColor(this.props.random)
    }
  }

  /**
   * Rendering participant agian if videoState or participantGuid has changed
   * Also accounting for the case, when participant is unmuted but it's streams are not available
   * So for rendering we should have a check for streams also
   * */

  shouldRenderParticipant(prevProps): boolean {
    return (
      this.props.participant.isVideoMuted !==
        prevProps.participant.isVideoMuted ||
      this.props.participant?.participantGuid !==
        prevProps.participant?.participantGuid ||
      typeof this.props.streams !== typeof prevProps.streams // when streams change from undefined to some val we should attachParticipant again
    )
  }

  renderAudioTile() {
    const background = this.viewModel.backgroundColor
    const { participantGuid, name } = this.props.participant
    return (
      <AudioContainer
        key={participantGuid}
        background={background}
        isDominantSpeaker={false}
        displayBorder={false}
      >
        <ParticipantInitials isParticipantOnMainStage={false} {...this.props}>
          {' '}
          {this.viewModel.initials(this.props.participant)}
        </ParticipantInitials>
        <StreamInformation
          isShowCallQuality={true}
          isDominantSpeaker={false}
          isParticipantOnMainStage={false}
        >
          <EndpointName>{name}</EndpointName>
        </StreamInformation>
      </AudioContainer>
    )
  }

  getResolution(streams) {
    if (streams?.resolution) {
      return `${streams?.resolution.width}x${streams?.resolution.height}`
    } else {
      return ''
    }
  }

  renderVideoTile() {
    let { participantGuid, name } = this.props.participant
    let streams = this.viewModel.videoStreamsMap?.get(participantGuid)
    return (
      <StudentDiv
        key={participantGuid}
        isEmpty={false}
        innerRef={(x) => {
          this.divElement = x
        }}
      >
        <TilesContainer>
          <TileDiv>{this.getResolution(streams)}</TileDiv>
          <TileDiv>
            {streams?.metaData?.fps ? `fps:${streams?.metaData?.fps}` : ''}
          </TileDiv>
        </TilesContainer>
        <ParticipantNameDiv>
          <span>{name}</span>
        </ParticipantNameDiv>
      </StudentDiv>
    )
  }
  renderStudent() {
    const streams = this.viewModel.videoStreamsMap?.get(
      this.props.participant.participantGuid,
    )
    if (!this.props.participant?.isVideoMuted && streams) {
      return this.renderVideoTile()
    } else {
      return this.renderAudioTile()
    }
  }

  render() {
    return <>{this.renderStudent()}</>
  }
}

export default Thumbnail
