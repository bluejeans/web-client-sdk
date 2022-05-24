import { computed } from "mobx";
import Managers from "../stores/Managers";
import AppManager, { AppState } from "../stores/AppManager";
import { BJNWebClientSDK, ConnectionState, VideoState, VideoLayout } from '@bluejeans/web-client-sdk';

export default class AppViewModel {

    private appManager : AppManager;
    private webrtcSDK : BJNWebClientSDK;

    constructor(managers : Managers) {
        this.appManager = managers.appManager;
        this.webrtcSDK = managers.webrtcSDK;
    }

    @computed get appState() : AppState {
        return this.appManager.appState
    }

    @computed get joiningStarted () : boolean {
        return this.appManager.isJoiningMeeting
    }

    @computed get showMeetingVideo () : boolean {
        return this.joiningStarted;
    }

    @computed get videoMessage () : string {
        if (this.webrtcSDK.meetingService.contentService.receivingContentShare) {
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
        return this.webrtcSDK.meetingService.contentService.receivingContentShare
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

}