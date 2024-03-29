import { computed, action, observable, reaction } from 'mobx'
import {
  BJNWebClientSDK,
  ConnectionState,
  ErrorInfo,
  Error,
  ConnectionMode,
  OptionalJoinProps,
  VIDEO_SOURCE,
} from '@bluejeans/web-client-sdk'

export enum AppState {
  PRE_MEETING = 'PreMeeting',
  IN_MEETING = 'InMeeting',
  POST_MEETING = 'PostMeeting',
  WAITING_ROOM = 'WaitingRoom',
}

export interface JoinProps {
  meetingID: string
  passcode: string
  joinName: string
  optionalJoinProps: OptionalJoinProps
}

export interface ErrorResponse {
  /** Appropiate error if available */
  error?: object
  /** Appropiate code to uniquely identify the response*/
  code: any
  /** Appropiate reason if available */
  reason?: string
}

export default class AppManager {
  private webrtcSDK: BJNWebClientSDK

  @observable joinProps: JoinProps
  @observable isJoiningMeeting: boolean // used for intermediate joining transition screen
  @observable meetingJoinError: string = ''
  @observable sdkInitializationFailed: boolean = false
  @observable canTryJoining: boolean = true // used for enabling disabling join button
  @observable selfTriggeredLeaveMeeting: boolean = false
  @observable showChatPanel: boolean = false
  @observable disconnectedAfterMeeting: boolean = false
  @observable showWaitingRoom: boolean = false
  @observable errorMessage: ErrorResponse
  @observable isError: boolean = false
  @observable customDivDummy = [
    {
      participantGuid: 'seamguid_3604c88d-9a16-46c7-ba1b-ffecdd726ec4',
      resolution: {
        height: 360,
        width: 640,
      },
      metaData: {
        fps: 30,
      },
      name: 'AK1',
    },
    {
      participantGuid: 'seamguid_3604c88d-9a16-46c7-ba1b-ffecdd726ec4',
      resolution: {
        height: 360,
        width: 640,
      },
      metaData: {
        fps: 30,
      },
      name: 'AK2',
    },
    {
      participantGuid: 'seamguid_3604c88d-9a16-46c7-ba1b-ffecdd726ec4',
      resolution: {
        height: 360,
        width: 640,
      },
      metaData: {
        fps: 30,
      },
      name: 'AK3',
    },
    {
      participantGuid: 'seamguid_3604c88d-9a16-46c7-ba1b-ffecdd726ec4',
      resolution: {
        height: 360,
        width: 640,
      },
      metaData: {
        fps: 30,
      },
      name: 'AK4',
    },
    {
      participantGuid: 'seamguid_3604c88d-9a16-46c7-ba1b-ffecdd726ec4',
      resolution: {
        height: 360,
        width: 640,
      },
      metaData: {
        fps: 30,
      },
      name: 'AK5',
    },
    {
      participantGuid: 'seamguid_3604c88d-9a16-46c7-ba1b-ffecdd726ec4',
      resolution: {
        height: 360,
        width: 640,
      },
      metaData: {
        fps: 30,
      },
      name: 'AK6',
    },
    {
      participantGuid: 'seamguid_3604c88d-9a16-46c7-ba1b-ffecdd726ec4',
      resolution: {
        height: 360,
        width: 640,
      },
      metaData: {
        fps: 30,
      },
      name: 'AK7',
    },
    {
      participantGuid: 'seamguid_3604c88d-9a16-46c7-ba1b-ffecdd726ec4',
      resolution: {
        height: 360,
        width: 640,
      },
      metaData: {
        fps: 30,
      },
      name: 'AK8',
    },
    {
      participantGuid: 'seamguid_3604c88d-9a16-46c7-ba1b-ffecdd726ec4',
      resolution: {
        height: 360,
        width: 640,
      },
      metaData: {
        fps: 30,
      },
      name: 'AK9',
    },
    {
      participantGuid: 'seamguid_3604c88d-9a16-46c7-ba1b-ffecdd726ec4',
      resolution: {
        height: 360,
        width: 640,
      },
      metaData: {
        fps: 30,
      },
      name: 'AK10',
    },
    {
      participantGuid: 'seamguid_3604c88d-9a16-46c7-ba1b-ffecdd726ec4',
      resolution: {
        height: 360,
        width: 640,
      },
      metaData: {
        fps: 30,
      },
      name: 'AK11',
    },
    {
      participantGuid: 'seamguid_3604c88d-9a16-46c7-ba1b-ffecdd726ec4',
      resolution: {
        height: 360,
        width: 640,
      },
      metaData: {
        fps: 30,
      },
      name: 'AK12',
    },
  ]

  constructor(webrtcSDK: BJNWebClientSDK) {
    this.webrtcSDK = webrtcSDK
    this.joinMeetingWithParams()

    reaction(
      () =>
        this.webrtcSDK.meetingService.connectionState === ConnectionState.IDLE,
      () => {
        if (this.isJoiningMeeting) {
          // this indicates meeting join has been initiated, and now if connection state is idle, it indicates endMeeting
          this.disconnectedAfterMeeting = true
        }
      },
    )
  }

  @action redirectToHomePage(): void {
    this.setJoiningMeeting(false)
    this.setCanTryJoining(true)
    this.disconnectedAfterMeeting = false // resetting the flag that was set true after disconnecting from meeting
  }

  @computed get appState(): AppState {
    if (
      this.webrtcSDK.meetingService.connectionState ===
      ConnectionState.WAITINGROOM
    ) {
      return AppState.WAITING_ROOM
    }
    if (this.disconnectedAfterMeeting) {
      return AppState.POST_MEETING
    } else if (
      this.webrtcSDK.meetingService.connectionState === ConnectionState.IDLE ||
      !this.isJoiningMeeting
    ) {
      return AppState.PRE_MEETING
    } else {
      return AppState.IN_MEETING
    }
  }

  @action setJoiningMeeting(joining: boolean): void {
    this.isJoiningMeeting = joining
  }

  @action.bound setJoinProps(joinProps: JoinProps): void {
    this.joinProps = joinProps
  }

  @action setMeetingJoinError(error: string): void {
    this.meetingJoinError = error
  }

  @action setSdkInitializationFailed(val: boolean): void {
    this.sdkInitializationFailed = val
  }

  @action setCanTryJoining(val: boolean): void {
    this.canTryJoining = val
  }

  @action setShowChatPanel(value: boolean): void {
    this.showChatPanel = value
  }
  @action setWaitingRoom(value: boolean): void {
    this.showWaitingRoom = value
  }

  reload(): void {
    window.location.reload()
  }

  joinMeetingWithParams(): void {
    let urlEncoded: string = window.location.href
    let url: string = decodeURIComponent(urlEncoded)
    if (url.indexOf('?') > 0) {
      let queryIndex = url.indexOf('?')
      let query: string = url.slice(queryIndex)
      let meetingID: string = ''
      let passcode: string = ''
      let joinName: string = ''
      let connectionMode = ConnectionMode.Default
      let fragmentParams
      let eid: string = ''
      let queryList: string[] = query.slice(1).split('&')
      for (let i = 0; i < queryList.length; i++) {
        let queryElem: string = queryList[i]
        if (queryElem.indexOf('meetingID=') > -1) {
          meetingID = queryElem.slice(queryElem.indexOf('meetingID=') + 10)
        } else if (queryElem.indexOf('passcode=') > -1) {
          passcode = queryElem.slice(queryElem.indexOf('passcode=') + 9)
        } else if (queryElem.indexOf('joinName=') > -1) {
          joinName = queryElem.slice(queryElem.indexOf('joinName=') + 9)
        } else if (queryElem.indexOf('connectionMode=') > -1) {
          connectionMode = queryElem.slice(
            queryElem.indexOf('connectionMode=') + 15,
          ) as ConnectionMode
        }
      }
      fragmentParams = this.getAllFragmentParams()
      eid = fragmentParams?.get?.('eid')
      window.history.replaceState(
        {},
        window.document.title,
        location.href.slice(0, window.location.href.indexOf('?')),
      )
      if (meetingID) {
        this.joinMeeting({
          meetingID,
          passcode,
          joinName,
          optionalJoinProps: {
            connectionMode,
            eid,
          },
        })
      }
    }
  }

  @action.bound joinMeeting(props: JoinProps): Promise<void> {
    this.setCanTryJoining(false)
    this.setJoinProps({
      meetingID: props.meetingID,
      passcode: props.passcode,
      joinName: props.joinName,
      optionalJoinProps: props.optionalJoinProps,
    })
    return this.webrtcSDK.meetingService
      .joinMeeting(
        props.meetingID,
        props.passcode,
        props.joinName,
        props.optionalJoinProps,
      )
      .then(
        () => {
          this.setJoiningMeeting(true)
          this.setMeetingJoinError('')
          this.subscribeToNewChatMessages()
        },
        (error: ErrorInfo) => {
          console.error(
            'Meeting join failed with error: ',
            JSON.stringify(error),
          )
          this.setJoiningMeeting(false)
          this.setMeetingJoinError(error.reason)
          this.setSdkInitializationFailed(true)
        },
      )
  }

  @action.bound rejoin(): void {
    this.redirectToHomePage()
    const { meetingID, passcode, joinName, optionalJoinProps } = this.joinProps
    this.joinMeeting({
      meetingID: meetingID,
      passcode: passcode,
      joinName: joinName,
      optionalJoinProps: optionalJoinProps,
    })
    .then(
      () => {
        /**
         * resetting video source to camera is required to ensure customVideoSource is reset to default behaviour of CAMERA as a video source
         */
        this.webrtcSDK.customVideoSourceService.setVideoSource(VIDEO_SOURCE.CAMERA)
      },
      (error: ErrorInfo) => {
        console.error('Meeting join failed with error: ', JSON.stringify(error))
      },
    )
  }

  leaveMeeting(): Promise<any> {
    this.setJoinProps({
      meetingID: this.joinProps.meetingID,
      passcode: this.joinProps.passcode,
      joinName:
        this.webrtcSDK.meetingService.participantService?.selfParticipant.name,
      optionalJoinProps: {
        connectionMode: this.webrtcSDK.meetingService.connectionMode,
        eid: this.joinProps.optionalJoinProps?.eid,
      }
    });
    return this.webrtcSDK.meetingService.endMeeting();
  }

  @action.bound setSelfTriggeredLeaveMeeting(val: boolean): void {
    this.selfTriggeredLeaveMeeting = val
  }

  @action subscribeToNewChatMessages() {
    this.webrtcSDK.meetingService.privateChatService?.events.newMessage.subscribe(
      (message) => {
        console.log('[chat] private message', message)
      },
    )
    this.webrtcSDK.meetingService.publicChatService?.events.newMessage.subscribe(
      (message) => {
        console.log('[chat] public message', message)
      },
    )
  }

  @action setErrorMessage(value: ErrorResponse): void {
    this.errorMessage = value
  }

  @action setErrorFlag(flag: boolean): void {
    this.isError = flag
  }

  get customDivGetter() {
    return this.customDivDummy
  }

  getAllFragmentParams() {
    const hash = window.location.hash?.slice(1)
    return hash && hash.length ? new URLSearchParams(hash) : null
  }
}
