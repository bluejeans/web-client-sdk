import { action, computed, observable, reaction } from "mobx";
import Managers from "../../stores/Managers";
import CustomLayoutManager from "../../stores/CustomLayoutManager"
import { BJNWebClientSDK, StreamQuality, StreamPriority, videoStream, Participant } from '@bluejeans/web-client-sdk';

export default class StudentViewModel {

    private webrtcSDK : BJNWebClientSDK;
    private customLayoutManager : CustomLayoutManager
    @observable backgroundColor = this.randomBackgroundColorPicker(false)

    constructor(managers : Managers) {
        this.customLayoutManager = managers.customLayoutManager
        this.webrtcSDK = managers.webrtcSDK;
    }


    renderParticipants(participantGuid, element) {
        this.webrtcSDK.meetingService.videoStreamService?.attachParticipantToView(participantGuid, element)
    }

    @computed get videoStreamsMap(): Map<string, videoStream>{
        return this.customLayoutManager.videoStreamsMap
    }

    initials(participant): string {
        return this.customLayoutManager.getInitials(participant)
    }

    @action updateBackgroundColor(random: boolean): void {
        this.backgroundColor = this.randomBackgroundColorPicker(random)
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    @action randomBackgroundColorPicker(random:boolean){
        return random ? `linear-gradient(to bottom,${this.getRandomColor()},${this.getRandomColor()})`: "linear-gradient(to bottom,#a5a5a5,#f3f3f3a8)";
    }
}