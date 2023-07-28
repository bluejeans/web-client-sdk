import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { JoiningMessage } from '../Common/styles/Common'
import Managers from '../../stores/Managers'
import {
  Container,
  Content,
  RightDiv,
  LeftDiv,
  CanvasDiv,
} from './CanvasSource.Styled'
import {
  MeetingDetailsTableData,
  InputToggle,
  SwitchToggle,
  LabelToggle,
} from '../styles/MeetingView'
import CanvasSourceViewmodel from './CanvasSourceViewModel'

interface Props {
  managers: Managers
}

@observer
export default class CanvasSourceView extends Component<Props> {
  private viewModel: CanvasSourceViewmodel
  private canvasRef = React.createRef<HTMLCanvasElement>()

  constructor(props: Props) {
    super(props)
    this.viewModel = new CanvasSourceViewmodel(props.managers, this.canvasRef)
  }

  componentWillUnmount(): void {
    this.viewModel.dispose()
  }

  private get colonSeparator(): JSX.Element {
    return <MeetingDetailsTableData>:</MeetingDetailsTableData>
  }

  render() {
    return (
      <Container>
        <Content>
          <LeftDiv>
            <p>Set Custom Video Source :</p>
          </LeftDiv>
          <RightDiv>
            <LabelToggle style={{ marginLeft: '30px' }}>
              <InputToggle
                type='checkbox'
                checked={this.viewModel.isCustomVideoSourceSelected}
                onChange={this.viewModel.selectCustomVideoSource.bind(
                  this.viewModel,
                )}
              />
              <SwitchToggle />
            </LabelToggle>
          </RightDiv>
        </Content>
        <CanvasDiv>
          <canvas ref={this.canvasRef} />
        </CanvasDiv>
      </Container>
    )
  }
}
