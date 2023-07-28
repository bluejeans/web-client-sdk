import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Managers from '../stores/Managers'
import MeetingViewModel from './MeetingViewModel'
import AppViewModel from './AppViewModel'
import ErrorMessageComponent from './ErrorMessages/ErrorMessageComponent'
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
  ErrorMessage,
  LogUploadMessage,
  VideoIconRemote,
  AudioIconRemote,
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
  PinnedParticipantController,
} from './styles/MeetingView'
import { Participant } from '@bluejeans/web-client-sdk'
import { BsFillChatDotsFill } from 'react-icons/bs'
import ChatPanel from './Chat/ChatPanel'
import ExpandingPanel from './Common/ExpandingPanel'
import ToggleSwitch from './Common/ToggleSwitch'
import CustomVideoPanel from './CustomVideoPanel'

interface Props {
  managers: Managers
}

@observer
export default class MeetingView extends Component<Props> {
  private viewModel: MeetingViewModel
  private appViewModel: AppViewModel

  constructor(props: Props) {
    super(props)
    this.viewModel = new MeetingViewModel(props.managers)
    this.appViewModel = new AppViewModel(props.managers)
  }

  private get colonSeparator(): JSX.Element {
    return <MeetingDetailsTableData>:</MeetingDetailsTableData>
  }

  render() {
    const speakerSelectionUnsupportedText =
      'Speaker selection is not supported on this browser. Please select the speaker from system settings/preferences.'
    const MicrophoneSelectionUnsupportedText =
      'Microphone selection is not supported on this browser.'
    const vm = this.viewModel
    const appVm = this.appViewModel

    return (
      <MeetingControlContainer
        show={appVm.showRemoteContent}
        chatShow={vm.showChatPanel}
      >
        {vm.showChatPanel ? (
          <ChatPanel managers={this.props.managers} />
        ) : (
          <BadgeLabel>
            <BsFillChatDotsFill
              onClick={() => vm.setShowChatPanel(true)}
              style={{ fontSize: '30px', color: 'white' }}
            />
            {vm.unreadMessageCount > 0 && <span>{vm.unreadMessageCount}</span>}
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
                <JoinName value={vm.joinName} onChange={vm.setJoinName} />
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
                  {vm.participantsCount}
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
                  {vm.contentStatus}
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
                  {vm.meetingStatus}
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
                <MeetingControlButton
                  onClick={vm.toggleAudioState}
                  disabled={appVm.screenShareOnly}
                >
                  {vm.audioStatus}
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
                <MeetingControlButton
                  onClick={vm.toggleVideoState}
                  disabled={appVm.screenShareOnly}
                >
                  {vm.videoStatus}
                </MeetingControlButton>
              </MeetingDetailsTableData>
            </MeetingDetailsTableRow>
            {vm.isScreenShareSupported && (
              <MeetingDetailsTableRow>
                <MeetingDetailsTableData>
                  <MeetingDetailsTableContent>
                    Screen sharing
                  </MeetingDetailsTableContent>
                </MeetingDetailsTableData>
                {this.colonSeparator}
                <MeetingDetailsTableData>
                  <MeetingControlButton onClick={vm.toggleScreenShare}>
                    {vm.sharingStatus}
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
                  vm.videoLayout,
                  vm.availableVideoLayouts,
                  'id',
                  'name',
                  vm.setVideoLayout,
                  appVm.screenShareOnly,
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
                  vm.selectedCamera,
                  vm.availableCameras,
                  'id',
                  'name',
                  vm.selectCamera,
                  appVm.screenShareOnly,
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
                {vm.isMicrophoneSelectionAllowed ? (
                  this.makeDropdown(
                    vm.selectedMicrophone,
                    vm.availableMicrophones,
                    'id',
                    'name',
                    vm.selectMicrophone,
                    appVm.screenShareOnly,
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
                {vm.isSpeakerSelectionAllowed ? (
                  this.makeDropdown(
                    vm.selectedSpeaker,
                    vm.availableSpeakers,
                    'id',
                    'name',
                    vm.selectSpeaker,
                    appVm.screenShareOnly,
                  )
                ) : (
                  <SpeakerLabel title={speakerSelectionUnsupportedText}>
                    {speakerSelectionUnsupportedText}
                  </SpeakerLabel>
                )}
              </MeetingDetailsTableData>
            </MeetingDetailsTableRow>
            <MeetingDetailsTableRow>
              <MeetingDetailsTableData>
                <MeetingDetailsTableContent>
                  Connection mode
                </MeetingDetailsTableContent>
              </MeetingDetailsTableData>
              {this.colonSeparator}
              <MeetingDetailsTableData>
                {this.makeDropdown(
                  vm.connectionMode,
                  vm.availableConnectionModes,
                  'id',
                  'name',
                  vm.setConnectionMode,
                )}
              </MeetingDetailsTableData>
            </MeetingDetailsTableRow>
          </MeetingDetailsTableBody>
        </MeetingDetailsTable>
        { !appVm.screenShareOnly && <CustomVideoPanel managers={this.props.managers} /> }
        <ExpandingPanel title='Upload Logs'>
          {
            <>
              {!vm.showLogUploadStatus ? (
                <>
                  <EmailID
                    value={vm.emailId}
                    placeholder='Email Id'
                    onChange={({ target: { value } }) => vm.setEmailId(value)}
                  />
                  {vm.invalidEmail && (
                    <ErrorMessage>Please enter a valid email Id</ErrorMessage>
                  )}
                  <TextAreaComment
                    placeholder='Comments'
                    value={vm.comments}
                    onChange={({ target: { value } }) => vm.setComments(value)}
                  ></TextAreaComment>
                </>
              ) : (
                <LogUploadMessage>{vm.logUploadStatus}</LogUploadMessage>
              )}
              <MeetingControlButton
                onClick={vm.uploadLogs}
                disabled={vm.showLogUploadStatus}
              >
                Upload
              </MeetingControlButton>
            </>
          }
        </ExpandingPanel>

        {vm.getErrorFlag && (
          <ErrorMessageComponent
            message={vm?.getErrorMessage?.code}
            managers={this.props.managers}
          />
        )}
        <ExpandingPanel title='Roster'>
          <ToggleSwitch
            firstLabel='Roster'
            secondLabel='Waiting room'
            selected={this.viewModel.showWaitingRoom ? 1 : 0}
            onChange={(index) => this.viewModel.setWaitingRoom(index === 1)}
          >
            {vm.showWaitingRoom ? (
              <WrParticipantList>
                <WaitingRoomListItem>
                  <WrHeading>Waiting Room</WrHeading>
                  <WrParticipantControl>
                    <LabelToggle>
                      <InputToggle
                        type='checkbox'
                        checked={vm.isWaitingRoomEnabled}
                        onChange={vm.toggleWaitingRoom}
                      />
                      <SwitchToggle />
                    </LabelToggle>
                  </WrParticipantControl>
                </WaitingRoomListItem>
                {this.renderWrParticipantOption()}
                {vm.WrParticipants.length > 1 ? (
                  <WaitingRoomListItem>
                    <WrApprovedAll
                      onClick={() => {
                        vm.admitAll()
                      }}
                    >
                      ADMIT ALL
                    </WrApprovedAll>
                    <WrRejectAll
                      onClick={() => {
                        vm.denyAll()
                      }}
                    >
                      DENY ALL
                    </WrRejectAll>
                  </WaitingRoomListItem>
                ) : null}
              </WrParticipantList>
            ) : (
              <ParticipantList>{this.renderRoster()}</ParticipantList>
            )}
          </ToggleSwitch>
        </ExpandingPanel>
        <LeaveControlButton
          onClick={vm.onLeaveMeetingBtnClick}
          title={vm.leaveBtnTitle}
        >
          {vm.leaveBtnText}
        </LeaveControlButton>

        {vm.isDisconnected && (
          <LeaveControlButton
            onClick={vm.rejoin}
            title={'To leave the call, reload and rejoin the same meeting'}
          >
            ReJoin Meeting
          </LeaveControlButton>
        )}
      </MeetingControlContainer>
    )
  }

  makeDropdown<T>(
    selectedItem: T | null,
    items: T[],
    idProp: keyof T,
    displayProp: keyof T,
    onSelect: (T) => void,
    disabled: boolean = false,
  ): JSX.Element {
    const doSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = items.find((item) => item[idProp] + '' == e.target.value)
      onSelect(newValue)
    }
    return selectedItem ? (
      <MeetingDeviceDropdown
        value={selectedItem[idProp] + ''}
        onChange={doSelect}
        disabled={disabled}
      >
        {items?.map((item) => {
          return (
            <option key={item[idProp] + ''} value={item[idProp] + ''}>
              {item[displayProp] + ''}
            </option>
          )
        })}
      </MeetingDeviceDropdown>
    ) : (
      <></>
    )
  }

  renderRoster(): JSX.Element {
    let participants = this.viewModel.participants
    return (
      <>
        {participants?.map((participant, n) => {
          {
            return this.renderParticipant(participant, n)
          }
        })}
      </>
    )
  }

  renderParticipant(participant: Participant, n): JSX.Element {
    const participantName =
      participant.name + `${participant.isSelf ? '(me)' : ''}`
    const localRemoteData = JSON.parse(JSON.stringify(participant))
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
        {this.viewModel
          .isCustomVideoLayout ? null : this.viewModel.isPinnedParticipantChecked(
            participant,
          ) ? (
          <PinnedParticipantController
            isEnabled={
              this.viewModel.pinnedParticipantGuid ===
              participant.participantGuid
            }
            onClick={() =>
              this.viewModel.setPinnedParticipant(participant.participantGuid)
            }
          ></PinnedParticipantController>
        ) : (
          <PinnedParticipantController
            disabled={true}
          ></PinnedParticipantController>
        )}
      </ParticipantListItem>
    )
  }

  renderWrParticipantOption(): JSX.Element {
    let WrParticipants = this.viewModel.WrParticipants
    return (
      <>
        {WrParticipants?.map((participant, n) => {
          {
            return this.renderWrParticipant(participant, n)
          }
        })}
      </>
    )
  }

  renderWrParticipant(participant, n): JSX.Element {
    const participantName = participant.name
    return (
      <WaitingRoomListItem index={n.toString()} key={n.toString()}>
        {participant.isModerator && <ModeratorBadge />}
        <WrParticipantName title={participantName}>
          {participantName}
        </WrParticipantName>
        <WrApprovedParticipant
          onClick={() => {
            this.viewModel.admitParticipant(participant)
          }}
        >
          {' '}
          ADMIT{' '}
        </WrApprovedParticipant>
        <WrRejectParticipant
          onClick={() => {
            this.viewModel.denyParticipant(participant)
          }}
        >
          {' '}
          DENY{' '}
        </WrRejectParticipant>
      </WaitingRoomListItem>
    )
  }
}
