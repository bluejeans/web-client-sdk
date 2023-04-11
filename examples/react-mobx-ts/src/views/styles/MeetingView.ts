import styled from 'styled-components';
import { TextBox, TextBoxEmail, TextArea, ErrorMsg, LogUploadMsg, Button, hoveredButtonColor, disabledButtonColor, unselectedButtonColor, buttonColor} from './Common';

let video_on = require("../../../assets/icons/video_on_1.svg").default;
let video_off = require("../../../assets/icons/video_off_1.svg").default;
let audio_on = require("../../../assets/icons/audio_on_1.svg").default;
let audio_off = require("../../../assets/icons/audio_off_1.svg").default;
let video_off_remote = require("../../../assets/icons/video_off_remote.svg").default;
let audio_off_remote = require("../../../assets/icons/audio_off_remote.svg").default;
let moderator_badge = require("../../../assets/icons/moderator_star.svg").default;
let share = require("../../../assets/icons/share.svg").default;
let pin_initial = require("../../../assets/icons/pin_initial.svg").default;
let pin_enable = require("../../../assets/icons/pin_enable.svg").default;
let pin_gray = require("../../../assets/icons/pin_gray.svg").default;

export const MeetingControlContainer = styled<any, any>("div")`
    width: 400px;
    margin-top: 10px;
    margin-left: 30px;

    @media(max-width: 1100px) {
        display: flex;
        flex-direction: column;
        justify-self: center;
        margin: auto;
    }
    @media only screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-self: center;
        width: auto;
        margin: 0px;
    }
`

export const MeetingDetailsTable = styled.table`
color: white
`

export const MeetingDetailsTableBody = styled.tbody`

`

export const MeetingDetailsTableRow = styled.tr`
`

export const MeetingDetailsTableData = styled.td`
`

export const MeetingDetailsTableContent = styled.div`
    margin: 8px auto;
    width: 180px;
`

export const MeetingControlButton = styled<any,any>(Button)`
`

export const MeetingDeviceDropdown = styled.select`
    width: 180px;
    display: block;
    padding: 4px;
    margin: 8px auto;
    border-radius: 4px;
    background: white;
    color: black;
    font-size: 14px;
    opacity: ${props => props.disabled ? "0.5" : "1"}
`

export const LeaveControlButton = styled(MeetingControlButton)`
    width: 232px;
    margin: 36px auto;
    padding: 8px;
    font-size: 18px;
`

export const JoinName = styled(TextBox)`
    margin: 8px;
    width: 160px;
`
export const EmailID = styled(TextBoxEmail)`
    width: 160px;
`
export const TextAreaComment = styled(TextArea)`
    width: 160px;
`
export const ErrorMessage = styled(ErrorMsg)`
    width: 160px;
`
export const LogUploadMessage = styled(LogUploadMsg)`
    width: 160px;
`

export const MeetingRoster = styled.div`
    width: 100%;
    max-height: 600px;
    margin-top: 20px;
    background: white;
    overflow-y: auto;
`

export const ParticipantList = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
`

export const RosterHeader = styled.div`
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
`

export const ParticipantListItem = styled<any,any>("div")`
    width: 100%;
    height: 30px;
`

export const ModeratorBadge = styled.div`
    width: 18px;
    height: 18px;
    transform: scale(0.7);
    position: absolute;
    left: 40px;
    display: inline-block;
    vertical-align: middle;
    background: url(${moderator_badge}) no-repeat center;
`

export const SharingBadge = styled.div`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 210px;
    display: inline-block;
    vertical-align: middle;
    background: url(${share}) no-repeat center;
`

export const ParticipantName = styled.div`
    position: absolute;
    left: 70px;
    display: inline-block;
    max-width: 200px;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const AudioIcon = styled<any,any>("div")`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 300px;
    display: inline-block;
    vertical-align: middle;
    background: url(${props => props.isMuted ? audio_off : audio_on}) no-repeat center;
`
export const PinnedParticipantController = styled<any,any>("div")`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 350px;
    display: inline-block;
    vertical-align: middle;
    background: url(${props => props.isEnabled ? pin_enable : pin_initial}) no-repeat center;
    cursor: pointer;

`
export const AudioIconRemote = styled<any,any>("div")`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 300px;
    display: inline-block;
    vertical-align: middle;
    background: url(${props => props.isMuted ? audio_off_remote : audio_on}) no-repeat center;
`

export const VideoIcon = styled<any,any>("div")`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 250px;
    display: inline-block;
    vertical-align: middle;
    background: url(${props => props.isMuted ? video_off : video_on}) no-repeat center;
`
export const VideoIconRemote = styled<any,any>("div")`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 250px;
    display: inline-block;
    vertical-align: middle;
    background: url(${props => props.isMuted ? video_off_remote : video_on}) no-repeat center;
`

export const SpeakerLabel = styled<any, any>("div")`
    display: inline-block;
    width: 180px;
    margin: 0 0 0 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`
export const MicrophoneLabel = styled<any, any>("div")`
    display: inline-block;
    width: 180px;
    margin: 0 0 0 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

export const BadgeLabel=styled.div`

 >span {
    position: relative;
    top: -21px;
    right: 10px;
    padding: 1px 5px;
    border-radius: 50%;
    background-color: red;
    color: white;
 }

`

export const RosterOptions = styled.div`
  background-color: #fff;
  text-align: center;
  padding: 8px 0px;
`

export const WrParticipantList = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
`

const Option = styled<any,any>(Button)`
    display : inline-block;
    width:40%;
    height:25px;
    border-radius: 0;
    font-size: 13px;
`

export const RosterOption = styled<any,any>(Option)`
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  background-color: ${(props) => props.selected ? buttonColor : unselectedButtonColor }
`

export const WaitingRoomOption = styled<any,any>(Option)`
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  opacity: 1;
  background-color: ${(props) => props.selected ? buttonColor : unselectedButtonColor }
  :hover {
    background-color: ${props => props.disabled ? unselectedButtonColor : hoveredButtonColor };
  }
`

export const WaitingRoomListItem= styled<any,any>("div")`
    width: 100%;
    height: 30px;
`

export const WrParticipantName = styled.div`
    position: absolute;
    left: 70px;
    display: inline-block;
    max-width: 200px;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: gray;
`
export const WrHeading = styled.div`
    position: absolute;
    left: 70px;
    display: inline-block;
    max-width: 200px;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 900;
    font-size: 19px;
`

export const WrParticipantControl = styled.div`
    width: 64px;
    height: 34px;
    position: absolute;
    left: 300px;
    display: inline-block;
    vertical-align: middle;
`
export const WrRejectParticipant = styled.button`
    width: 50px;
    height: 24px;
    position: absolute;
    left: 270px;
    display: inline-block;
    vertical-align: middle;
    background-color: rgb(86, 98, 113);
    color: white;
    border-radius: 8px;
    border: none;
`
export const WrApprovedParticipant = styled.button`
    width: 50px;
    height: 24px;
    position: absolute;
    left: 330px;
    display: inline-block;
    vertical-align: middle;
    background-color:  rgb(48, 202, 119);
    color: white;
    border-radius: 8px;
    border: none
`

export const WrRejectAll = styled.button`
    width: 100px;
    height: 27px;
    position: absolute;
    left: 90px;
    display: inline-block;
    vertical-align: middle;
    background-color: rgb(86, 98, 113);
    color: white;
    border-radius: 8px;
    border: none;
`
export const WrApprovedAll= styled.button`
    width: 100px;
    height: 27px;
    position: absolute;
    left: 200px;
    display: inline-block;
    vertical-align: middle;
    background-color:  rgb(48, 202, 119);
    color: white;
    border-radius: 8px;
    border: none
`
export const LabelToggle = styled.label`
    display: flex;
    font-size: 13px;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    color: white;
`;
export const SwitchToggle = styled.div`
    position: relative;
    width: 33px;
    height: 14px;
    background: #b3b3b3;
    border-radius: 32px;
    padding: 4px;
    transition: 300ms all;

    &:before {
        transition: 300ms all;
        content: "";
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 35px;
        top: 50%;
        left: 4px;
        background: white;
        transform: translate(0, -50%);
    }
`
export const InputToggle = styled.input`
    opacity: 0;
    position: absolute;

    &:checked + ${SwitchToggle} {
        background: green;
        &:before {
            transform: translate(18px, -50%);
        }
    }
`;