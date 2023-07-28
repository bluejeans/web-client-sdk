import { BJNWebClientSDK, LoggingMode } from '@bluejeans/web-client-sdk'
import AppManager from './AppManager'
import ChatUIManager from './ChatUIManager'
import CustomLayoutManager from './CustomLayoutManager'

export default class Managers {
  webrtcSDK: BJNWebClientSDK
  appManager: AppManager
  chatUIManager: ChatUIManager
  customLayoutManager: CustomLayoutManager

  constructor() {
    this.webrtcSDK = new BJNWebClientSDK({
      appMetaData: {
        appName: 'webClientSDK_react_mobx_example_app',
      },
    })
    this.webrtcSDK.loggingService.setLoggingMode(LoggingMode.DEBUG)
    this.appManager = new AppManager(this.webrtcSDK)
    this.chatUIManager = new ChatUIManager(this.webrtcSDK)
    this.customLayoutManager = new CustomLayoutManager(this.webrtcSDK)
    window['Debug'] = this
  }
}
