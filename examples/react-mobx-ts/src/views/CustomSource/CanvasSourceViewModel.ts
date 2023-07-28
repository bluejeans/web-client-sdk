import { action, computed, observable } from 'mobx'
import Managers from '../../stores/Managers'
import AppManager from '../../stores/AppManager'
import { BJNWebClientSDK, VIDEO_SOURCE } from '@bluejeans/web-client-sdk'

export default class CanvasSourceViewModel {
  private appManager: AppManager
  private webrtcSDK: BJNWebClientSDK
  @observable customVideoSourceSelected: boolean = false
  private timerInterval
  private canvas: React.RefObject<HTMLCanvasElement>

  constructor(
    managers: Managers,
    canvasRef: React.RefObject<HTMLCanvasElement>,
  ) {
    this.appManager = managers.appManager
    this.webrtcSDK = managers.webrtcSDK
    this.customVideoSourceSelected = this.webrtcSDK.customVideoSourceService.videoSource === VIDEO_SOURCE.CUSTOM
    this.canvas = canvasRef
  }

  dispose(): void {
    clearInterval(this.timerInterval)
  }

  @action selectCustomVideoSource(val): void {
    const isChecked = val.currentTarget.checked
    if (isChecked) {
      const response = this.webrtcSDK.customVideoSourceService.setVideoSource(
        VIDEO_SOURCE.CUSTOM,
      )
      if (response.success) {
        this.customVideoSourceSelected = true
      }
      this.setCustomTrack()
    } else {
      this.customVideoSourceSelected = false
      this.webrtcSDK.customVideoSourceService.setVideoSource(
        VIDEO_SOURCE.CAMERA,
      )
      clearInterval(this.timerInterval)
      this.customVideoSourceSelected = false
    }
  }

  @computed get isCustomVideoSourceSelected() {
    return this.customVideoSourceSelected
  }

  @action setCustomTrack() {
    let customStream = this.createTricolourStreamOnCanvas()
    this.webrtcSDK.customVideoSourceService.setCustomVideoTrack(
      customStream.getTracks()[0],
    )
  }

  private createTricolourStreamOnCanvas(): MediaStream {
    //https://flashphoner.com/a-how-to-guide-on-canvas-streaming-via-webrtc/
    const canvas = this.canvas.current
    var ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ecec1b'
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const stripeHeight = canvasHeight / 3

    function tricolour() {
      ctx.fillStyle = '#720707' //"#FF9933";
      ctx.fillRect(0, 0, canvasWidth, stripeHeight)

      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, stripeHeight, canvasWidth, stripeHeight)

      ctx.fillStyle = '#092163' //"#128807";
      ctx.fillRect(0, stripeHeight * 2, canvasWidth, stripeHeight)

      ctx.font = 'bold 20px Arial'
      ctx.fillStyle = '#000000'
      ctx.textAlign = 'center'
      ctx.fillText(
        'Custom Video Source',
        canvasWidth / 2,
        stripeHeight * 2 - 20,
      )
    }

    // // Render at 30 fps
    this.timerInterval = setInterval(function () {
      tricolour()
    }, 1000 / 30)
    return canvas.captureStream(30)
  }
}
