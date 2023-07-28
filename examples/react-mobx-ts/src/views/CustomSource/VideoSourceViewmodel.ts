import { action, computed, observable } from 'mobx'
import Managers from '../../stores/Managers'
import { BJNWebClientSDK, VIDEO_SOURCE } from '@bluejeans/web-client-sdk'

const ua = navigator.userAgent

// safari doesn't support video.captureStream() but it does support canvas.captureStream()
// see: https://caniuse.com/?search=HTMLMediaElement.captureStream
// browser detection: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#browser_name_and_version
const isSafari =
  /Safari\//.test(ua) && !/Chrome\//.test(ua) && !/Chromium\//.test(ua)

export default class VideoSourceViewModel {
  private webrtcSDK: BJNWebClientSDK
  private timerInterval: any
  private videoRef: React.RefObject<HTMLVideoElement>

  constructor(managers: Managers, videoRef: React.RefObject<HTMLVideoElement>) {
    this.webrtcSDK = managers.webrtcSDK
    this.videoRef = videoRef
  }

  dispose(): void {
    clearInterval(this.timerInterval)
  }

  waitForPlay(): void {
    this.dispose()
    this.videoRef.current.addEventListener('play', () => this.setCustomTrack())
  }

  setCustomTrack() {
    const video: HTMLVideoElement = this.videoRef.current
    let customStream: MediaStream
    if (isSafari) {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      this.timerInterval = setInterval(() => {
        ctx.drawImage(video, 0, 0)
      }, 1000 / 30)
      customStream = canvas.captureStream()
    } else {
      // firefox still prefixes 'moz' on mozCaptureStream
      const methodName =
        'captureStream' in video ? 'captureStream' : 'mozCaptureStream'
      customStream = video[methodName]()
    }

    this.webrtcSDK.customVideoSourceService.setVideoSource(VIDEO_SOURCE.CUSTOM)
    const tracks = customStream.getTracks()
    const videoTrack = tracks.find((track) => track.kind === 'video')
    this.webrtcSDK.customVideoSourceService.setCustomVideoTrack(videoTrack)
  }
}
