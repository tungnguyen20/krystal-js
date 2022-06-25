/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { wrapModuleName } from './utils';
import { wrapGenericModule } from './wrap-generic';

/**
 * Get the module's mobile environment.
 * @param global The global object - generally window.
 * @param moduleName The name of the module being wrapped.
 */
export function getModuleEnvironment(global: any, moduleName: string): 'android' | 'ios' | undefined {
  if (!!global[moduleName]) {
    return 'android';
  } else if (!!global.webkit && !!global.webkit.messageHandlers && !!global.webkit.messageHandlers[moduleName]) {
    return 'ios';
  }

  return undefined;
}

/**
 * Wrap the appropriate module based on whether or not it's Android/iOS.
 * @param global The global object - generally window.
 * @param moduleName The name of the module being wrapped.
 */
export function wrapModule(global: any, moduleName: string) {
  global[wrapModuleName(moduleName)] = wrapGenericModule(global, moduleName, (params) => {
    if (!!global['KrystalWebModule']) {
      //this case for android
      global['KrystalWebModule'].invoke(moduleName, params.method, params.subscriberId, JSON.stringify(params));
    } else if (
      !!global.webkit &&
      !!global.webkit.messageHandlers &&
      !!global.webkit.messageHandlers['KrystalWebModule']
    ) {
      //this case for ios
      global.webkit.messageHandlers['KrystalWebModule'].postMessage({
        moduleName: moduleName,
        methodName: params.method,
        subscriberId: params.subscriberId,
        requestString: JSON.stringify(params),
      });
    } else {
      throw new Error(`Unexpected method '${params.method}' for module '${moduleName}'`);
    }
  });
}
