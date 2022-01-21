import { SDKLogger } from '../logger';
export declare class PermissionService {
    private sdkLogger;
    constructor(sdkLogger: SDKLogger);
    requestAllPermissions(): Promise<any>;
}
