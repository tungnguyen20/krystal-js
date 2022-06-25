import { DataStream } from './types';
export declare class ModuleWrapper {
    private moduleName;
    private wrappedModuleName;
    constructor(moduleName: string);
    private getWrappedModule;
    invoke<T>(methodName: string, params?: {}): DataStream<T>;
    private checkHasModule;
    private getUnderlyingModule;
}
