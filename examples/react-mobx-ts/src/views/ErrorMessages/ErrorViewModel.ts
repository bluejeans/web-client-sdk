import { action } from 'mobx'
import Managers from '../..//stores/Managers'
import AppManager from '../../stores/AppManager'
import { BJNWebClientSDK } from '@bluejeans/web-client-sdk'

export default class ErrorViewModel {
  private appManager: AppManager
  private webrtcSDK: BJNWebClientSDK

  constructor(managers: Managers) {
    this.appManager = managers.appManager
    this.webrtcSDK = managers.webrtcSDK
  }

  @action.bound setErrorFlagFalse(): void {
    this.appManager.setErrorFlag(false)
  }
}
