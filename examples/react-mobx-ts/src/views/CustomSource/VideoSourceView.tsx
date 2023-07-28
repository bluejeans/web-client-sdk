import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { JoiningMessage } from '../Common/styles/Common'
import Managers from '../../stores/Managers'
import {
  MeetingDetailsTableData,
  MeetingControlButton,
} from '../styles/MeetingView'
import VideoSourceViewmodel from './VideoSourceViewmodel'
import {
  SourceRow,
  VideoContainer,
  WebButton,
  UploadRow,
  UploadButton,
  ChooseFile,
} from './VideoSource.Styled'

interface Props {
  managers: Managers
}

interface State {
  fileToPlay: string
  fileName: string
}

@observer
export default class VideoSourceView extends Component<Props, State> {
  private viewModel: VideoSourceViewmodel
  private videoRef = React.createRef<HTMLVideoElement>()

  constructor(props: Props) {
    super(props)
    this.viewModel = new VideoSourceViewmodel(props.managers, this.videoRef)

    this.state = {
      fileToPlay: '',
      fileName: '',
    }
  }

  private get colonSeparator(): JSX.Element {
    return <MeetingDetailsTableData>:</MeetingDetailsTableData>
  }

  componentWillUnmount(): void {
    this.viewModel.dispose()
  }

  componentDidMount(): void {
    this.viewModel.waitForPlay()
  }

  handleChange = (e) => {
    const fileURL = URL.createObjectURL(e.target.files[0])
    this.setState({ fileToPlay: fileURL, fileName: e.target.files[0].name })
  }

  loadWebVideo = () => {
    this.setState({
      fileToPlay:
        'https://webclientsdk.a.bluejeans.com/temp/video/BigBuckBunny.mp4',
    })
  }

  render() {
    return (
      <>
        {
          <VideoContainer>
            <SourceRow>
            <p>Choose Video Source:</p>
              <UploadButton>
                <input
                  type='file'
                  id='VideoFile'
                  accept='video/*'
                  onChange={this.handleChange}
                  style={{ display: 'none' }}
                />
                <ChooseFile>Choose File</ChooseFile>
              </UploadButton>
            </SourceRow>
            <UploadRow>{this.state.fileName}</UploadRow>
            <video
              id='VideoPlayer'
              crossOrigin='anonymous'
              autoPlay
              loop
              muted
              src={this.state.fileToPlay}
              ref={this.videoRef}
              style={{ width: '100%' }}
            ></video>
          </VideoContainer>
        }
      </>
    )
  }
}
