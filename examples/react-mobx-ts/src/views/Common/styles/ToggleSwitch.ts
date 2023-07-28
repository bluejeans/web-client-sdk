import styled from 'styled-components'
import {
  buttonColor,
  disabledButtonColor,
  hoveredButtonColor,
  unselectedButtonColor,
} from './Common'

export const ToggleSwitch = styled.div`
  background-color: #fff;
  text-align: center;
  padding: 8px 0px;
`

export const Button = styled<any, any>('button')`
  width: 180px;
  display: block;
  margin: 8px auto;
  border-radius: 4px;
  background-color: ${buttonColor};
  color: white;
  border: 0;
  height: 30px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  :hover {
    background-color: ${(props) =>
      props.disabled ? disabledButtonColor : hoveredButtonColor};
  }
`

export const CenteredRow = styled.div`
  text-align: center;
`

const Option = styled<any, any>(Button)`
  display: inline-block;
  width: 40%;
  height: 25px;
  border-radius: 0;
  font-size: 13px;
`

export const FirstOption = styled<any, any>(Option)`
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  background-color: ${(props) =>
    props.selected ? buttonColor : unselectedButtonColor};
`

export const SecondOption = styled<any, any>(Option)`
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  opacity: 1;
  background-color: ${(props) =>
    props.selected ? buttonColor : unselectedButtonColor}
  :hover {
    background-color: ${(props) =>
      props.disabled ? unselectedButtonColor : hoveredButtonColor};
  }
`
