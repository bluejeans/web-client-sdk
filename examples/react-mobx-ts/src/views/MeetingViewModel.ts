import { action, computed, observable } from "mobx";
import Managers from "../stores/Managers";
import AppManager from "../stores/AppManager";
import { AudioVideoDevice, BJNWebClientSDK, ConnectionState, VideoLayout, Participant, ContentShareState } from '@bluejeans/web-client-sdk';
import ChatUIManager from "../stores/ChatUIManager";
import { emailRegex } from "../Utils/Constants"

export default class MeetingViewModel {

    private appManager : AppManager;
    private webrtcSDK : BJNWebClientSDK;
    private chatUIManager : ChatUIManager;
    @observable emailId: string = "";
    @observable comments: string = "";
    @observable showLogUpload: boolean = false;
    @observable invalidEmail: boolean = false;
    @observable showLogUploadStatus: boolean = false;
    @observable logUploadStatus: string = "";


    constructor(managers : Managers) {
        this.appManager = managers.appManager;
        this.webrtcSDK = managers.webrtcSDK;
        this.chatUIManager = managers.chatUIManager;
    }

    @computed get joinName() : string {
        return (this.webrtcSDK.meetingService.participantService.selfParticipant && this.webrtcSDK.meetingService.participantService.selfParticipant.name) ? 
            this.webrtcSDK.meetingService.participantService.selfParticipant.name : "Guest";
    }
    @action.bound setEmailId(email : string) : void {
        this.emailId = email;
      }

    @action.bound setComments(comments : string) : void {
        this.comments = comments;
      }
    
    @action.bound setShowLogUpload() : void {
        this.showLogUpload = !this.showLogUpload;
      }  

    @computed get participantsCount() : number {
        return this.webrtcSDK.meetingService.participantService.participants ? this.webrtcSDK.meetingService.participantService.participants.length : 1;
    }

    @computed get participants() : Participant[] {
        return this.webrtcSDK.meetingService.participantService.participants;
    }

    @computed get sharingScreen() : boolean {
        return this.webrtcSDK.meetingService.contentService.contentShareState === ContentShareState.STARTED;
    }

    @computed get meetingStatus() : string {
        let meetingStatus : string = ""
        switch(this.webrtcSDK.meetingService.connectionState) {
            case ConnectionState.CONNECTING:
                meetingStatus = "Connecting to Meeting";
                break;
            case ConnectionState.CONNECTED:
                meetingStatus = "Connected to Meeting";
                break;
            case ConnectionState.RECONNECTING:
                meetingStatus = "Reconnecting to Meeting";
                break;
            case ConnectionState.IDLE:
                meetingStatus = "Disconnected from Meeting";
                break;
        }
        return meetingStatus;
    }

    @computed get contentStatus() : string {
        return this.webrtcSDK.meetingService.contentService.contentShareState == ContentShareState.STARTED ? "Content sharing" : 
            (this.webrtcSDK.meetingService.contentService.receivingContentShare ? "Receiving" : "Not Receiving");
    }

    @computed get audioStatus() : string {
        return this.webrtcSDK.meetingService.audioMuted ? "UnMute Audio" : "Mute Audio"
    }

    @computed get videoStatus() : string {
        return this.webrtcSDK.meetingService.videoMuted ? "UnMute Video" : "Mute Video"
    }

    @computed get sharingStatus() : string {
        return this.webrtcSDK.meetingService.contentService.contentShareState == ContentShareState.STARTED ? "Stop sharing" : "Start sharing"
    }


    @computed get videoLayout(): { id: VideoLayout, name: string } {
        return { id: this.webrtcSDK.meetingService.videoLayout, name: this.videoLayoutName(this.webrtcSDK.meetingService.videoLayout) }
    }

    @computed get isSpeakerSelectionAllowed(): boolean {
        return this.webrtcSDK.audioDeviceService.isSpeakerSelectionAllowed;
    }
    @computed get isMicrophoneSelectionAllowed(): boolean {
        return this.webrtcSDK.audioDeviceService.isMicrophoneSelectionAllowed;
    }

    get availableVideoLayouts(): { id: VideoLayout, name: string }[] {
        return [VideoLayout.SPEAKER, VideoLayout.PEOPLE, VideoLayout.GALLERY, VideoLayout.FILMSTRIP].map(videoLayout => {
            return { id: videoLayout, name: this.videoLayoutName(videoLayout) }
        })
    }

    private videoLayoutName(videoLayout: VideoLayout): string {
        switch (videoLayout) {
            case VideoLayout.SPEAKER:
                return "Speaker View"
            case VideoLayout.PEOPLE:
                return "People View"
            case VideoLayout.GALLERY:
                return "Gallery View"
            case VideoLayout.FILMSTRIP:
                return "Filmstrip View"
        }
    }

    @computed get availableCameras() : AudioVideoDevice[] {
        return this.webrtcSDK.videoDeviceService.availableCameras
    }

    @computed get availableMicrophones() : AudioVideoDevice[] {
        return this.webrtcSDK.audioDeviceService.availableMicrophones
    }

    @computed get availableSpeakers() : AudioVideoDevice[] {
        return this.webrtcSDK.audioDeviceService.availableSpeakers
    }

    @computed get selectedCamera() : AudioVideoDevice {
        return this.webrtcSDK.videoDeviceService.selectedCamera
    }

    @computed get selectedMicrophone() : AudioVideoDevice {
        return this.webrtcSDK.audioDeviceService.selectedMicrophone
    }

    @computed get selectedSpeaker() : AudioVideoDevice {
        return this.webrtcSDK.audioDeviceService.selectedSpeaker
    }

    @computed get isDisconnected() : boolean {
        return (this.webrtcSDK.meetingService.connectionState === ConnectionState.IDLE);
    }

    @computed get isScreenShareSupported() : boolean {
        return this.webrtcSDK.meetingService.contentService.isContentShareSupported;
    }

    @computed get leaveBtnText() : string {
        return this.isDisconnected ? "Home Page" : "Leave Meeting";
    }

    @computed get leaveBtnTitle() : string {
        return this.isDisconnected ? "To reload and land on meeting join screen" : "To leave the call";
    }

    @action.bound setJoinName(event) : void {
        let joinName = event.target.value;
        if(joinName) {
            this.webrtcSDK.meetingService.setName(joinName);
        }
    }

    @action.bound toggleVideoState() : void {
        this.webrtcSDK.meetingService.setVideoMuted(!this.webrtcSDK.meetingService.videoMuted)
    }

    @action.bound toggleAudioState() : void {
        this.webrtcSDK.meetingService.setAudioMuted(!this.webrtcSDK.meetingService.audioMuted)
    }

    @action.bound toggleScreenShare() : void {
        if(this.webrtcSDK.meetingService.contentService.contentShareState == ContentShareState.STARTED ) {
            this.webrtcSDK.meetingService.contentService.stopContentShare();
        } else {
            this.webrtcSDK.meetingService.contentService.startContentShare();
        }
    }

    @action.bound setVideoLayout(layout: { id: VideoLayout, name: string }) {
        this.webrtcSDK.meetingService.setVideoLayout(layout.id)
    }


    @action.bound selectCamera(device: AudioVideoDevice) {
        this.webrtcSDK.videoDeviceService.selectCamera(device)
    }

    @action.bound selectMicrophone(device: AudioVideoDevice) {
        this.webrtcSDK.audioDeviceService.selectMicrophone(device)
    }

    @action.bound selectSpeaker(device: AudioVideoDevice) {
        this.webrtcSDK.audioDeviceService.selectSpeaker(device)
    }

    @action.bound onLeaveMeetingBtnClick() : void {
        if(this.isDisconnected) {
            this.appManager.redirectToHomePage();
        } else {
            this.appManager.setSelfTriggeredLeaveMeeting(true);
            this.appManager.leaveMeeting();
        }
    }

    @action.bound rejoin() : void {
        this.appManager.setSelfTriggeredLeaveMeeting(true);
        this.appManager.rejoin();
    }
    @action.bound uploadLogs(): void {
        if (this.emailId.match(emailRegex)) {
          this.showLogUploadStatus = true;
          this.logUploadStatus = "In Progress...";
          this.webrtcSDK.loggingService
            .uploadLog(this.comments, this.emailId)
            .then(
              action(() => {
                this.logUploadStatus = "Success";
                this.hideLogUploadStatus();
              })
            )
            .catch(
              action((err) => {
                this.logUploadStatus = "Failed with Error: " + err;
                this.hideLogUploadStatus();
              })
            );
          this.invalidEmail = false;
        } else {
          this.invalidEmail = true;
        }
      }
    
      @action.bound hideLogUploadStatus(): void {
        let timeoutID = window.setTimeout(
          action(() => {
            this.showLogUploadStatus = false;
            this.logUploadStatus = "";
            window.clearTimeout(timeoutID);
          }),
          8000
        );
      }

    @computed get unreadMessageCount() : number {
      return (this.chatUIManager.unreadPrivateMessagesCount + this.chatUIManager.unreadPublicMessagesCount);
    }
    
    @computed get showChatPanel() : boolean {
        return this.appManager.showChatPanel;
    }

    @action setShowChatPanel(value : boolean) {
        this.appManager.setShowChatPanel(value);
    }

}