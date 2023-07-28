import { action, computed, observable, reaction, when } from 'mobx'
import Managers from '../../stores/Managers'
import { BJNWebClientSDK, videoStream } from '@bluejeans/web-client-sdk'
import CustomLayoutManager from '../../stores/CustomLayoutManager'

export default class ModeratorViewModel {
  private webrtcSDK: BJNWebClientSDK
  private customLayoutManager: CustomLayoutManager

  constructor(managers: Managers) {
    this.webrtcSDK = managers.webrtcSDK
    this.customLayoutManager = managers.customLayoutManager
  }

  renderParticipants(participantGuid, element) {
    this.webrtcSDK.meetingService.videoStreamService?.attachParticipantToView(
      participantGuid,
      <HTMLDivElement>document.getElementById(`${element}`),
    )
  }

  @computed get videoStreamsMap(): Map<string, videoStream> {
    return this.customLayoutManager.videoStreamsMap
  }

  initials(participant): string {
    return this.customLayoutManager.getInitials(participant)
  }
}
