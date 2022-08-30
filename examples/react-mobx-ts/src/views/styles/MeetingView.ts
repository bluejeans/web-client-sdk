import styled from 'styled-components';
import { TextBox, TextBoxEmail, TextArea, ErrorMsg, LogUploadMsg} from './Common';

let video_on = require("../../../assets/icons/video_on_1.svg").default;
let video_off = require("../../../assets/icons/video_off_1.svg").default;
let audio_on = require("../../../assets/icons/audio_on_1.svg").default;
let audio_off = require("../../../assets/icons/audio_off_1.svg").default;
let video_off_remote = require("../../../assets/icons/video_off_remote.svg").default;
let audio_off_remote = require("../../../assets/icons/audio_off_remote.svg").default;
let moderator_badge = require("../../../assets/icons/moderator_star.svg").default;
let share = require("../../../assets/icons/share.svg").default;

export const MeetingControlContainer = styled<any, any>("div")`
    width: 400px;
    margin-top: 80px;
    margin-left: 30px;

    @media(max-width: 1100px) {
        display: flex;
        flex-direction: column;
        justify-self: center;
        margin: auto;
        margin-top: ${props => props.show ? props.chatShow ? "-22vh" : "14vh" : "55vh"}; 
    } 
    @media(max-height: 750px) {
        margin-top: ${props => props.show ? props.chatShow ? "0vh" : "16vh" : "3vh"}; 
    }

    @media(min-height: 300px) and (max-width: 1100px) {
        margin-top: ${props => props.show ? props.chatShow ? "0vh" : "16vh" : "50vh"}; 
    }

    @media only screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-self: center;
        width: auto;
        margin: 0px;
        margin-top: ${props => props.show ? props.chatShow ? "0vh"  : "4vh" : "55vh"}; 
    }
`

export const MeetingDetailsTable = styled.table`
    
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

export const MeetingControlButton = styled.button`
    width: 180px;
    display: block;
    padding: 4px;
    margin: 8px auto;
    border-radius: 4px;
    background: black;
    color: white;
    font-size: 14px;
    font-weight: bolder;
    cursor: pointer;
`
export const UploadLogButton = styled.button`
    width: 180px;
    display: block;
    padding: 4px;
    margin: 8px auto;
    border-radius: 4px;
    background: black;
    color: white;
    font-size: 14px;
    font-weight: bolder;
    cursor: pointer;
`
export const UploadLogButtonDisabled = styled.button`
    width: 180px;
    display: block;
    padding: 4px;
    margin: 8px auto;
    border-radius: 4px;
    background: gray;
    color: white;
    font-size: 14px;
    font-weight: bolder;
    cursor: pointer;
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
`

export const LeaveControlButton = styled(MeetingControlButton)`
    width: 232px;
    margin: 36px auto;
    padding: 8px;
    font-size: 18px;
`

export const JoinName = styled(TextBox)`
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
    left: 250px;
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
    left: 350px;
    display: inline-block;
    vertical-align: middle;
    background: url(${props => props.isMuted ? audio_off : audio_on}) no-repeat center;
`
export const AudioIconRemote = styled<any,any>("div")`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 350px;
    display: inline-block;
    vertical-align: middle;
    background: url(${props => props.isMuted ? audio_off_remote : audio_on}) no-repeat center;
`

export const VideoIcon = styled<any,any>("div")`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 300px;
    display: inline-block;
    vertical-align: middle;
    background: url(${props => props.isMuted ? video_off : video_on}) no-repeat center;
`
export const VideoIconRemote = styled<any,any>("div")`
    width: 24px;
    height: 24px;
    position: absolute;
    left: 300px;
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

export const WrRosterOptions = styled.div`
  background-color: #fff;
  text-align: center;
  padding: 8px 0px;
`

export const RosterList = styled.button`
  display : inline-block;
  width:40%;
  height:25px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  font-size: 13px;
  background-color:#dcdcde;
  color:gray;
  outline:none;
  border:none
`
export const WrParticipentList = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
`
export const WaitingRoomList = styled.button`
  display : inline-block;
  width:40%;
  height:25px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  font-size: 13px;
  background-color:#dcdcde;
  color:gray;
  outline:none;
  border: none;
`

export const RosterSelected = styled.button`
  display : inline-block;
  width:40%;
  height:25px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  font-size: 13px;
  background-color:#33a6e8;
  color:white;
  outline:none;
  border:none
`

export const WaitingRoomSelected = styled.button`
  display : inline-block;
  width:40%;
  height:25px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  font-size: 13px;
  background-color:#33a6e8;
  color:white;
  outline:none;
  border: none;
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
    width: 24px;
    height: 24px;
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
;
