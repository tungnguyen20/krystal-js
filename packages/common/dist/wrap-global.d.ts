import { DataStream } from './types';
export declare type Global = Window & typeof globalThis;
export declare type GlobalWrapModule = (global: Global, moduleName: string) => WrappedModule;
export interface WrappedModule {
    invoke<T>(methodName: string, params: Record<string, unknown>): DataStream<T>;
}
export declare function wrapModule(global: Global, moduleName: string): WrappedModule;
export declare function wrapModuleName(moduleName: string): string;
