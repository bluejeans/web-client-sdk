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
- Moderator Controls
- Waiting Room Support
- 720p Video Capture

## New Features
- Individual stream control, create custom layouts, and request specific remote video streams

 **Not to be confused with:**

- **BlueJeans WebRTC Embed SDK**: This is an alternate SDK that allows the end user to embed the entire BlueJeans WebRTC Client. As such, this SDK provides an entire user interface, meaning the end user has to write much less code. However, it is also much less customizable. See https://bluejeans.github.io/webrtc-embed-sdk/docs/index.html

## Developer Portal 
Detailed documentation of SDK at our [developer portal](https://docs.bluejeans.com/Web_Client_SDK/Overview.htm)

## SDK API Documentation 
Detailed documentation of SDK functions is available [here](https://bluejeans.github.io/web-client-sdk)

## How does it work?

Two steps to experience BlueJeans meetings using the web client SDK. They are as below :

### Generate a meeting ID :

As a pre requisite to using the BlueJeans Web Client SDK to join meetings, you need to have a BlueJeans meeting ID. If you do not have a meeting ID then you can create one using a meeting schedule option using a BlueJeans account as below

- Sign up for a BlueJeans Account either by opting in for a [trial](https://www.bluejeans.com/free-video-conferencing-trial) or a [paid mode](https://store.bluejeans.com/)
- Once an account is created, you can schedule a meeting either by using the account or through [direct API](https://bluejeans.github.io/api-rest-howto/schedule.html) calls. In order to enable API calls on your account, please reach out to [support team](https://support.bluejeans.com/s/contactsupport).

### Integrate the BlueJeans Web Client SDK

Integrate the SDK by using the following guidelines at our [developer portal](https://docs.bluejeans.com/Web_Client_SDK/Overview.htm) and use SDK APIs to join a meeting with the meeting ID generated.


## A note on development environment

The Web Client SDK makes use of WebRTC APIs exposed by the browsers to get streams from Camera and Microphone. Due to security concerns, most browsers do not expose the WebRTC APIs in an http page. We recommend you use https while developing locally as well. Most modern build tools like webpack (through webpack dev server) support https out of the box.

## SDK Sample Application

We have bundled two sample apps in  [this repo](https://github.com/bluejeans/web-client-sdk). One for package manager and another for Vanilla Js setup. It showcases the integration of BlueJeans SDK for permission flow and joins the flow. They have got a basic UI functionality.

## Tracking & Analytics

BlueJeans collects data from app clients who integrate with SDK to join BlueJeans meetings like device information (ID, OS, etc.), coarse location (based on IP address), and usage data.

## Contributing

The BJNWebClientSDK is closed source and proprietary. As a result, we cannot accept pull requests. However, we enthusiastically welcome feedback on how to make our SDK better. If you think you have found a bug, or have an improvement or feature request, please file a GitHub issue or reach out to our support team at https://support.bluejeans.com/s/contactsupport and we will get back to you. Thanks in advance for your help!

## License

Copyright © 2022 BlueJeans Network. All usage of the SDK is subject to the Developer Agreement that can be found in [our repository](https://github.com/bluejeans/web-client-sdk) as License file. Download the agreement and send an email to api-sdk@bluejeans.com with a signed version of this agreement. Before any commercial or public facing usage of this SDK.

## Legal Requirements

Use of this SDK is subject to our [Terms & Conditions](https://www.bluejeans.com/legal/terms-of-service) and [Privacy Policy](https://www.bluejeans.com/privacy-policy)