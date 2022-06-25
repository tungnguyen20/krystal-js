/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { simplifyCallback } from './simplify-callback';
import { getFirstAvailableCallbackName, NativeParameter } from './utils';

/** Represents a wrapped generic module. */
type WrappedModule = Readonly<{
  invoke: (
    method: string,
    params: Readonly<{ [K: string]: unknown }> | undefined | null
  ) => unknown;
}>;

/**
 * Wrap a generic module. This should work for both Android and iOS-injected
 * Javascript interfaces.
 * @param global The global object - generally window.
 * @param moduleName The name of the module that owns the method.
 * @param moduleMethodFunc Function to execute the related module method.
 * @return The wrapped module.
 */
export function wrapGenericModule(
  global: any,
  moduleName: string,
  moduleMethodFunc: (params: NativeParameter) => unknown
): WrappedModule {
  return {
    invoke: (method, params) => {
      return simplifyCallback(global, {
        funcNameToWrap: method,
        callbackNameFunc: () =>
          getFirstAvailableCallbackName(global, {
            moduleName,
            funcName: method,
          }),
        funcToWrap: callback =>
          moduleMethodFunc({
            subscriberId: callback,
            method,
            module: moduleName,
            parameters: params !== undefined && params !== null ? params : {},
          }),
      });
    },
  };
}
