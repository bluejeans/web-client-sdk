# Changelog

All notable changes to this project will be documented in this file

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

1. Format of JoinError codes has been changed to capitalized snake case (Eg : NETWORK_ERROR has been changed to NetworkError)
2. attachRemoteVideo now requires a div tag to be passed to it instead of a video tag
