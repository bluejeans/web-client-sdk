import { BJNWebClientSDK, LoggingMode } from '@bluejeans/web-client-sdk';
import AppManager from "./AppManager";
import ChatUIManager from "./ChatUIManager";

export default class Managers {

    webrtcSDK : BJNWebClientSDK;
    appManager : AppManager;
    chatUIManager : ChatUIManager
    
    constructor() {
        this.webrtcSDK = new BJNWebClientSDK();
        this.webrtcSDK.loggingService.setLoggingMode(LoggingMode.DEBUG);
        this.appManager = new AppManager(this.webrtcSDK);
        this.chatUIManager = new ChatUIManager(this.webrtcSDK);
        window["Debug"] = this;
    }
}