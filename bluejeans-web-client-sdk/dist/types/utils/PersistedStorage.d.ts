import * as idbkeyval from 'idb-keyval';
interface idb {
    entries(): Promise<string[][]>;
    keys(): Promise<string[]>;
    get(key: string): Promise<string>;
    del(key: string): Promise<void>;
    set(key: string, value: string): Promise<void>;
}
export interface IPersistedStorage {
    getKeys(): Promise<string[]>;
    removeItem: (key: string) => void;
    getItem: (key: string) => Promise<string>;
    setItem: (key: string, value: string) => Promise<any>;
}
export declare class PersistedStorageFactory {
    private static storage;
    static create(prefix: string, win?: Window & typeof globalThis, idb?: typeof idbkeyval): Promise<PersistedStorage>;
    static clear(): void;
}
export interface StorageAdapter {
    maxLength: number;
    type: string;
    getKeys(): Promise<string[]>;
    removeItem: (key: string) => void;
    getItem: (key: string) => Promise<string>;
    setItem: (key: string, value: string) => Promise<void>;
}
export declare class LocalStorageStore implements StorageAdapter {
    localstorage: Storage;
    maxLength: number;
    type: string;
    constructor(st: Storage);
    getKeys(): Promise<string[]>;
    removeItem(key: any): void;
    getItem(key: any): Promise<string>;
    setItem(key: string, value: string): Promise<void>;
}
export declare class IndexedDbStore implements StorageAdapter {
    idb: idb;
    maxLength: number;
    type: string;
    constructor(st: idb);
    getKeys(): Promise<string[]>;
    removeItem(key: any): void;
    getItem(key: any): Promise<string>;
    setItem(key: string, value: string): Promise<void>;
}
export declare class PersistedStorage implements IPersistedStorage {
    storedLength: number;
    maxLength: number;
    entryPrefix: string;
    store: any;
    type: string;
    constructor(prefix: string);
    setup(store: StorageAdapter): void;
    get freeSpace(): number;
    calcUsage(desiredFreeSpace?: number): Promise<void>;
    getKeys(): Promise<string[]>;
    freeStorage(needed: number): Promise<void>;
    getItem(key: string): Promise<string>;
    removeItem(key: string): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
}
export {};
