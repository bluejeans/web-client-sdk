import { computed,action } from "mobx";
import Managers from "../stores/Managers";
import AppManager, { AppState } from "../stores/AppManager";
import { BJNWebClientSDK } from '@bluejeans/web-client-sdk';

export default class WaitingRoomViewModel {

    private appManager: AppManager;
    private webrtcSDK: BJNWebClientSDK;


    constructor(managers: Managers) {
        this.appManager = managers.appManager;
        this.webrtcSDK = managers.webrtcSDK;
    }

    @computed get appState(): AppState {
        return this.appManager.appState;
    }

    attachPreviewVideo(videoElement: HTMLVideoElement) {
        this.webrtcSDK.meetingService.attachLocalVideo(videoElement);
    }


    @action togglePreview() {
        if (this.webrtcSDK.meetingService.videoMuted) {
            this.webrtcSDK.meetingService.setVideoMuted(false);
        }
        else {
            this.webrtcSDK.meetingService.setVideoMuted(true);
        }
    }

    @action toggleAudio() {
        if (this.webrtcSDK.meetingService.audioMuted) {
            this.webrtcSDK.meetingService.setAudioMuted(false);
        }
        else {
            this.webrtcSDK.meetingService.setAudioMuted(true);
        }
    }

    @computed get isAudioMuted(){
        return this.webrtcSDK.meetingService.audioMuted;
    }

    @computed get isVideoMuted(){
        return this.webrtcSDK.meetingService.videoMuted;
    }
}