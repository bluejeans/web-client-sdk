import { action, computed, observable, reaction, observe } from "mobx";
import Managers from "../stores/Managers";
import AppManager, { AppState } from "../stores/AppManager";
import { BJNWebClientSDK, ConnectionState, VideoState, VideoLayout, ConnectionMode } from '@bluejeans/web-client-sdk';

const CC_DISPLAY_CHAR_LIMIT : number = 250;
export enum ClosedCaptioningState {
    CONNECTING = "Connecting",
    CONNECTED = "Connected",
    DISCONNECTED = "Disconnected"
}
export default class AppViewModel {

    private appManager : AppManager;
    private webrtcSDK : BJNWebClientSDK;
    @observable private hasLoadingTranscriptShown : boolean;
    isLayoutTransitionFromCUSTOMToBJN: boolean = false;

    constructor(managers : Managers) {
        this.appManager = managers.appManager;
        this.webrtcSDK = managers.webrtcSDK;

        reaction(() => this.webrtcSDK.meetingService.closedCaptioningService?.closedCaptioningState, (closedCaptioningState:ClosedCaptioningState) => {
            this.setLoadingMessageState(closedCaptioningState);
        })

        observe(this.webrtcSDK.meetingService, "videoLayout", (change) => {
            if(change.oldValue === VideoLayout.CUSTOM && change.newValue) {
                this.isLayoutTransitionFromCUSTOMToBJN = true;
            } else {
                this.isLayoutTransitionFromCUSTOMToBJN = false
            }
        });

    }

    @computed get renderMeetingView(){
        switch (this.webrtcSDK.meetingService.connectionState) {
            case ConnectionState.CONNECTED:
            case ConnectionState.RECONNECTING:
            case ConnectionState.IDLE:
                return true;
            default:
                return false;
        }
    }

    @computed get isMeetingConnected(): boolean {
        return this.webrtcSDK.meetingService.connectionState === ConnectionState.CONNECTED;
    }

    @computed get appState() : AppState {
        return this.appManager.appState
    }

    @computed get joiningStarted () : boolean {
        return this.appManager.isJoiningMeeting
    }

    @computed get showMeetingVideo () : boolean {
        return this.joiningStarted && this.webrtcSDK.meetingService.connectionState !== ConnectionState.WAITINGROOM;
    }

    @computed get videoMessage () : string {
        if (this.webrtcSDK.meetingService.contentService?.receivingContentShare) {
            return ""
        } else if (this.webrtcSDK.meetingService.connectionState == ConnectionState.CONNECTING) {
            return "Connecting...";
        } else if (this.webrtcSDK.meetingService.connectionState == ConnectionState.RECONNECTING) {
            return "Reconnecting...";
        } else if (this.webrtcSDK.meetingService.videoState == VideoState.INACTIVE_NEEDS_MODERATOR) {
            return "Waiting for the moderator"
        } else if (this.webrtcSDK.meetingService.videoState == VideoState.INACTIVE_ONLY_PARTICIPANT) {
            return "Please wait while others join"
        } else if (this.webrtcSDK.meetingService.connectionState == ConnectionState.IDLE){
            return "Disconnected from meeting"
        } else {
            return ""
        }
    }

    @computed get showRemoteContent () : boolean {
        return this.webrtcSDK.meetingService.connectionState == ConnectionState.CONNECTED &&  this.webrtcSDK.meetingService.contentService?.receivingContentShare
    }

    attachLocalVideo(videoElement: HTMLVideoElement) {
        this.webrtcSDK.meetingService.attachLocalVideo(videoElement);
    }

    attachRemoteVideo(videoElement: HTMLDivElement) {
        this.webrtcSDK.meetingService.attachRemoteVideo(videoElement);
    }

    attachRemoteContent(videoElement: HTMLVideoElement) {
        this.webrtcSDK.meetingService.attachRemoteContent(videoElement);
    }


  @computed get showCaptionText() : boolean {
    return this.webrtcSDK.meetingService.closedCaptioningService?.isClosedCaptioningAvailable  && this.captionText?.length > 0;
}

  @action private setLoadingMessageState(closedCaptioningState) : void {
    if(closedCaptioningState === ClosedCaptioningState.CONNECTING) {
        this.hasLoadingTranscriptShown = false;
        setTimeout(action(() => {
            this.hasLoadingTranscriptShown = true
        }), 4000)
    } else {
        this.hasLoadingTranscriptShown = true;
    }
}

    @computed get captionText(): string {
        let messageToUI;
        if ((this.webrtcSDK.meetingService.closedCaptioningService?.closedCaptioningState === ClosedCaptioningState.CONNECTING) && !this.hasLoadingTranscriptShown) {
            return messageToUI = "loading";
        } else {
            // Trimming the string to the max length, which we can display in the screen.
            messageToUI = this.webrtcSDK.meetingService.closedCaptioningService?.closedCaptionText;
            return messageToUI?.length > CC_DISPLAY_CHAR_LIMIT ? `${messageToUI.slice(0, CC_DISPLAY_CHAR_LIMIT)}...` : messageToUI
        }
    }

    @computed get screenShareOnly() {
        return this.webrtcSDK.meetingService.connectionMode === ConnectionMode.ScreenShareOnly
    }
}