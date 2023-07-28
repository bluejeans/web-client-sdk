import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Managers from '../stores/Managers'
import {
  ViewContainer,
  GreetingsHeader,
  GreetingsSubHeader,
  MeetingInfoContainer,
  MeetingID,
  Passcode,
  JoinName,
  JoinButton,
  UIOptionsContainer,
  UIOptions,
  OptionsHeader,
  OptionsData,
  CheckBox,
  BGOptionContainer,
  BGColorTextLabel,
  BGColorTextBox,
  BGColorHint,
  IFramePropsContainer,
  IFrameLabel,
  IFrameProps,
  PropsSpecs,
  PropsHint,
  ErrorMessage,
} from './styles/PreMeeting'
import PreMeetingViewModel from './PreMeetingViewModel'
import { InputToggle, LabelToggle, SwitchToggle } from './styles/MeetingView'

interface Props {
  managers: Managers
}

@observer
export default class PreMeetingView extends Component<Props> {
  private managers: Managers
  private viewmodel: PreMeetingViewModel

  constructor(props: Props) {
    super(props)
    this.viewmodel = new PreMeetingViewModel(props.managers)
  }

  render() {
    const vm = this.viewmodel
    return (
      <ViewContainer>
        <GreetingsHeader>Welcome!</GreetingsHeader>
        <GreetingsSubHeader>Sample for BlueJeans WebRTC SDK</GreetingsSubHeader>
        <MeetingInfoContainer>
          <ErrorMessage>{vm.meetingJoinError}</ErrorMessage>
          {vm.showReloadMessage && (
            <ErrorMessage>
              Please check if camera and mic are available for use, provide
              permission and reload to join a meeting.
            </ErrorMessage>
          )}
          <MeetingID
            placeholder={'Meeting ID'}
            value={vm.meetingID}
            onChange={vm.setMeetingId}
          />
          <Passcode
            placeholder={'Passcode(Optional)'}
            value={vm.passcode}
            onChange={vm.setPasscode}
          />
          <JoinName
            placeholder={'Name'}
            value={vm.joinName}
            onChange={vm.setJoinName}
          />
          <LabelToggle>
            Join with screen sharing only
            <InputToggle
              type='checkbox'
              checked={vm.joinScreenSharingOnly}
              onChange={vm.toggleScreenSharingOnly}
            />
            <SwitchToggle />
          </LabelToggle>
          <JoinButton onClick={vm.joinMeeting} disabled={vm.isJoinBtnDisabled}>
            Join Meeting
          </JoinButton>
        </MeetingInfoContainer>
      </ViewContainer>
    )
  }
}
