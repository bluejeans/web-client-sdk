import React from 'react'
import { ImCross } from 'react-icons/im'
import Managers from '../../../stores/Managers'
import InfoBarViewModel from './InfoBarViewModel'

import {
  InfoBarMain,
  LeftInnerContainer,
  RightInnerContainer,
} from './InfoBar.Styled'

interface PropsInfo {
  managers: Managers
}
class InfoBar extends React.Component<PropsInfo> {
  private infoBarViewModel: InfoBarViewModel

  constructor(props: PropsInfo) {
    super(props)
    this.infoBarViewModel = new InfoBarViewModel(props.managers)
  }
  render() {
    return (
      <InfoBarMain>
        <LeftInnerContainer
          onClick={this.infoBarViewModel.switchToParticipantsView}
        >
          {this.infoBarViewModel.showParticipantName &&
            this.infoBarViewModel?.participantName}
        </LeftInnerContainer>
        <RightInnerContainer>
          <ImCross
            onClick={() => this.infoBarViewModel.hideChatPanel()}
            style={{
              color: 'white',
              fontSize: '24px',
              padding: '10px 0px 10px',
            }}
          />
        </RightInnerContainer>
      </InfoBarMain>
    )
  }
}

export default InfoBar
