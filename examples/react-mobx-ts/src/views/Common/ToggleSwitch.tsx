import React, { Children } from 'react'
import { PanelToggle } from './styles/ExpandingPanel'
import { FirstOption, SecondOption, CenteredRow } from './styles/ToggleSwitch'

interface Props {
  firstLabel: string
  secondLabel: string
  selected: number
  onChange: (int) => void
  children: JSX.Element
}

interface State {}

export default class ToggleSwitch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { firstLabel, secondLabel, children } = this.props

    return (
      <>
        <CenteredRow>
          <FirstOption
            selected={this.props.selected === 0}
            onClick={() => this.props.onChange(0)}
          >
            {firstLabel}
          </FirstOption>
          <SecondOption
            selected={this.props.selected !== 0}
            onClick={() => this.props.onChange(1)}
          >
            {secondLabel}
          </SecondOption>
        </CenteredRow>
        {children}
      </>
    )
  }
}
