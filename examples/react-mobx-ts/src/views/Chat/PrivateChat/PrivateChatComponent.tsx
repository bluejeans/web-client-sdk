import React, { Component } from "react";
import { observer } from "mobx-react";
import ChatUIManager, { PRIVATECHATVIEW } from "../../../stores/ChatUIManager";
import Managers from "../../../stores/Managers";
import PrivateChatViewModel from "./PrivateChatComponentViewModel"
import Chat from "../Chat"
import EligibleParticipants from "./EligibleParticipants"

interface Props {
    managers: Managers
}

@observer
export default class PrivateChatComponent extends Component<Props> {

    private chatUIManager : ChatUIManager;
    private privateChatViewModel : PrivateChatViewModel;

    constructor(props : Props) {
        super(props);
        this.chatUIManager = props.managers.chatUIManager;
        this.privateChatViewModel = new PrivateChatViewModel(this.chatUIManager);
    }

    render() {
        return (
            this.privateChatViewModel.privateChatViewToShow === PRIVATECHATVIEW.PARTICIPANTS ?
            <EligibleParticipants chatUIManager={this.props.managers.chatUIManager} />
            : <Chat managers={this.props.managers} />
        )
    }
}