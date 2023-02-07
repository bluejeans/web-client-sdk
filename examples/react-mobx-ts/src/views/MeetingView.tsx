import React, { Component } from "react";
import { observer } from "mobx-react";
import Managers from "../stores/Managers";
import MeetingViewModel from "./MeetingViewModel";
import AppViewModel from './AppViewModel';
import ErrorMessageComponent from './ErrorMessages/ErrorMessageComponent';
import {
  MeetingControlContainer,
  MeetingDetailsTable,
  MeetingDetailsTableBody,
  MeetingDetailsTableRow,
  MeetingDetailsTableContent,
  MeetingDetailsTableData,
  MeetingControlButton,
  JoinName,
  LeaveControlButton,
  MeetingDeviceDropdown,
  MeetingRoster,
  RosterHeader,
  ParticipantList,
  ParticipantListItem,
  ModeratorBadge,
  SharingBadge,
  ParticipantName,
  AudioIcon,
  VideoIcon,
  SpeakerLabel,
  BadgeLabel,
  MicrophoneLabel,
  EmailID,
  TextAreaComment,
  UploadLogButton,
  ErrorMessage,
  LogUploadMessage,
  UploadLogButtonDisabled,
  VideoIconRemote,
  AudioIconRemote,
  RosterOptions,
  WaitingRoomList,
  WaitingRoomSelected,
  RosterList,
  RosterSelected,
  WaitingRoomListItem,
  WrParticipantName,
  WrParticipantControl,
  WrRejectParticipant,
  WrApprovedParticipant,
  WrHeading,
  WrApprovedAll,
  WrRejectAll,
  WrParticipantList,
  InputToggle,
  SwitchToggle,
  LabelToggle,
  PinnedParticipantController
} from "./styles/MeetingView";
import { Participant, VideoLayout } from "@bluejeans/web-client-sdk";
import { BsFillChatDotsFill, BsPinAngle } from "react-icons/bs";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import ChatPanel from "./Chat/ChatPanel";
import CustomLayoutManager from "../stores/CustomLayoutManager";

interface Props {
  managers: Managers;
}

@observer
export default class MeetingView extends Component<Props> {
  private viewModel: MeetingViewModel;
  private appViewModel: AppViewModel;
  private customLayoutManager: CustomLayoutManager;

  constructor(props: Props) {
    super(props);
    this.viewModel = new MeetingViewModel(props.managers);
    this.appViewModel = new AppViewModel(props.managers);
  }

  private get colonSeparator(): JSX.Element {
    return <MeetingDetailsTableData>:</MeetingDetailsTableData>;
  }

  render() {
    const speakerSelectionUnsupportedText =
      "Speaker selection is not supported on this browser. Please select the speaker from system settings/preferences.";
    const MicrophoneSelectionUnsupportedText =
      "Microphone selection is not supported on this browser.";
    return (
      <MeetingControlContainer
        show={this.appViewModel.showRemoteContent}
        chatShow={this.viewModel.showChatPanel}
      >
        {this.viewModel.showChatPanel ? (
          <ChatPanel managers={this.props.managers} />
        ) : (
          <BadgeLabel>
            <BsFillChatDotsFill
              onClick={() => this.viewModel.setShowChatPanel(true)}
              style={{ fontSize: "30px", color: "gray" }}
            />
            {this.viewModel.unreadMessageCount > 0 && (
              <span>{this.viewModel.unreadMessageCount}</span>
            )}
          </BadgeLabel>
        )}
        <MeetingDetailsTable>
          <MeetingDetailsTableBody>
            <MeetingDetailsTableRow>
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>Name</MeetingDetailsTableContent>
              </MeetingDetailsTableData>
              {this.colonSeparator}
              <MeetingDetailsTableData>
                <JoinName
                  value={this.viewModel.joinName}
                  onChange={this.viewModel.setJoinName}
                />
              </MeetingDetailsTableData>
            </MeetingDetailsTableRow>
            <MeetingDetailsTableRow>
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>
                  No of Participants
                </MeetingDetailsTableContent>
              </MeetingDetailsTableData>
              {this.colonSeparator}
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>
                  {this.viewModel.participantsCount}
                </MeetingDetailsTableContent>
              </MeetingDetailsTableData>
            </MeetingDetailsTableRow>
            <MeetingDetailsTableRow>
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>Content</MeetingDetailsTableContent>
              </MeetingDetailsTableData>
              {this.colonSeparator}
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>
                  {this.viewModel.contentStatus}
                </MeetingDetailsTableContent>
              </MeetingDetailsTableData>
            </MeetingDetailsTableRow>
            <MeetingDetailsTableRow>
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>
                  Meeting status
                </MeetingDetailsTableContent>
              </MeetingDetailsTableData>
              {this.colonSeparator}
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>
                  {this.viewModel.meetingStatus}
                </MeetingDetailsTableContent>
              </MeetingDetailsTableData>
            </MeetingDetailsTableRow>
            <MeetingDetailsTableRow>
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>
                  Audio control
                </MeetingDetailsTableContent>
              </MeetingDetailsTableData>
              {this.colonSeparator}
              <MeetingDetailsTableData>
                <MeetingControlButton onClick={this.viewModel.toggleAudioState}>
                  {this.viewModel.audioStatus}
                </MeetingControlButton>
              </MeetingDetailsTableData>
            </MeetingDetailsTableRow>
            <MeetingDetailsTableRow>
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>
                  Video control
                </MeetingDetailsTableContent>
              </MeetingDetailsTableData>
              {this.colonSeparator}
              <MeetingDetailsTableData>
                <MeetingControlButton onClick={this.viewModel.toggleVideoState}>
                  {this.viewModel.videoStatus}
                </MeetingControlButton>
              </MeetingDetailsTableData>
            </MeetingDetailsTableRow>
            {this.viewModel.isScreenShareSupported && (
              <MeetingDetailsTableRow>
                <MeetingDetailsTableData>
                  <MeetingDetailsTableContent>
                    Screen sharing
                  </MeetingDetailsTableContent>
                </MeetingDetailsTableData>
                {this.colonSeparator}
                <MeetingDetailsTableData>
                  <MeetingControlButton
                    onClick={this.viewModel.toggleScreenShare}
                  >
                    {this.viewModel.sharingStatus}
                  </MeetingControlButton>
                </MeetingDetailsTableData>
              </MeetingDetailsTableRow>
            )}
            <MeetingDetailsTableRow>
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>Layout</MeetingDetailsTableContent>
              </MeetingDetailsTableData>
              {this.colonSeparator}
              <MeetingDetailsTableData>
                {this.makeDropdown(
                  this.viewModel.videoLayout,
                  this.viewModel.availableVideoLayouts,
                  "id",
                  "name",
                  this.viewModel.setVideoLayout
                )}
              </MeetingDetailsTableData>
            </MeetingDetailsTableRow>
            <MeetingDetailsTableRow>
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>Camera</MeetingDetailsTableContent>
              </MeetingDetailsTableData>
              {this.colonSeparator}
              <MeetingDetailsTableData>
                {this.makeDropdown(
                  this.viewModel.selectedCamera,
                  this.viewModel.availableCameras,
                  "id",
                  "name",
                  this.viewModel.selectCamera
                )}
              </MeetingDetailsTableData>
            </MeetingDetailsTableRow>
            <MeetingDetailsTableRow>
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>
                  Microphone
                </MeetingDetailsTableContent>
              </MeetingDetailsTableData>
              {this.colonSeparator}
              <MeetingDetailsTableData>
                {this.viewModel.isMicrophoneSelectionAllowed ? (
                  this.makeDropdown(
                    this.viewModel.selectedMicrophone,
                    this.viewModel.availableMicrophones,
                    "id",
                    "name",
                    this.viewModel.selectMicrophone
                  )
                ) : (
                  <MicrophoneLabel title={MicrophoneSelectionUnsupportedText}>
                    {MicrophoneSelectionUnsupportedText}
                  </MicrophoneLabel>
                )}
              </MeetingDetailsTableData>
            </MeetingDetailsTableRow>
            <MeetingDetailsTableRow>
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>Speaker</MeetingDetailsTableContent>
              </MeetingDetailsTableData>
              {this.colonSeparator}
              <MeetingDetailsTableData>
                {this.viewModel.isSpeakerSelectionAllowed ? (
                  this.makeDropdown(
                    this.viewModel.selectedSpeaker,
                    this.viewModel.availableSpeakers,
                    "id",
                    "name",
                    this.viewModel.selectSpeaker
                  )
                ) : (
                  <SpeakerLabel title={speakerSelectionUnsupportedText}>
                    {speakerSelectionUnsupportedText}
                  </SpeakerLabel>
                )}
              </MeetingDetailsTableData>
            </MeetingDetailsTableRow>
          </MeetingDetailsTableBody>
        </MeetingDetailsTable>
        <MeetingRoster>
          <RosterHeader onClick={this.viewModel.setShowLogUpload}>
            {" "}
            Upload Logs{" "}
            {!this.viewModel.showLogUpload ? (
              <MdExpandMore />
            ) : (
              <MdExpandLess />
            )}
          </RosterHeader>
          {this.viewModel.showLogUpload && (
            <>
              {!this.viewModel.showLogUploadStatus ? (
                <>
                  <EmailID
                    value={this.viewModel.emailId}
                    placeholder="Email Id"
                    onChange={({ target: { value } }) =>
                      this.viewModel.setEmailId(value)
                    }
                  />
                  {this.viewModel.invalidEmail && (
                    <ErrorMessage>Please enter a valid email Id</ErrorMessage>
                  )}
                  <TextAreaComment
                    placeholder="Comments"
                    value={this.viewModel.comments}
                    onChange={({ target: { value } }) =>
                      this.viewModel.setComments(value)
                    }
                  ></TextAreaComment>
                </>
              ) : (
                <LogUploadMessage>
                  {this.viewModel.logUploadStatus}
                </LogUploadMessage>
              )}
              {this.viewModel.showLogUploadStatus ? (
                <UploadLogButtonDisabled
                  disabled={this.viewModel.showLogUploadStatus}
                  onClick={this.viewModel.uploadLogs}
                >
                  Upload
                </UploadLogButtonDisabled>
              ) : (
                <UploadLogButton onClick={this.viewModel.uploadLogs}>
                  Upload
                </UploadLogButton>
              )}
            </>
          )}
        </MeetingRoster>
        {this.viewModel.getErrorFlag && (
          <ErrorMessageComponent
            message={this.viewModel?.getErrorMessage?.code}
            managers={this.props.managers}
          />
        )}
        <MeetingRoster>
          <RosterOptions>
            {this.renderRosterOption()}
            {this.renderWaitingRoomOption()}
          </RosterOptions>
          {this.viewModel.showWaitingRoom ? (
            <>
              <WrParticipantList>
                <WaitingRoomListItem>
                  <WrHeading>Waiting Room</WrHeading>
                  <WrParticipantControl>
                    <LabelToggle>
                      <InputToggle type="checkbox" checked={this.viewModel.isWaitingRoomEnabled} onChange={this.viewModel.toggleWaitingRoom}/>
                      <SwitchToggle />
                    </LabelToggle>
                  </WrParticipantControl>
                </WaitingRoomListItem>
                {this.renderWrParticipantOption()}
                {this.viewModel.WrParticipants.length > 1 ? (
                  <WaitingRoomListItem>
                    <WrApprovedAll
                      onClick={() => {
                        this.viewModel.admitAll();
                      }}
                    >
                      {" "}
                      ADMIT ALL
                    </WrApprovedAll>
                    <WrRejectAll
                      onClick={() => {
                        this.viewModel.denyAll();
                      }}
                    >
                      {" "}
                      DENY ALL
                    </WrRejectAll>
                  </WaitingRoomListItem>
                ) : null}
              </WrParticipantList>
            </>
          ) : (
            <ParticipantList>{this.renderRoster()}</ParticipantList>
          )}
        </MeetingRoster>
        <LeaveControlButton
          onClick={this.viewModel.onLeaveMeetingBtnClick}
          title={this.viewModel.leaveBtnTitle}
        >
          {this.viewModel.leaveBtnText}
        </LeaveControlButton>

        {this.viewModel.isDisconnected && (
          <LeaveControlButton
            onClick={this.viewModel.rejoin}
            title={"To leave the call, reload and rejoin the same meeting"}
          >
            ReJoin Meeting
          </LeaveControlButton>
        )}
      </MeetingControlContainer>
    );
  }

  makeDropdown<T>(
    selectedItem: T | null,
    items: T[],
    idProp: keyof T,
    displayProp: keyof T,
    onSelect: (T) => void
  ): JSX.Element {
    const doSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = items.find(
        (item) => item[idProp] + "" == e.target.value
      );
      onSelect(newValue);
    };
    return selectedItem ? (
      <MeetingDeviceDropdown
        value={selectedItem[idProp] + ""}
        onChange={doSelect}
      >
        {items?.map((item) => {
          return (
            <option key={item[idProp] + ""} value={item[idProp] + ""}>
              {item[displayProp] + ""}
            </option>
          );
        })}
      </MeetingDeviceDropdown>
    ) : (
      <></>
    );
  }

  renderRoster(): JSX.Element {
    let participants = this.viewModel.participants;
    return (
      <>
        {participants?.map((participant, n) => {
          {
            return this.renderParticipant(participant, n);
          }
        })}
      </>
    );
  }

  renderParticipant(participant: Participant, n): JSX.Element {
    const participantName =
      participant.name + `${participant.isSelf ? "(me)" : ""}`;
    const localRemoteData = JSON.parse(JSON.stringify(participant));
    return (
      <ParticipantListItem index={n.toString()} key={n.toString()}>
        {participant.isModerator && <ModeratorBadge />}
        <ParticipantName title={participantName}>
          {participantName}
        </ParticipantName>
        {participant.isSharing && <SharingBadge />}
        {localRemoteData.videoMuteType.remoteMuted ? (
          <VideoIconRemote
            isMuted={localRemoteData.videoMuteType.remoteMuted}
          />
        ) : (
          <VideoIcon
            isMuted={
              participant.isVideoMuted !== undefined
                ? participant.isVideoMuted
                : true
            }
          />
        )}
        {localRemoteData.audioMuteType.remoteMuted ? (
          <AudioIconRemote
            isMuted={localRemoteData.audioMuteType.remoteMuted}
          />
        ) : (
          <AudioIcon
            isMuted={
              participant.isAudioMuted !== undefined
                ? participant.isAudioMuted
                : true
            }
          />
        )}
        {this.viewModel.isCustomVideoLayout ? null : this.viewModel.isPinnedParticipantChecked(participant) ? (
          <PinnedParticipantController
            isEnabled={
              this.viewModel.pinnedParticipantGuid === participant.participantGuid
            }
            onClick={() =>
              this.viewModel.setPinnedParticipant(participant.participantGuid)
            }
          ></PinnedParticipantController>
        ) : (
          <PinnedParticipantController isDisabled={true}></PinnedParticipantController>
        )}
      </ParticipantListItem>
    );
  }
  renderRosterOption(): JSX.Element {
    return !this.viewModel.showWaitingRoom ? (
      <RosterSelected onClick={() => this.viewModel.setWaitingRoom(false)}>
        Roster
      </RosterSelected>
    ) : (
      <RosterList onClick={() => this.viewModel.setWaitingRoom(false)}>
        Roster
      </RosterList>
    );
  }

  renderWaitingRoomOption(): JSX.Element {
    return this.viewModel.showWaitingRoom ? (
      <WaitingRoomSelected disabled={!this.viewModel.isWaitingRoomCapable} >
        Waiting Room
      </WaitingRoomSelected>
    ) : (
      <WaitingRoomList disabled={!this.viewModel.isWaitingRoomCapable} onClick={() => this.viewModel.setWaitingRoom(true)}>
        Waiting Room
      </WaitingRoomList>
    );
  }
  renderWrParticipantOption(): JSX.Element {
    let WrParticipants = this.viewModel.WrParticipants;
    return (
      <>
        {WrParticipants?.map((participant, n) => {
          {
            return this.renderWrParticipant(participant, n);
          }
        })}
      </>
    );
  }


  renderWrParticipant(participant, n): JSX.Element {
    const participantName = participant.name;
    return (
      <WaitingRoomListItem index={n.toString()} key={n.toString()}>
        {participant.isModerator && <ModeratorBadge />}
        <WrParticipantName title={participantName}>
          {participantName}
        </WrParticipantName>
        <WrApprovedParticipant onClick={()=>{this.viewModel.admitParticipant(participant)}}> ADMIT </WrApprovedParticipant>
        <WrRejectParticipant onClick={()=>{this.viewModel.denyParticipant(participant)}}> DENY </WrRejectParticipant>
      </WaitingRoomListItem>
    );
  }
}
