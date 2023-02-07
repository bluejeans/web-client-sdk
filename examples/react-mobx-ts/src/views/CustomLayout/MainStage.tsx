import { Participant } from "@bluejeans/web-client-sdk";
import React, { useRef } from "react";
import { observer } from "mobx-react";
import Managers from "../../stores/Managers";
import ModeratorViewModel from "./ModeratorViewModel";
import { ModeratorVideo, TileDiv, ParticipantNameDiv, TilesContainer, ModeratorAudio, ModeratorParticipantInitials } from "./CustomLayout.Styled";


interface Props {
    participant: Participant;
    id: string;
    managers: Managers;
    streams: any
}

@observer
class MainStage extends React.Component<Props> {
    private viewModel: ModeratorViewModel;

    constructor(props: Props) {
        super(props);
         this.viewModel = new ModeratorViewModel(props.managers);
    }

    componentDidMount(): void {
        this.viewModel.renderParticipants(this.props.participant?.participantGuid,this.props.id)
    }
    
    componentDidUpdate(prevProps: Readonly<Props>, prevState, snapshot?: any): void {
        if (this.shouldRenderParticipant(prevProps)) {
            this.viewModel.renderParticipants(this.props.participant?.participantGuid,this.props.id)
        }
    }

    //Rendering participant agian if videoState or participantGuid has changed
    shouldRenderParticipant(prevProps): boolean {
        return (this.props.participant?.isVideoMuted !== prevProps.participant?.isVideoMuted ||
            this.props.participant?.participantGuid !== prevProps.participant?.participantGuid ||
            typeof (this.props.streams) !== typeof (prevProps.streams)
        )
    }

    renderAudioTile() {
        let participant = this.props.participant
        return (
            <ModeratorAudio>
              <ModeratorParticipantInitials>{this.viewModel.initials(participant)}</ModeratorParticipantInitials>
              <ParticipantNameDiv>
                <span>{participant?.name}</span>
              </ParticipantNameDiv>
            </ModeratorAudio>
          )
    }

    renderVideoTile() {
        let streams = this.props.streams
        return (
            <ModeratorVideo id={this.props.id}>
                <TilesContainer>
                <TileDiv>{streams && `${streams?.resolution.width}x${streams?.resolution.height}`}</TileDiv>
                <TileDiv>{streams && `fps:${streams?.metaData?.fps}`}</TileDiv>
                </TilesContainer>
                <ParticipantNameDiv>
                    <span>{this.props.participant?.name}</span>
                </ParticipantNameDiv>
            </ModeratorVideo>
        )
    }

    mainStatgeParticipant() {
        if (!this.props.participant?.isVideoMuted) {
            return this.renderVideoTile()
        }
        else {
            return this.renderAudioTile();
        }
    }

    render(): React.ReactNode {
        return (
            <>
                {this.mainStatgeParticipant()}
            </>
        )
    }
}

export default MainStage;
