# Known limitations

## Chrome

### macOS

<details>
<summary>Incorrect auto microphone device selection while changing wired device in between call on Mac Chrome</summary>
<p>

While default microphone is selected in chrome in the meeting, and user attaches another microphone to the computer which is chosen as the default device by the OS, the label for default device updates in `availableMicrophones`  to the new default. However, audio continues to flow from the earlier default device, and the name for default device in `selectedMicrophone`  is still the older default name.
Once user manually selects microphone from list of available microphones, this erroneous behaviour will be resolved.

Attaching  sample erroneous output  of  `availableMicrophones` & `selectedMicrophone`  api after attaching external microphone.

<img width="870" alt="sample-default-microphone-issue" src="https://bluejeans-non-embed-sdk.s3.us-west-2.amazonaws.com/web-client-sdk/assets/sample-default-microphone-issue.png">
<hr/>
</p>
</details>

### Fedora

<details>
<summary>Black screen when sharing entire screen from Chrome 96 on Fedora using Wayland</summary>
<p>

Please find more details in this [bugzilla link](https://bugzilla.redhat.com/show_bug.cgi?id=1392072). Individual App/tab sharing works with Wayland. You would need to switch to X11 to share entire screen.
<hr/>
</p>
</details>

## Safari

### macOS

<details>
<summary>
    No audio is sent when microphone is switched to Bluetooth during the call on Safari desktop.
</summary>
<p>

This observation is seen on safari 15.1 & above.
Also, the behavior happens only when we switch to the Bluetooth headset.
<hr/>
</p>
</details>

### iOS

<details>
<summary>Intermittent robotic hoarse sound on ios safari</summary>
<p>

After joining a meeting from ios Safari, mostly when a headset is connected. Intermittently the iOS Safari participant starts hearing audio from other participants in robotic form. Currently, the workaround is to close Safari browser and rejoin the meeting
<hr/>
</p>
</details>

<details>
<summary>iOS15.5: The webpage gets reloaded when returning to the meeting from an application that uses audio/video</summary>
<p>

If you switch your Safari meeting to an application that uses audio/video and keep the webpage in background for longer than 30 seconds, the page reloads.
<hr/>
</p>
</details>

<details>
<summary>iOS 15.1: Video goes black and the page freezes on certain interruptions</summary>
<p>

Certain interruptions such as incoming calls, backgrounding the browser or switching between apps causes Videos on Safari on iOS 15.1 to go black. Sometimes, the whole page also freezes and become unresponsive causing audio and video to cut off. These issues are regressions on iOS 15.1. See the following bugs for more details.

- [Page freezing](https://bugs.webkit.org/show_bug.cgi?id=230922#c12)
- [Video going black](https://bugs.webkit.org/show_bug.cgi?id=232599)

<hr/>
</p>
</details>

<details>
<summary>iOS 15: Low audio volume in Safari</summary>
<p>

Safari on iOS version 15, sometimes routes audio to the earpiece and not the speakers by default. Which customers some time perceive as low audio volume. Find more details in this [Webkit Issue](https://bugs.webkit.org/show_bug.cgi?id=230902)
<hr/>
</p>
</details>

## Firefox

<details>
<summary>Camera light not turning off on Window's Firefox</summary>
<p>

More details can be found in this [Bugzilla Issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1694304)
<hr/>
</p>
</details>

## WebView

### Android

<details>
<summary>Meeting audio may not be muted while answering an incoming PSTN call</summary>
<p>

If you answer an incoming PSTN call during a meeting, you may hear the meeting audio and the PSTN audio at the same time.
<hr/>
</p>
</details>

### iOS
<details>
<summary>No microphone access while the app goes background in iOS </summary>
<p>

App looses microphone access once the app goes in background.

More details can be found in this [WebKit issue](https://bugs.webkit.org/show_bug.cgi?id=233419)

<hr/>
</p>
</details>