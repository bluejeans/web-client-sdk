# BlueJeans Web Client SDK

The BlueJeans Web Client Software Development Kit (SDK) enables embedding BlueJeans Video and Audio capabilities into web apps. BJNWebClientSDK is a single object that encapsulates all the API’s related to establishing a BlueJeans Video and Audio connection.

The design of the SDK emphasizes **simplicity**. Developers can quickly integrate BlueJeans video into their applications.

## Features

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

 **Not to be confused with:**

- **BlueJeans WebRTC Embed SDK**: This is an alternate SDK that allows the end user to embed the entire BlueJeans WebRTC Client. As such, this SDK provides an entire user interface, meaning the end user has to write much less code. However, it is also much less customizable. See https://bluejeans.github.io/webrtc-embed-sdk/docs/index.html

## How does it work?

Two steps to experience BlueJeans meetings using the web client SDK. They are as below :

### Generate a meeting ID :

As a pre requisite to using the BlueJeans Web Client SDK to join meetings, you need to have a BlueJeans meeting ID. If you do not have a meeting ID then you can create one using a meeting schedule option using a BlueJeans account as below

- Sign up for a BlueJeans Account either by opting in for a [trial](https://www.bluejeans.com/free-video-conferencing-trial) or a [paid mode](https://store.bluejeans.com/)
- Once an account is created, you can schedule a meeting either by using the account or through [direct API](https://bluejeans.github.io/api-rest-howto/schedule.html) calls. In order to enable API calls on your account, please reach out to [support team](https://support.bluejeans.com/s/contactsupport).

### Integrate the BlueJeans Web Client SDK

Integrate the SDK by using the following guidelines and use SDK APIs to join a meeting with the meeting ID generated.

## Integration Steps

### 1. Installation via Package Manager

To add `@bluejeans/web-client-sdk` as a dependency to your `package.json` file

```shell
npm i @bluejeans/web-client-sdk
```

Note: if you are using [styled-components](https://styled-components.com/docs/basics#motivation) as a dependency in your package, please use version `3.*.*` . However recommended version is `3.4.5`

#### Using the SDK

import the `BJNWebClientSDK` in your project using

```javascript
import { BJNWebClientSDK } from '@bluejeans/web-client-sdk';
```

and to create a new instance of the SDK

```javascript
let webClientSDK = new BJNWebClientSDK();
```

*Note: Only one instance of BJNWebClientSDK can be present in app at a time. Creating multiple instances may cause unexpected errors.*

### 2. Alternative installation instruction via script tag

 BJNWebClientSDK has dependency on [styled-components](https://styled-components.com/docs/basics#motivation) which internally has dependency on ReactJs. Please refer this [article](https://styled-components.com/docs/basics#installation) to get more info.

 Hence this style of usage of _BJNWebClientSDK_ requires the styled-components CDN bundles, react & related modules (before BJNWebClientSDK.js script)

 ```html
<script crossorigin src="https://unpkg.com/react@16.12.0/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16.12.0/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-is@16.12.0/umd/react-is.production.min.js"></script>
<script crossorigin src="https://unpkg.com/styled-components@3.4.5/dist/styled-components.js"></script>
<script crossorigin src="https://unpkg.com/@bluejeans/web-client-sdk@latest/dist/BJNWebClientSDK.js"></script>
 ```

#### Using the SDK

Create a new instance of the SDK using

```javascript
var webClientSDK = new BJNWebClientSDK.BJNWebClientSDK();
```

## API Architecture

APIs are grouped into relevant services as shown in the architecture diagram. All the service objects are available all the time after SDK instantiation, however all services are not active at all the time.
When inactive, APIs of the services will be null or undefined

<img width="870" alt="BJNWebClientSDKArch" src="https://bluejeans-non-embed-sdk.s3.us-west-2.amazonaws.com/web-client-sdk/assets/SDK-API-Structure.png">

### List of services :

#### 1. Globally active services

These services are available as soon as we initialize the SDK, and are available throughout out-of-meeting & in-meeting.

 Eg:  MeetingService, VideoDeviceService, AudioDeviceService, LoggingService and PermissionService.

#### 2. InMeeting active services

Unlike [Globally active services](#globally-active-services), InMeeting services get activated when _ConnectionState_ transitions to _CONNECTED_ and get inactivated
when meeting ends by the transition of connection state to _DISCONNECTED_

 Eg: ContentShareService, ParticipantsService, PublicChatService, PrivateChatService

## SDK Documentation

Detailed documentation of SDK functions is available [here]( https://bluejeans.github.io/web-client-sdk).


## Join Meeting

#### Steps to join meeting

- Use meeting service and call joinMeeting API to join a meeting
- Observe the Join API result by checking the connectionState on meetingService

### Sample code for joinMeeting
To join a meeting

```javascript
webClientSDK.meetingService.joinMeeting("<Meeting_ID>","<PASSCODE>", "<DISPLAY_NAME>").then(() => {
   console.log("Success");
},(error)=>{
   console.error("Meeting join failed with error: ", JSON.stringify(error));
})
```

*Note: The BJNWebClientSDK ties its session to the meeting ID given here. Also, since there can't be more than one instance of the SDK in the same webapp, if the meeting join fails for some reason or you would like to join another meeting after leaving the first one, you would need a page reload*

## Adding Video Views

Video views for Local video, Content video and Remote video can be added to your webpage as follows

Pass a [video element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) for each of the following:

- Local Video - The preview video for your self
- Remote Content Video - The video for the screen share from other participants

Now, attach these videos to the SDK

```javascript
webClientSDK.meetingService.attachLocalVideo("<localVideoElement>");

webClientSDK.meetingService.attachRemoteContent("<contentvideoElement>");
```

Pass a [div element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) for :

- Remote Video - The video coming in from other participants and for receiving Video Share

```javascript
webClientSDK.meetingService.attachRemoteVideo("<remotevideoDivElement>");
```

## Leave Meeting

Disconnect from the meeting using `endMeeting` method in MeetingService.

```javascript
webClientSDK.meetingService.endMeeting()
```

Note: when `meetingService.connectionState` changes to _DISCONNECTED_ state, then it can be safely assumed, participant has left the meeting.

## Observing Properties

Each service which has observable properties also exposes an observe API/function. _observe_ allows observing changes to properties. Provide the property which you are interested in and a callback. Whenever the property value changes, you will be notified via the callback. Please note, _observe_ doesn't allow observing changes to methods mentioned in the services.

**Note:**
As mentioned in API Architecture section, InMeeting services get activated when _ConnectionState_ transitions to _CONNECTED_. Please register all callbacks for inMeeting Services after connection state becomes connected to get accurate information

```javascript
webClientSDK.meetingService.observe("connectionState", function() {
   console.info("Connection state is changed to : ", webClientSDK.meetingService.connectionState)
});
```

## Logging

You can set log level for the SDK by using `setLoggingMode` method in LoggingService to one of the logging mode mentioned in docs.

```javascript
webClientSDK.loggingService.setLoggingMode("<LoggingMode>");
```

### Upload logs

Logs can be uploaded while reporting an issue using `uploadLog` method in LoggingService

```javascript
webClientSDK.loggingService.uploadLog("<Comments/Issue description>","<emailId>");
```

Note:
While initializing sdk in [SDK customizations](#sdk-customizations) with `saveLogsToLocalStorage: false`. Logs will not be stored in local storage. Beacause of this, _Upload logs_ functionality will not work.  

## Participant self a/v mute

Use `setAudioMuted` method in MeetingService to mute/unmute self audio and

`setVideoMuted` method in MeetingService to mute/umnute self video

```javascript
webClientSDK.meetingService.setAudioMuted(false) //to unmute your audio
webClientSDK.meetingService.setAudioMuted(true) //to mute your audio
```

## Select devices

The webrtc SDK will use your default devices out of the box. If you want to choose which camera/speaker/mic to use. You can see the list of available devices by calling `videoDeviceService.availableCameras`, `audioDeviceService.availableMicrophones` or `audioDeviceService.availableSpeakers` and then use `videoDeviceService.selectCamera()`, `audioDeviceService.selectMicrophone()` or `audioDeviceService.selectSpeaker()` to choose camera, mic and speaker devices respectively.

Note: Most browsers expose the list of devices available only when the user has given audio/video permissions. So please ensure you have called either permissionService.requestAllPermissions or meetingService.joinMeeting before attempting to change devices

```javascript
let availableCameras = webClientSDK.videoDeviceService.availableCameras;
webClientSDK.videoDeviceService.selectCamera(availableCameras[1]);
```

Additional Note:
Sometimes browser/OS restrict speaker/microphone selection.
Please ensure you have called either `AudioDeviceService.isSpeakerSelectionAllowed` or `AudioDeviceService.isMicrophoneSelectionAllowed` before doing speaker/microphone selection.

### Microphone Selection

```javascript
if(webClientSDK.audioDeviceService.isMicrophoneSelectionAllowed) {
   let availableMicrophones = webClientSDK.audioDeviceService.availableMicrophones
   webClientSDK.audioDeviceService.selectMicrophone(availableMicrophones[0])
}
```

### Speaker Selection

```javascript
if(webClientSDK.audioDeviceService.isSpeakerSelectionAllowed) {
   let availableSpeakers = webClientSDK.audioDeviceService.availableSpeakers
   webClientSDK.audioDeviceService.selectSpeaker(availableSpeakers[0])
}
```

## Initiate Screen Share

Initiate screen share by using `startContentShare` method in ContentShareService

```javascript
if(webClientSDK.contentShareService.isContentShareSupported) {
   webClientSDK.contentShareService.startContentShare();
}
```

## List of participants

To get a list of participants in a meeting, use `participantService.participants` property. It returns an array of `participant`.

## Change Layouts

To change your current video layout, call `meetingService.setVideoLayout()` function with one of `VideoLayout` mentioned in docs.

## Chat Services

From sdk we have exposed PublicChatService & PrivateChatService

### 1. PublicChatService  

Helps in sending messages to all participants in a meeting. These messages will be visible to all participant.

**Send:** a new public chat message using sendMessage in PublicChatService

```javascript
webClientSDK.meetingService.publicChatService.sendMessage("Hello World public");
```

**Receive:** You can get the entire list of messages in a meeting (including new messages) by observing chatHistroy.

```javascript
webClientSDK.meetingService.publicChatService.observe("chatHistory", function() {
        console.info("public chatHistory : ", webClientSDK.meetingService.publicChatService.chatHistory)
});
```

Users can also subscribe to `newMessage` event in PublicChatStoreEvents to get new messages.

### 2. PrivateChatService

Helps in sending messages to individual private messages to selected participant. These messages will be visible to only selected participant.

**Send** a new private chat message using sendMessage in PrivateChatService

```javascript
webClientSDK.meetingService.privateChatService.sendMessage("Hello participant", "<participantGuid: string>");
```

**Receive** You can get the entire list of messages in a meeting (including new messages) by observing chatHistoryByParticipant. This would give a map of participants and your direct message history with them.

```javascript
webClientSDK.meetingService.privateChatService.observe("chatHistory", function() {
        console.info("private chatHistory updated: ", webClientSDK.meetingService.privateChatService.chatHistoryByParticipant);
});
```

Users can also subscribe to `newMessage` event in PrivateChatStoreEvents  to get new messages.

## SDK customizations

Using `BlueJeansSDKInitParams` one can customize the SDK experience by setting

### 1.  Customize background colour

Options listed in customizationParams will help customize different background colours

```javascript
let webClientSDK = new BJNWebClientSDK({
    customizationParams:{
        audioTileColor:"red",
        containerColorOfAllTiles:"blue",
        videoTileBackgroundColor:"green"
    }
})
```

### 2. Configure logging

This initial parameter saveLogsToLocalStorage will help customers configure logs saved to local storage

```javascript
let webClientSDK = new BJNWebClientSDK({
    saveLogsToLocalStorage: true
})
```

Note : Default value of saveLogsToLocalStorage is true.
Once set to false, logs will not be saved to local storage, and also can not be uploaded. Also refer [Upload-logs](#upload-logs) section.

## Remote Video

Remote Video refers to the video coming in from other participants.
When a participant joins a meeting with other participants already in it.
There will multiple tiles/boxes which will contain other participants.

<img width="870" alt="BJNWebClientSDKArch" src="https://bluejeans-non-embed-sdk.s3.us-west-2.amazonaws.com/web-client-sdk/assets/gallery.png">

Each tile has some features attached to it:

1. If video is not on for participant, their initials will be displayed.
2. Initials will correspond to name displayed in the strip at the bottom of the box.
3. Bottom strip in each tile will also contain audio mute state indicator.
4. It will also contain a network indicator bar, indicating how strong is the network of the participant currently in a call.
5. The colour of the tile can be configured as already explained [SDK customizations](#sdk-customizations)

## Running video on FireFox

On other browsers we support layout of remote video as described [above](#remote-video).
However on firefox, we support remote video as following:

1. Video tile will only be shown for participants who have their video on.
2. Consequently layout changes can be made, when there are multiple participants with video on.
3. If all participants have their video turned off, we will show a custom no-video screen.

## A note on development environment

The Web Client SDK makes use of WebRTC APIs exposed by the browsers to get streams from Camera and Microphone. Due to security concerns, most browsers do not expose the WebRTC APIs in an http page. We recommend you use https while developing locally as well. Most modern build tools like webpack (through webpack dev server) support https out of the box.

## SDK Sample Application

We have bundled two sample apps in this repo. One for package manager and another for Vanilla Js setup. It showcases the integration of BlueJeans SDK for permission flow and joins the flow. They have got a basic UI functionality.

## Tracking & Analytics

BlueJeans collects data from app clients who integrate with SDK to join BlueJeans meetings like device information (ID, OS, etc.), coarse location (based on IP address), and usage data.

## Contributing

The BJNWebClientSDK is closed source and proprietary. As a result, we cannot accept pull requests. However, we enthusiastically welcome feedback on how to make our SDK better. If you think you have found a bug, or have an improvement or feature request, please file a GitHub issue or reach out to our support team at https://support.bluejeans.com/s/contactsupport and we will get back to you. Thanks in advance for your help!

## License

Copyright © 2022 BlueJeans Network. All usage of the SDK is subject to the Developer Agreement that can be found in [our repository](https://github.com/bluejeans/web-client-sdk) as License file. Download the agreement and send an email to api-sdk@bluejeans.com with a signed version of this agreement. Before any commercial or public facing usage of this SDK.

## Legal Requirements

Use of this SDK is subject to our [Terms & Conditions](https://www.bluejeans.com/terms-and-conditions-may-2020) and [Privacy Policy](https://www.bluejeans.com/privacy-policy).