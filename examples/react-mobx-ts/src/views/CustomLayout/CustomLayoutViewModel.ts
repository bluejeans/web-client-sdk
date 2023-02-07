import { action, computed, observable, reaction, when } from "mobx";
import Managers from "../../stores/Managers";
import { BJNWebClientSDK, StreamQuality, StreamPriority, videoStream, Participant } from '@bluejeans/web-client-sdk';
import CustomLayoutManager from "../../stores/CustomLayoutManager"

export default class CustomLayoutViewModel {

    private webrtcSDK: BJNWebClientSDK;
    private customLayoutManager: CustomLayoutManager


    constructor(managers: Managers) {
        this.webrtcSDK = managers.webrtcSDK;
        this.customLayoutManager = managers.customLayoutManager
        this.customLayoutManager.setVideoStreamConfiguration()

        reaction(() => this.customLayoutManager.firstModerator?.isVideoMuted, () => {
            this.customLayoutManager.setVideoStreamConfiguration()
        })
    }

    @computed get alphabeticallySortedParticipants() {
        return this.customLayoutManager.alphabeticallySortedParticipants;
    }

    @computed get getStreamsForFirstModerator() {
        return this.videoStreamsMap?.get(this.customLayoutManager.firstModerator?.participantGuid)
    }

    @computed get videoStreamsMap(): Map<string, videoStream> {
        return this.customLayoutManager.videoStreamsMap;
    }

    @computed get pinnedParticipant() {
        return this.customLayoutManager.pinnedParticipant
    }

    @computed get streamsForPinnedParticipant() {
        return this.videoStreamsMap?.get(this.pinnedParticipant?.participantGuid)
    }

    @computed get getPinnedParticipantDetails() {
        return this.customLayoutManager.pinnedParticipant
    }

    @computed get firstModerator(){
        return this.customLayoutManager.firstModerator;
    }

}