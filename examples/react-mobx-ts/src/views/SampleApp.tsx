import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { computed } from 'mobx'
import Managers from '../stores/Managers'
import { AppState } from '../stores/AppManager'
import PreMeetingView from './PreMeetingView'
import WaitingRoom from './WaitingRoom'
import MeetingView from './MeetingView'
import MeetingViewModel from './MeetingViewModel'
import JoiningView from './JoiningView'
import AppViewModel from './AppViewModel'
import CustomLayout from './CustomLayout/CustomLayout'
import {
  LocalVideoHolder,
  SharedScreenHolder,
  VideoHolder,
  VideoMessage,
  BuildInfo,
  Container,
  CaptionTextContainer,
  CaptionTextSpan,
  RightContainer,
  NoContentShared,
} from './Common/styles/Common'

declare const __SDK_PACKAGE_VERSION__: string

interface Props {
  managers: Managers
}

@observer
export default class SampleApp extends Component<Props> {
  private viewModel: AppViewModel
  private meetingViewModel: MeetingViewModel

  private remoteVideoElement = React.createRef<HTMLDivElement>()
  private localVideoElement = React.createRef<HTMLVideoElement>()
  private remoteContentElement = React.createRef<HTMLVideoElement>()

  constructor(props: Props) {
    super(props)
    this.viewModel = new AppViewModel(props.managers)
    this.meetingViewModel = new MeetingViewModel(props.managers)

    console.log(`version : webrtc SDK ${__SDK_PACKAGE_VERSION__} `)
  }

  componentDidMount() {
    this.viewModel.attachRemoteVideo(this.remoteVideoElement.current)
    this.viewModel.attachLocalVideo(this.localVideoElement.current)
    this.viewModel.attachRemoteContent(this.remoteContentElement.current)
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {
    /**
     * In CUSTOM view, we remove the container containing remote videos and self view from sample app.
     * Hence, on change of layout from CUSTOM to any BJN layout, we need to re-render their container
     * followed by the remote videos and self view.
     * On rejoin/promotion from the waiting room since we reset the selected video layout,
     * therefore, we are relying on connection state change to check if we should re-render again.
     */
    const vm = this.viewModel
    if (
      !vm.screenShareOnly &&
      (vm.isLayoutTransitionFromCUSTOMToBJN || vm.renderMeetingView)
    ) {
      vm.attachRemoteVideo(this.remoteVideoElement.current)
      vm.attachLocalVideo(this.localVideoElement.current)
    }
  }

  @computed private get viewToShow(): JSX.Element {
    switch (this.viewModel.appState) {
      case AppState.PRE_MEETING:
        return this.viewModel.joiningStarted ? (
          <JoiningView />
        ) : (
          <PreMeetingView managers={this.props.managers} />
        )
      case AppState.WAITING_ROOM:
        return <WaitingRoom managers={this.props.managers} />
      case AppState.IN_MEETING:
      case AppState.POST_MEETING:
        return (
          this.viewModel.renderMeetingView && (
            <MeetingView managers={this.props.managers} />
          )
        )
    }
  }

  render() {
    return (
      <Container>
        <RightContainer>
          {!this.viewModel.screenShareOnly && (
            <>
              <LocalVideoHolder show={this.viewModel.showMeetingVideo}>
                <video ref={this.localVideoElement}></video>
              </LocalVideoHolder>
              <CaptionTextContainer>
                {this.viewModel.isMeetingConnected && (
                  <CaptionTextSpan>
                    {this.viewModel.captionText}
                  </CaptionTextSpan>
                )}
              </CaptionTextContainer>
              {this.meetingViewModel.isCustomVideoLayout ? (
                <VideoHolder show={this.viewModel.showMeetingVideo}>
                  <VideoMessage>{this.viewModel.videoMessage}</VideoMessage>
                  <div
                    className='remoteVideo'
                    ref={this.remoteVideoElement}
                  ></div>
                </VideoHolder>
              ) : (
                <CustomLayout managers={this.props.managers} />
              )}
            </>
          )}
          <SharedScreenHolder show={this.viewModel.showRemoteContent}>
            <video ref={this.remoteContentElement}></video>
          </SharedScreenHolder>
          {this.viewModel.screenShareOnly &&
            this.viewModel.isMeetingConnected &&
            !this.viewModel.showRemoteContent && (
              <NoContentShared>No content is being shared.</NoContentShared>
            )}
        </RightContainer>
        {this.viewToShow}
        <BuildInfo>{`version : webrtc SDK - ${__SDK_PACKAGE_VERSION__} `}</BuildInfo>
      </Container>
    )
  }
}
