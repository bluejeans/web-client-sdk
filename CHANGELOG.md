# Changelog

All notable changes to this project will be documented in this file

## Version 1.2.0

### Added

- ClosedCaptioningService


## Version 1.1.0

### Added

- ModeratorControlsService
  - Meetings recording
  - Mute/UnMute Audio/Video of other participants / all participants
  - Remove a participant from the meeting
  - End meeting for all immediately or after a certain delay
  - Spotlight a video participant


### Removed

- **BREAKING** Removed Connection state `DISCONNECTED` from MeetingService
  - Since you can now rejoin meetings, Connection state goes to `IDLE` once meeting ends. Please refer to the connection state flow chart in our README.md

## Version 1.0.1

### Fixed
- Meetings not working on Chrome v100 (and some Chrome Dev, Beta and Canary instances due to [Force Chrome major version to 100](https://developer.chrome.com/blog/force-major-version-to-100/))
## Version 1.0.0

### Added

- Join, End Meeting
- Audio and Video Permission handling
- Self Video
- Remote Video, Remote Video states
- Content receive
- Audio and Video self mute
- Audio device enumeration, Selection
- Video device enumeration, Selection
- Video Layout switch
- Participant list
- Participant properties: Audio mute state, Video mute state, is Self, Name and Unique Identifier
- Self Participant
- Content/Screen Share
- Log Upload
- Public and Private meeting Chat
- Meeting Information (Title, Hostname, Meeting Id)
- Video tile background customization options

### Changed

- Format of JoinError codes has been changed to capitalized snake case (Eg : NETWORK_ERROR has been changed to NetworkError)
- attachRemoteVideo now requires a div tag to be passed to it instead of a video tag