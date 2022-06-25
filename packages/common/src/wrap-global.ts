import { DataStream } from './types';

export type Global = Window & typeof globalThis;

export type GlobalWrapModule = (global: Global, moduleName: string) => WrappedModule;

export interface WrappedModule {
  invoke<T>(methodName: string, params: Record<string, unknown>): DataStream<T>;
}

export function wrapModule(global: Global, moduleName: string): WrappedModule {
  const globalWrapModule = global['wrapModule'] as GlobalWrapModule;

  if (globalWrapModule != null) {
    return globalWrapModule(global, moduleName);
  } else {
    if (typeof document !== 'undefined') {
      throw Error('Please install @krystal-js/web-bridge before using any feature of krystal-js');
    } else if (navigator && navigator.product === 'ReactNative') {
      throw Error('Please install @krystal-js/react-native-bridge before using any feature of krystal-js');
    } else {
      throw new Error('Unsupported environment');
    }
  }
}

export function wrapModuleName(moduleName: string): string {
  return `Wrapped${moduleName}`;
}
