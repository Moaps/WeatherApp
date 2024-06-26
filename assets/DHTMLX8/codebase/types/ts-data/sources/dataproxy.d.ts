import { IDataProxy } from "./types";
export declare class DataProxy implements IDataProxy {
    url: string;
    config: any;
    protected _url: string;
    constructor(url: string, config?: {});
    updateUrl(url?: string, params?: any): void;
    load<T = string>(): Promise<T | void>;
    save(data: any, mode: string): Promise<any>;
}
