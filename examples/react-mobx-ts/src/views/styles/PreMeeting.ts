import styled from 'styled-components'
import { TextBox, Button } from '../Common/styles/Common'

export const ViewContainer = styled.div`
  margin: auto;
  text-align: center;
`

export const GreetingsHeader = styled.div`
  font-size: 36px;
  margin: 8px;
  color: white;
`

export const GreetingsSubHeader = styled.div`
  font-size: 24px;
  margin: 16px;
  color: white;
`

export const MeetingInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: fit-content;
  margin: auto;
  align-items: center;
`

export const MeetingID = styled(TextBox)``

export const Passcode = styled(TextBox)``

export const JoinName = styled(TextBox)``

export const JoinButton = styled<any, any>(Button)`
  width: 220px;
`

export const UIOptionsContainer = styled.table`
  text-align: left;
  margin-top: 8px;
  background: lightgray;
`

export const UIOptions = styled.tbody``

export const OptionsHeader = styled.span`
  display: block;
  text-align: left;
  font-weight: bolder;
  margin-top: 30px;
`

export const OptionsData = styled.td`
  min-width: 300px;
`

export const CheckBox = styled.input``

export const BGOptionContainer = styled.div`
  background: lightgray;
  padding: 10px;
`

export const BGColorTextLabel = styled.span``

export const BGColorTextBox = styled(TextBox)`
  width: 400px;
  margin: 10px;
`

export const BGColorHint = styled.span`
    font-size: 10px
    font-weight: bold;
    display: block;
`

export const ErrorMessage = styled.span`
  font-size: 15px;
  display: block;
  color: rgb(254, 58, 104);
`

export const IFramePropsContainer = styled.div`
  width: 100%;
  margin: auto;
`

export const IFrameLabel = styled.span`
  display: block;
  text-align: left;
  font-weight: bolder;
  margin-top: 30px;
  margin-bottom: 10px;
`

export const IFrameProps = styled.div`
  background: darkgray;
  text-align: left;
  padding: 8px;
`

export const PropsSpecs = styled.input`
  display: inline-block;
  width: 200px;
`

export const PropsHint = styled.span`
  display: inline-block;
  font-size: 12px;
  font-style: italic;
  font-weight: 600;
  margin-left: 12px;
`
