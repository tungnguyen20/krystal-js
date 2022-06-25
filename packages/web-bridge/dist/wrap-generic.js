"use strict";
/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapGenericModule = void 0;
const simplify_callback_1 = require("./simplify-callback");
const utils_1 = require("./utils");
/**
 * Wrap a generic module. This should work for both Android and iOS-injected
 * Javascript interfaces.
 * @param global The global object - generally window.
 * @param moduleName The name of the module that owns the method.
 * @param moduleMethodFunc Function to execute the related module method.
 * @return The wrapped module.
 */
function wrapGenericModule(global, moduleName, moduleMethodFunc) {
    return {
        invoke: (method, params) => {
            return (0, simplify_callback_1.simplifyCallback)(global, {
                funcNameToWrap: method,
                callbackNameFunc: () => (0, utils_1.getFirstAvailableCallbackName)(global, {
                    moduleName,
                    funcName: method,
                }),
                funcToWrap: callback => moduleMethodFunc({
                    subscriberId: callback,
                    method,
                    module: moduleName,
                    parameters: params !== undefined && params !== null ? params : {},
                }),
            });
        },
    };
}
exports.wrapGenericModule = wrapGenericModule;
