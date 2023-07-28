import { action, computed, observable, reaction } from 'mobx'
import {
  BJNWebClientSDK,
  Participant,
  videoStream,
  StreamQuality,
  StreamPriority,
  VideoLayout,
} from '@bluejeans/web-client-sdk'

export default class CustomLayoutManager {
  private webrtcSDK: BJNWebClientSDK
  @observable selectedParticipant: Participant
  @observable pinnedParticipantGuid: string
  @observable isPinningEnabled: boolean = false

  constructor(webrtcSDK: BJNWebClientSDK) {
    this.webrtcSDK = webrtcSDK
    reaction(
      () => this.pinnedParticipant?.participantGuid,
      () => {
        this.setVideoStreamConfiguration()
      },
    )
  }

  setVideoStreamConfiguration() {
    //[NOTE]: any request made for high priority should be at top of videoStreamConfig
    let config = []
    if (this.getVideoStreamConfigForFirstModerator) {
      config.push(this.getVideoStreamConfigForFirstModerator)
    }
    if (this.getVideoStreamConfigPinnedParticipant) {
      config.push(this.getVideoStreamConfigPinnedParticipant)
    }
    config = [...config, ...this.getVideoStreamConfiguration]
    this.webrtcSDK.meetingService.videoStreamService?.setVideoStreamConfiguration(
      config,
    )
  }

  @computed get getVideoStreamConfigForFirstModerator() {
    if (!this.firstModerator?.isVideoMuted) {
      return {
        participantGuid: this.firstModerator?.participantGuid,
        streamQuality: StreamQuality.r720p_30fps,
        streamPriority: StreamPriority.HIGH,
      }
    }
  }

  @computed get getVideoStreamConfigPinnedParticipant() {
    if (this.pinnedParticipant && !this.pinnedParticipant.isVideoMuted) {
      return {
        participantGuid: this.pinnedParticipant?.participantGuid,
        streamQuality: StreamQuality.r720p_30fps,
        streamPriority: StreamPriority.HIGH,
      }
    }
  }
  get getVideoStreamConfiguration() {
    return [
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
      {
        streamQuality: StreamQuality.r180p_30fps,
        streamPriority: StreamPriority.MEDIUM,
      },
    ]
  }

  @computed get firstModerator() {
    if (this.webrtcSDK.meetingService.videoLayout === VideoLayout.CUSTOM) {
      let arrWithoutSelfParticipant =
        this.webrtcSDK.meetingService.participantService?.participants.slice(1)
      let indexOfFirstModerator = arrWithoutSelfParticipant?.findIndex(
        (i) => i.isModerator,
      )
      if (
        arrWithoutSelfParticipant?.[indexOfFirstModerator]?.participantGuid ===
        this.pinnedParticipant?.participantGuid
      ) {
        return arrWithoutSelfParticipant?.[-1]
      }
      return arrWithoutSelfParticipant?.[indexOfFirstModerator]
    }
  }

  @computed get videoStreamsMap(): Map<string, videoStream> {
    let videoStreamsArr =
      this.webrtcSDK.meetingService.videoStreamService?.videoStreams?.map(
        (obj) => {
          return Object.assign({}, obj)
        },
      )
    let videoStreamMap = videoStreamsArr?.reduce((acc, elem) => {
      acc.set(elem.participantGuid, elem)
      return acc
    }, new Map())

    return videoStreamMap
  }

  @computed get alphabeticallySortedParticipants() {
    let arrWithoutSelfParticipant =
      this.webrtcSDK.meetingService.participantService?.participants?.slice(1)
    let indexOfFirstModerator = arrWithoutSelfParticipant?.findIndex(
      (i) => i.isModerator,
    )
    let arrWithoutFirstModAndSelfParticipant =
      arrWithoutSelfParticipant?.filter((v, i) => i != indexOfFirstModerator) //.map(obj => Object.assign({}, obj))
    //      participantGuid: obj.participantGuid, name: obj.name })) // in-place array modification, removing index of first mod
    arrWithoutFirstModAndSelfParticipant.sort((a, b) =>
      a.name?.localeCompare(b.name),
    )
    if (this.pinnedParticipant) {
      return arrWithoutFirstModAndSelfParticipant.filter(
        (item) =>
          item.participantGuid !== this.pinnedParticipant.participantGuid,
      ) // remove pinned participant
    }
    return arrWithoutFirstModAndSelfParticipant
  }

  getInitials(participant): string {
    let initials = ''
    if (participant?.name) {
      let splitName = participant.name.trim().split(' ')
      if (splitName.length === 1) {
        initials = splitName[0][0]
      } else {
        initials = splitName[0][0] + splitName[splitName.length - 1][0]
      }
    }
    return initials
  }

  @action setPinnedParticipant(pinnedParticipantGuid: string) {
    this.isPinningEnabled = !this.isPinningEnabled
    if (this.isPinningEnabled) {
      this.pinnedParticipantGuid = pinnedParticipantGuid
    } else {
      this.pinnedParticipantGuid = null
    }
  }

  @computed get pinnedParticipant() {
    const pinnedParticipant = this.pinnedParticipantGuid
    return this.webrtcSDK.meetingService.participantService?.participants?.find(
      (participant) => participant.participantGuid === pinnedParticipant,
    )
  }
}
