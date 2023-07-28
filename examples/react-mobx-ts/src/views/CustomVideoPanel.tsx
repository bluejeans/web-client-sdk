import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ExpandingPanel from './Common/ExpandingPanel'
import ToggleSwitch from './Common/ToggleSwitch'
import VideoSourceView from './CustomSource/VideoSourceView'
import CanvasSourceView from './CustomSource/CanvasSourceView'
import Managers from 'src/stores/Managers'
import { VIDEO_SOURCE } from '@bluejeans/web-client-sdk'

interface Props {
  managers: Managers
}

interface State {
  isCanvasOption: boolean
}

@observer
export default class CustomVideoPanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isCanvasOption: true,
    }
  }

  toggle = () => {
    this.props.managers.webrtcSDK.customVideoSourceService.setVideoSource(
      VIDEO_SOURCE.CAMERA,
    )
    this.setState({ isCanvasOption: !this.state.isCanvasOption })
  }

  panelOpen = (isOpen: boolean) => {
    if (!isOpen) {
      this.props.managers.webrtcSDK.customVideoSourceService.setVideoSource(
        VIDEO_SOURCE.CAMERA,
      )
    }
  }

  render() {
    return (
      <ExpandingPanel title='Custom video' isOpen={this.panelOpen} videSource={this.props.managers?.webrtcSDK.customVideoSourceService.videoSource}>
        <ToggleSwitch
          firstLabel='Canvas image'
          secondLabel='Video'
          selected={this.state.isCanvasOption ? 0 : 1}
          onChange={this.toggle}
        >
          {this.state.isCanvasOption ? (
            <CanvasSourceView managers={this.props.managers} />
          ) : (
            <VideoSourceView managers={this.props.managers} />
          )}
        </ToggleSwitch>
      </ExpandingPanel>
    )
  }
}
