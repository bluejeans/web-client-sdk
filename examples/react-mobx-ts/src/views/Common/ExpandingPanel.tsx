import React from 'react'
import {
  ExpandingPanelView,
  ExpandingPanelContent,
  PanelToggle,
} from './styles/ExpandingPanel'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import {
 VIDEO_SOURCE,
} from '@bluejeans/web-client-sdk'
import Managers from 'src/stores/Managers'

interface Props {
  title?: string
  isOpen?: (isOpen: boolean) => void
  children: JSX.Element,
  videSource?: VIDEO_SOURCE
}

interface State {
  isOpen: boolean,
}

export default class ExpandingPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: props.videSource == VIDEO_SOURCE.CUSTOM,
    }
  }

  toggleOpen = () => {
    const isOpen = !this.state.isOpen
    this.props.isOpen?.(isOpen)
    this.setState({ isOpen })
  }

  render() {
    const { title, children } = this.props

    return (
      <ExpandingPanelView>
        <PanelToggle onClick={this.toggleOpen}>
          {this.props.title}
          {!this.state.isOpen ? <MdExpandMore /> : <MdExpandLess />}
        </PanelToggle>
        {this.state.isOpen && (
          <ExpandingPanelContent>{children}</ExpandingPanelContent>
        )}
      </ExpandingPanelView>
    )
  }
}
