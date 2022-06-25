import { DataStream, DataStreamHandler, Subscription } from './types';
import { wrapModule, wrapModuleName, WrappedModule } from './wrap-global';

const UNDERLYING_MODULE_NAME = 'underlyingModule';
const WRAPPRED_UNDERLYING_MODULE_NAME = wrapModuleName('underlyingModule');

export class ModuleWrapper {
  private moduleName = '';
  private wrappedModuleName = '';

  constructor(moduleName: string) {
    this.moduleName = moduleName;
    this.wrappedModuleName = wrapModuleName(moduleName);
  }

  private getWrappedModule(): WrappedModule {
    if (!window[this.wrappedModuleName]) {
      wrapModule(window, this.moduleName);
    }

    return window[this.wrappedModuleName];
  }

  invoke<T>(methodName: string, params = {}): DataStream<T> {
    return {
      subscribe: ({ next, complete }: DataStreamHandler<T>) => {
        let subscription: Subscription = null;

        this.checkHasModule().then((hasModule) => {
          if (hasModule) {
            subscription = this.getWrappedModule().invoke<T>(methodName, params).subscribe({
              next: next,
              complete: complete,
            });
          }
        });
        return {
          unsubscribe: () => {
            subscription?.unsubscribe();
          },
        };
      },
      // @ts-ignore
      then: (onFulfilled) => {
        this.checkHasModule().then((hasModule) => {
          this.getWrappedModule().invoke<T>(methodName, params).then(onFulfilled);
        });
      },
    };
  }

  private async checkHasModule(): Promise<boolean> {
    const response = await this.getUnderlyingModule().invoke<boolean>('hasModule', { moduleName: this.moduleName });

    return response.status_code == 200 && response.result == true;
  }

  private getUnderlyingModule(): WrappedModule {
    if (!window[WRAPPRED_UNDERLYING_MODULE_NAME]) {
      wrapModule(window, UNDERLYING_MODULE_NAME);
    }

    return window[WRAPPRED_UNDERLYING_MODULE_NAME];
  }
}
