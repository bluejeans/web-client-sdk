import { observable, action, computed } from "mobx";
import Managers from "../stores/Managers";
import { BJNWebClientSDK } from '@bluejeans/web-client-sdk';
import AppManager from "../stores/AppManager";

export default class PreMeetingViewModel {

    private webrtcSDK : BJNWebClientSDK;
    private appManager : AppManager;
    @observable meetingID : string = "";
    @observable passcode : string = "";
    @observable joinName : string = "";

    constructor(managers : Managers) {
        this.webrtcSDK = managers.webrtcSDK;
        this.appManager = managers.appManager;
    }

    @action.bound setMeetingId(event) : void {
        this.meetingID = event.target.value;
    }

    @action.bound setPasscode(event) : void {
        this.passcode = event.target.value;
    }

    @action.bound setJoinName(event) : void {
        this.joinName = event.target.value;
    }

    @computed
    get meetingJoinError() : string {
        return this.appManager.meetingJoinError;
    }

    @computed
    get showReloadMessage() : boolean {
        return this.appManager.sdkInitializationFailed;
    }

    @computed
    get isJoinBtnDisabled() : boolean {
        return (this.showReloadMessage || !this.appManager.canTryJoining);
    }

    @action.bound joinMeeting() : void {
        this.appManager.joinMeeting({meetingID: this.meetingID, passcode: this.passcode, joinName: this.joinName});
    }


}