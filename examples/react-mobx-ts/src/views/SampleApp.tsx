import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import Managers from '../stores/Managers';
import { AppState } from '../stores/AppManager';
import PreMeetingView from './PreMeetingView';
import WaitingRoom from './WaitingRoom'
import MeetingView from "./MeetingView"
import JoiningView from "./JoiningView"
import AppViewModel from './AppViewModel';
import { LocalVideoHolder, SharedScreenHolder,  RemoteContentHolder, VideoHolder, VideoMessage, BuildInfo, Container, CaptionTextContainer, CaptionTextSpan } from "./styles/Common";

declare const
    __SDK_PACKAGE_VERSION__: string

interface Props {
    managers: Managers   
}

@observer
export default class SampleApp extends Component<Props> {

    private viewModel : AppViewModel;

    private remoteVideoElement = React.createRef<HTMLDivElement>();
    private localVideoElement = React.createRef<HTMLVideoElement>();
    private remoteContentElement = React.createRef<HTMLVideoElement>();
    
    constructor(props: Props) {
        super(props);
        this.viewModel = new AppViewModel(props.managers);
        console.log(`version : webrtc SDK ${__SDK_PACKAGE_VERSION__} `);
    }

    componentDidMount() {
        this.viewModel.attachRemoteVideo(this.remoteVideoElement.current)
        this.viewModel.attachLocalVideo(this.localVideoElement.current)
        this.viewModel.attachRemoteContent(this.remoteContentElement.current)
    }

    @computed private get viewToShow() : JSX.Element {
        switch(this.viewModel.appState) {
            case AppState.PRE_MEETING:
                return this.viewModel.joiningStarted ? <JoiningView/> : <PreMeetingView managers={ this.props.managers }/>
            case AppState.WAITING_ROOM:
                return <WaitingRoom managers={ this.props.managers }/>
            case AppState.IN_MEETING:
            case AppState.POST_MEETING:
                return this.viewModel.renderMeetingView && <MeetingView  managers={ this.props.managers } />
        }
    }
    render() {

        return (
            <Container>
                <VideoHolder show={ this.viewModel.showMeetingVideo }>
                    <VideoMessage>{ this.viewModel.videoMessage }</VideoMessage>
                    <div className= "remoteVideo" ref={this.remoteVideoElement}></div>
                    <LocalVideoHolder>
                        <video ref={this.localVideoElement}></video>
                    </LocalVideoHolder>   
                    <CaptionTextContainer>
                       {this.viewModel.isMeetingConnected && <CaptionTextSpan>{this.viewModel.captionText}</CaptionTextSpan>} 
                    </CaptionTextContainer>                                   
                </VideoHolder>
                <SharedScreenHolder show={ this.viewModel.showRemoteContent }>  
                    <RemoteContentHolder show= { this.viewModel.showRemoteContent }>
                        <video ref={this.remoteContentElement}></video>
                    </RemoteContentHolder>                                   
                </SharedScreenHolder>
                { this.viewToShow }
                <BuildInfo>{`version : webrtc SDK - ${__SDK_PACKAGE_VERSION__} `}</BuildInfo>
            </Container>
        )
    }
}