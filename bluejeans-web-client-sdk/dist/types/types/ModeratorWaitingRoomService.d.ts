import { AsyncAPIResponse } from '../sdk-objects';
export interface AdmitAllWrResponse {
    error?: object;
    code: AdmitAllWrResponseCode;
}
export declare enum AdmitAllWrResponseCode {
    WR_ADMIT_ALL_SUCCESS = "WR_ADMIT_ALL_SUCCESS",
    WR_ADMIT_ALL_FAILURE = "WR_ADMIT_ALL_FAILURE",
    WR_ALREADY_DISABLED = "WR_ALREADY_DISABLED"
}
export interface DenyAllWrResponse extends AsyncAPIResponse {
    code: DenyAllWrResponseCode;
}
export declare enum DenyAllWrResponseCode {
    WR_DENY_ALL_SUCCESS = "WR_DENY_ALL_SUCCESS",
    WR_DENY_ALL_FAILURE = "WR_DENY_ALL_FAILURE",
    WR_DISABLED = "WR_DISABLED"
}
export interface ApiResponse {
    ok: boolean;
    status: string;
}
export interface AdmitParticipantWrResponse extends AsyncAPIResponse {
    code: AdmitParticipantWrResponseCode;
}
export declare enum AdmitParticipantWrResponseCode {
    WR_ADMIT_PARTICIPANT_SUCCESS = "WR_ADMIT_PARTICIPANT_SUCCESS",
    WR_ADMIT_PARTICIPANT_FAILURE = "WR_ADMIT_PARTICIPANT_FAILURE",
    WR_ALREADY_DISABLED = "WR_ALREADY_DISABLED"
}
export interface DenyParticipantWrResponse extends AsyncAPIResponse {
    code: DenyParticipantWrResponseCode;
}
export declare enum DenyParticipantWrResponseCode {
    WR_DENY_PARTICIPANT_SUCCESS = "WR_DENY_PARTICIPANT_SUCCESS",
    WR_DENY_PARTICIPANT_FAILURE = "WR_DENY_PARTICIPANT_FAILURE",
    WR_DISABLED = "WR_DISABLED"
}
export interface DemoteParticipantWrResponse extends AsyncAPIResponse {
    code: DemoteParticipantWrResponseCode;
}
export declare enum DemoteParticipantWrResponseCode {
    WR_DEMOTE_PARTICIPANT_SUCCESS = "WR_DEMOTE_PARTICIPANT_SUCCESS",
    WR_DEMOTE_PARTICIPANT_FAILURE = "WR_DEMOTE_PARTICIPANT_FAILURE",
    WR_DISABLED = "WR_DISABLED",
    WR_DEMOTE_MODERATOR_FAILURE = "WR_DEMOTE_MODERATOR_FAILURE"
}
export interface ToggleWaitingRoomResponse extends AsyncAPIResponse {
    code: ToggleWaitingRoomResponseCode;
}
export declare enum ToggleWaitingRoomResponseCode {
    WR_ENABLE_SUCCESS = "WR_ENABLE_SUCCESS",
    WR_DISABLE_SUCCESS = "WR_DISABLE_SUCCESS",
    WR_ENABLE_DISABLE_FAILURE = "WR_ENABLE_DISABLE_FAILURE",
    WR_DISABLED = "WR_DISABLED",
    WR_ENABLED = "WR_ENABLED",
    WR_MEETING_NOT_CAPABLE = "WR_MEETING_NOT_CAPABLE"
}
export interface WaitingRoomParticipant {
    id: string;
    name: string;
}
