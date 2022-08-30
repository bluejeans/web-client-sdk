import { computed, action, observable, reaction } from "mobx";
import {
  BJNWebClientSDK,
  ConnectionState,
  ErrorInfo
} from "@bluejeans/web-client-sdk";

export enum AppState {
  PRE_MEETING = "PreMeeting",
  IN_MEETING = "InMeeting",
  POST_MEETING = "PostMeeting",
  WAITING_ROOM = "WaitingRoom"
}

export interface JoinProps {
  meetingID: string;
  passcode: string;
  joinName: string;
}

export default class AppManager {
  private webrtcSDK: BJNWebClientSDK;

  @observable joinProps: JoinProps;
  @observable isJoiningMeeting: boolean; // used for intermediate joining transition screen
  @observable meetingJoinError: string = "";
  @observable sdkInitializationFailed: boolean = false;
  @observable canTryJoining: boolean = true; // used for enabling disabling join button
  @observable selfTriggeredLeaveMeeting: boolean = false;
  @observable showChatPanel: boolean = false;
  @observable disconnectedAfterMeeting :boolean = false;
  @observable showWaitingRoom: boolean = false;



  constructor(webrtcSDK: BJNWebClientSDK) {
    this.webrtcSDK = webrtcSDK;
    this.joinMeetingWithParams();


    reaction(() => this.webrtcSDK.meetingService.connectionState === ConnectionState.IDLE, () => {
      if (this.isJoiningMeeting) { // this indicates meeting join has been initiated, and now if connection state is idle, it indicates endMeeting
        this.disconnectedAfterMeeting = true;
      }
    });
    
  }


  @action redirectToHomePage(): void{
    this.setJoiningMeeting(false);
    this.setCanTryJoining(true);
    this.disconnectedAfterMeeting = false; // resetting the flag that was set true after disconnecting from meeting
  }

  @computed get appState(): AppState {
    if(this.webrtcSDK.meetingService.connectionState === ConnectionState.WAITINGROOM){
      return AppState.WAITING_ROOM;
    }
    if (this.disconnectedAfterMeeting) {
      return AppState.POST_MEETING
    }
    else if (
      this.webrtcSDK.meetingService.connectionState === ConnectionState.IDLE ||
      !this.isJoiningMeeting
    ) {
      return AppState.PRE_MEETING;
    } 
    else {
      return AppState.IN_MEETING;
    }
  }

  @action setJoiningMeeting(joining: boolean): void {
    this.isJoiningMeeting = joining;
  }

  @action.bound setJoinProps(joinProps: JoinProps): void {
    this.joinProps = joinProps;
  }

  @action setMeetingJoinError(error: string): void {
    this.meetingJoinError = error;
  }

  @action setSdkInitializationFailed(val: boolean): void {
    this.sdkInitializationFailed = val;
  }

  @action setCanTryJoining(val: boolean): void {
    this.canTryJoining = val;
  }

  @action setShowChatPanel(value : boolean) : void {
    this.showChatPanel = value;
  }
  @action setWaitingRoom(value : boolean) : void {
    this.showWaitingRoom = value;
  }

  reload(): void {
    window.location.reload();
  }

  joinMeetingWithParams(): void {
    let urlEncoded: string = window.location.href;
    let url: string = decodeURIComponent(urlEncoded)
    if (url.indexOf("?") > 0) {
      let queryIndex = url.indexOf("?");
      let query: string = url.slice(queryIndex);
      let meetingID: string = "";
      let passcode: string = "";
      let joinName: string = "";
      let queryList: string[] = query.slice(1).split("&");
      for (let i = 0; i < queryList.length; i++) {
        let queryElem: string = queryList[i];
        if (queryElem.indexOf("meetingID=") > -1) {
          meetingID = queryElem.slice(queryElem.indexOf("meetingID=") + 10);
        } else if (queryElem.indexOf("passcode=") > -1) {
          passcode = queryElem.slice(queryElem.indexOf("passcode=") + 9);
        } else if (queryElem.indexOf("joinName=") > -1) {
          joinName = queryElem.slice(queryElem.indexOf("joinName=") + 9);
        }
      }
      window.history.replaceState(
        {},
        window.document.title,
        location.href.slice(0, window.location.href.indexOf("?"))
      );
      if (meetingID) {
        this.joinMeeting({
          meetingID: meetingID,
          passcode: passcode,
          joinName: joinName,
        });
      }
    }
  }

  @action.bound joinMeeting(props: JoinProps): void {
    this.setCanTryJoining(false);
    this.setJoinProps({
      meetingID: props.meetingID,
      passcode: props.passcode,
      joinName: props.joinName,
    });
    this.webrtcSDK.meetingService
      .joinMeeting(props.meetingID, props.passcode, props.joinName)
      .then(
        () => {
          this.setJoiningMeeting(true);
          this.setMeetingJoinError("");
          this.subscribeToNewChatMessages();
        },
        (error: ErrorInfo) => {
          console.error(
            "Meeting join failed with error: ",
            JSON.stringify(error)
          );
          this.setJoiningMeeting(false);
          this.setMeetingJoinError(error.reason);
          this.setSdkInitializationFailed(true);
        }
      );
  }

  @action.bound rejoin(): void {
    this.redirectToHomePage()
    const { meetingID, passcode, joinName } = this.joinProps;
    this.joinMeeting({
      meetingID: meetingID,
      passcode: passcode,
      joinName: joinName,
    });
  }

  leaveMeeting(): Promise<any> {
    this.setJoinProps({
      meetingID: this.joinProps.meetingID,
      passcode: this.joinProps.passcode,
      joinName: this.webrtcSDK.meetingService.participantService.selfParticipant.name,
    });
    
    return this.webrtcSDK.meetingService.endMeeting();
  }

  @action.bound setSelfTriggeredLeaveMeeting(val: boolean): void {
    this.selfTriggeredLeaveMeeting = val;
  }

  @action subscribeToNewChatMessages(){
    this.webrtcSDK.meetingService.privateChatService.events.newMessage.subscribe((message)=>{console.log("[chat] private message",message)})
    this.webrtcSDK.meetingService.publicChatService.events.newMessage.subscribe((message)=>{console.log("[chat] public message",message)})
  }


}
