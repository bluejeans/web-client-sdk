import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {
  WaitingContainer,
  LocalVideoHolderTest,
  PreviewHolder,
  ToggleButton,
} from './styles/WaitingRoom'
import Managers from '../stores/Managers'
import WaitingRoomViewModel from './WaitingRoomViewModel'

interface Props {
  managers: Managers
}

@observer
export default class WaitingRoom extends Component<Props> {
  private previewVideoElement = React.createRef<HTMLVideoElement>()
  private waitingRoomViewModel: WaitingRoomViewModel

  constructor(props: Props) {
    super(props)
    this.waitingRoomViewModel = new WaitingRoomViewModel(props.managers)
  }

  componentDidMount() {
    this.waitingRoomViewModel.attachPreviewVideo(
      this.previewVideoElement.current,
    )
  }
  render() {
    return (
      <WaitingContainer>
        <PreviewHolder>
          <LocalVideoHolderTest>
            <video ref={this.previewVideoElement}></video>
          </LocalVideoHolderTest>
          <ToggleButton
            onClick={this.waitingRoomViewModel.togglePreview.bind(
              this.waitingRoomViewModel,
            )}
          >
            {this.waitingRoomViewModel.isVideoMuted
              ? 'Unmute Video'
              : 'Mute Video'}
          </ToggleButton>
          <ToggleButton
            onClick={this.waitingRoomViewModel.toggleAudio.bind(
              this.waitingRoomViewModel,
            )}
          >
            {this.waitingRoomViewModel.isAudioMuted
              ? 'Unmute Audio'
              : 'Mute Audio'}
          </ToggleButton>
        </PreviewHolder>
        <div>You are in the waiting room</div>
      </WaitingContainer>
    )
  }
}
