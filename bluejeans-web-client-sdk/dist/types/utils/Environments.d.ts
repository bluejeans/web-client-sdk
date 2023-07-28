import { OSTypes, OSNames, BrowserNames, BrowserTypes, DeviceTypes } from './Constants';
declare global {
    interface Window {
        parseInt: any;
    }
}
export declare class EnvironmentFacet {
    id: string;
    name: string;
    suggestedVersion: any;
    minVersion: any;
    isSupportedVersion: (candidateVersion: any) => boolean;
    constructor(id: string, name: string, minVersion: any, suggestedVersion: any, isSupportedVersion: any, downloadUrl?: string);
    private getVersionParts;
    private compareVersions;
    toString(): string;
}
declare class Device extends EnvironmentFacet {
    constructor(id: string, name: string, minVersion: any, suggestedVersion: any, isSupportedVersion: any);
}
declare class OperatingSystem extends EnvironmentFacet {
    constructor(id: OSTypes, name: OSNames, minVersion: any, suggestedVersion: any, isSupportedVersion: any);
}
declare class Browser extends EnvironmentFacet {
    constructor(id: BrowserTypes, name: BrowserNames, minVersion: any, suggestedVersion: any, isSupportedVersion: any);
}
declare class InstructionSet extends EnvironmentFacet {
    constructor(id: string, name: string, minVersion: any, suggestedVersion: any, isSupportedVersion: any);
}
declare class Environment {
    device: Device;
    operatingSystem: OperatingSystem;
    browser: Browser;
    instructionSet: InstructionSet;
    cookies: any;
    constructor(device: any, operatingSystem: any, browser: any, instructionSet: any, cookies: any);
    equals(other: any): boolean;
}
declare class Environments {
    currentEnvironment: Environment;
    private browserDetector;
    private minWebRTCBrowserVersion;
    constructor();
    private setCurrentEnvironment;
    get currentOSType(): OSTypes;
    get currentBrowserType(): BrowserTypes;
    get currentBrowserName(): BrowserNames;
    get currentDeviceType(): DeviceTypes;
    private compareChromeVersion;
    isSafariBrowserOnIPhone(): boolean;
    hasWebRTCApis(): boolean;
    isChromiumEdge(ua: any): boolean;
    get isLinuxEnvironment(): boolean;
    get versionString(): string;
    get browserVersion(): string;
    get isMobileDevice(): boolean;
}
export default Environments;
