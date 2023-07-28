import { action, computed, observable } from 'mobx'
import Managers from '../stores/Managers'
import AppManager from '../stores/AppManager'
import {
  AudioVideoDevice,
  BJNWebClientSDK,
  ConnectionState,
  VideoLayout,
  Participant,
  ContentShareState,
  ConnectionMode,
} from '@bluejeans/web-client-sdk'
import ChatUIManager from '../stores/ChatUIManager'
import CustomLayoutManager from '../stores/CustomLayoutManager'
import { emailRegex } from '../Utils/Constants'

export interface WaitingRoomParticipant {
  id: string
  name: string
}
export interface ErrorResponse {
  /** Appropiate error if available */
  error?: object
  /** Appropiate code to uniquely identify the response*/
  code: any
  /** Appropiate reason if available */
  reason?: string
}

export default class MeetingViewModel {
  private appManager: AppManager
  private webrtcSDK: BJNWebClientSDK
  private chatUIManager: ChatUIManager
  private customLayoutManager: CustomLayoutManager
  @observable emailId: string = ''
  @observable comments: string = ''
  @observable showLogUpload: boolean = false
  @observable invalidEmail: boolean = false
  @observable showLogUploadStatus: boolean = false
  @observable logUploadStatus: string = ''

  constructor(managers: Managers) {
    this.appManager = managers.appManager
    this.webrtcSDK = managers.webrtcSDK
    this.chatUIManager = managers.chatUIManager
    this.customLayoutManager = managers.customLayoutManager
  }

  @computed get joinName(): string {
    return this.webrtcSDK.meetingService.participantService?.selfParticipant &&
      this.webrtcSDK.meetingService.participantService.selfParticipant.name
      ? this.webrtcSDK.meetingService.participantService.selfParticipant.name
      : 'Guest'
  }
  @action.bound setEmailId(email: string): void {
    this.emailId = email
  }

  @action.bound setComments(comments: string): void {
    this.comments = comments
  }

  @action.bound setShowLogUpload(): void {
    this.showLogUpload = !this.showLogUpload
  }

  @computed get participantsCount(): number {
    return this.webrtcSDK.meetingService.participantService?.participants
      ? this.webrtcSDK.meetingService.participantService.participants.length
      : 1
  }

  @computed get participants(): Participant[] {
    return this.webrtcSDK.meetingService.participantService?.participants
  }

  @computed get WrParticipants(): WaitingRoomParticipant[] {
    if (
      // prettier would break following code into 2 lines and leave ts-ignore above both
      // prettier-ignore
      // @ts-ignore
      this.webrtcSDK.meetingService.moderatorWaitingRoomService?.waitingRoomParticipants?.length
    ) {
      return <WaitingRoomParticipant[]>(
        this.webrtcSDK.meetingService.moderatorWaitingRoomService
          .waitingRoomParticipants
      )
    }
    return []
  }

  @computed get isWaitingRoomEnabled(): boolean {
    return (
      this.webrtcSDK.meetingService.participantService?.selfParticipant
        ?.isModerator &&
      this.webrtcSDK.meetingService.moderatorWaitingRoomService
        ?.isWaitingRoomEnabled
    )
  }

  @computed get isWaitingRoomCapable(): boolean {
    return (
      this.webrtcSDK.meetingService.participantService?.selfParticipant
        ?.isModerator &&
      this.webrtcSDK.meetingService.moderatorWaitingRoomService
        ?.isWaitingRoomCapable
    )
  }

  @computed get sharingScreen(): boolean {
    return (
      this.webrtcSDK.meetingService.contentService?.contentShareState ===
      ContentShareState.STARTED
    )
  }

  @computed get meetingStatus(): string {
    let meetingStatus: string = ''
    switch (this.webrtcSDK.meetingService.connectionState) {
      case ConnectionState.CONNECTING:
        meetingStatus = 'Connecting to Meeting'
        break
      case ConnectionState.CONNECTED:
        meetingStatus = 'Connected to Meeting'
        break
      case ConnectionState.RECONNECTING:
        meetingStatus = 'Reconnecting to Meeting'
        break
      case ConnectionState.IDLE:
        meetingStatus = 'Disconnected from Meeting'
        break
    }
    return meetingStatus
  }

  @computed get contentStatus(): string {
    return this.webrtcSDK.meetingService.contentService?.contentShareState ==
      ContentShareState.STARTED
      ? 'Content sharing'
      : this.webrtcSDK.meetingService.contentService?.receivingContentShare
      ? 'Receiving'
      : 'Not Receiving'
  }

  @computed get audioStatus(): string {
    return this.webrtcSDK.meetingService.audioMuted
      ? 'UnMute Audio'
      : 'Mute Audio'
  }

  @computed get videoStatus(): string {
    return this.webrtcSDK.meetingService.videoMuted
      ? 'UnMute Video'
      : 'Mute Video'
  }

  @computed get sharingStatus(): string {
    return this.webrtcSDK.meetingService.contentService?.contentShareState ==
      ContentShareState.STARTED
      ? 'Stop sharing'
      : 'Start sharing'
  }

  @computed get videoLayout(): { id: VideoLayout; name: string } {
    return {
      id: this.webrtcSDK.meetingService.videoLayout,
      name: this.videoLayoutName(this.webrtcSDK.meetingService.videoLayout),
    }
  }

  @computed get connectionMode(): { id: ConnectionMode; name: string } {
    return {
      id: this.webrtcSDK.meetingService.connectionMode,
      name: this.webrtcSDK.meetingService.connectionMode as string,
    }
  }

  @computed get isSpeakerSelectionAllowed(): boolean {
    return this.webrtcSDK.audioDeviceService.isSpeakerSelectionAllowed
  }
  @computed get isMicrophoneSelectionAllowed(): boolean {
    return this.webrtcSDK.audioDeviceService.isMicrophoneSelectionAllowed
  }

  get availableVideoLayouts(): { id: VideoLayout; name: string }[] {
    return Object.keys(VideoLayout).map((key) => ({
      id: key as VideoLayout,
      name: this.videoLayoutName(VideoLayout[key]),
    }))
  }

  get availableConnectionModes(): { id: ConnectionMode; name: string }[] {
    return Object.keys(ConnectionMode).map((key) => ({
      id: key as ConnectionMode,
      name: ConnectionMode[key],
    }))
  }

  private videoLayoutName(videoLayout: VideoLayout): string {
    switch (videoLayout) {
      case VideoLayout.SPEAKER:
      default:
        return 'Speaker View'
      case VideoLayout.PEOPLE:
        return 'People View'
      case VideoLayout.GALLERY:
        return 'Gallery View'
      case VideoLayout.FILMSTRIP:
        return 'Filmstrip View'
      case VideoLayout.CUSTOM:
        return 'Custom View'
    }
  }

  @computed get availableCameras(): AudioVideoDevice[] {
    return this.webrtcSDK.videoDeviceService.availableCameras
  }

  @computed get availableMicrophones(): AudioVideoDevice[] {
    return this.webrtcSDK.audioDeviceService.availableMicrophones
  }

  @computed get availableSpeakers(): AudioVideoDevice[] {
    return this.webrtcSDK.audioDeviceService.availableSpeakers
  }

  @computed get selectedCamera(): AudioVideoDevice {
    return this.webrtcSDK.videoDeviceService.selectedCamera
  }

  @computed get selectedMicrophone(): AudioVideoDevice {
    return this.webrtcSDK.audioDeviceService.selectedMicrophone
  }

  @computed get selectedSpeaker(): AudioVideoDevice {
    return this.webrtcSDK.audioDeviceService.selectedSpeaker
  }

  @computed get isDisconnected(): boolean {
    return (
      this.webrtcSDK.meetingService.connectionState === ConnectionState.IDLE
    )
  }

  @computed get isScreenShareSupported(): boolean {
    return this.webrtcSDK.meetingService.contentService?.isContentShareSupported
  }

  @computed get leaveBtnText(): string {
    return this.isDisconnected ? 'Home Page' : 'Leave Meeting'
  }

  @computed get leaveBtnTitle(): string {
    return this.isDisconnected
      ? 'To reload and land on meeting join screen'
      : 'To leave the call'
  }

  @action.bound setJoinName(event): void {
    let joinName = event.target.value
    if (joinName) {
      this.webrtcSDK.meetingService.setName(joinName)
    }
  }

  @action.bound toggleVideoState(): void {
    this.webrtcSDK.meetingService.setVideoMuted(
      !this.webrtcSDK.meetingService.videoMuted,
    )
  }

  @action.bound toggleAudioState(): void {
    this.webrtcSDK.meetingService.setAudioMuted(
      !this.webrtcSDK.meetingService.audioMuted,
    )
  }

  @action.bound toggleWaitingRoom(): void {
    this.webrtcSDK.meetingService.moderatorWaitingRoomService
      .setWaitingRoomEnabled(!this.isWaitingRoomEnabled)
      .then()
      .catch((err) => {
        this.appManager.setErrorFlag(true)
        this.appManager.setErrorMessage(err)
      })
  }

  @action.bound admitParticipant(participant): void {
    this.webrtcSDK.meetingService.moderatorWaitingRoomService
      .admitParticipant(participant)
      .then()
      .catch((err) => {
        this.appManager.setErrorFlag(true)
        this.appManager.setErrorMessage(err)
      })
  }
  @action.bound denyParticipant(participant): void {
    this.webrtcSDK.meetingService.moderatorWaitingRoomService
      .denyParticipant(participant)
      .then()
      .catch((err) => {
        this.appManager.setErrorFlag(true)
        this.appManager.setErrorMessage(err)
      })
  }
  @action.bound admitAll(): void {
    this.webrtcSDK.meetingService.moderatorWaitingRoomService
      .admitAll()
      .then()
      .catch((err) => {
        this.appManager.setErrorFlag(true)
        this.appManager.setErrorMessage(err)
      })
  }
  @action.bound denyAll(): void {
    this.webrtcSDK.meetingService.moderatorWaitingRoomService
      .denyAll()
      .then()
      .catch((err) => {
        this.appManager.setErrorFlag(true)
        this.appManager.setErrorMessage(err)
      })
  }

  @action.bound toggleScreenShare(): void {
    if (
      this.webrtcSDK.meetingService.contentService.contentShareState ==
      ContentShareState.STARTED
    ) {
      this.webrtcSDK.meetingService.contentService.stopContentShare()
    } else {
      this.webrtcSDK.meetingService.contentService.startContentShare()
    }
  }

  @action.bound setVideoLayout(layout: { id: VideoLayout; name: string }) {
    this.webrtcSDK.meetingService.setVideoLayout(layout.id)
  }

  @action.bound setConnectionMode(mode: { id: ConnectionMode; name: string }) {
    this.webrtcSDK.meetingService.switchConnectionMode(mode.id)
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

  @action.bound onLeaveMeetingBtnClick(): void {
    this.customLayoutManager.setPinnedParticipant(null)
    if (this.isDisconnected) {
      this.appManager.redirectToHomePage()
    } else {
      this.appManager.setSelfTriggeredLeaveMeeting(true)
      this.appManager.leaveMeeting()
    }
  }

  @action.bound rejoin(): void {
    this.appManager.setSelfTriggeredLeaveMeeting(true)
    this.appManager.rejoin()
  }
  @action.bound uploadLogs(): void {
    if (this.emailId.match(emailRegex)) {
      this.showLogUploadStatus = true
      this.logUploadStatus = 'In Progress...'
      this.webrtcSDK.loggingService
        .uploadLog(this.comments, this.emailId)
        .then(
          action(() => {
            this.logUploadStatus = 'Success'
            this.hideLogUploadStatus()
          }),
        )
        .catch(
          action((err) => {
            this.logUploadStatus = 'Failed with Error: ' + err
            this.hideLogUploadStatus()
          }),
        )
      this.invalidEmail = false
    } else {
      this.invalidEmail = true
    }
  }

  @action.bound hideLogUploadStatus(): void {
    let timeoutID = window.setTimeout(
      action(() => {
        this.showLogUploadStatus = false
        this.logUploadStatus = ''
        window.clearTimeout(timeoutID)
      }),
      8000,
    )
  }

  @computed get unreadMessageCount(): number {
    return (
      this.chatUIManager.unreadPrivateMessagesCount +
      this.chatUIManager.unreadPublicMessagesCount
    )
  }

  @computed get showChatPanel(): boolean {
    return this.appManager.showChatPanel
  }

  @action setShowChatPanel(value: boolean) {
    this.appManager.setShowChatPanel(value)
  }

  @computed get showWaitingRoom(): boolean {
    return this.appManager.showWaitingRoom
  }

  @computed get getErrorMessage(): ErrorResponse {
    return this.appManager.errorMessage
  }

  @computed get getErrorFlag(): boolean {
    return this.appManager.isError
  }

  @action setWaitingRoom(value: boolean) {
    this.appManager.setWaitingRoom(value)
  }

  @computed get pinnedParticipantGuid() {
    if (
      !this.participants.some(
        (participant) =>
          participant.participantGuid ===
          this.customLayoutManager.pinnedParticipantGuid,
      )
    ) {
      return null
    }
    return this.customLayoutManager.pinnedParticipantGuid
  }
  @action isPinnedParticipantChecked(participant: Participant) {
    const secondModeratorParticipantGuid = this.participants.find(
      (participant) => !participant.isSelf && participant.isModerator,
    )?.participantGuid
    if (
      secondModeratorParticipantGuid === this.pinnedParticipantGuid &&
      secondModeratorParticipantGuid === participant.participantGuid
    ) {
      return true
    }
    return !(
      participant.isSelf ||
      secondModeratorParticipantGuid === participant.participantGuid ||
      (this.pinnedParticipantGuid &&
        this.pinnedParticipantGuid != participant.participantGuid)
    )
  }
  @computed get isCustomVideoLayout() {
    return this.videoLayout.id !== VideoLayout.CUSTOM
  }
  @action setPinnedParticipant(participantGuid) {
    return this.customLayoutManager.setPinnedParticipant(participantGuid)
  }
}
