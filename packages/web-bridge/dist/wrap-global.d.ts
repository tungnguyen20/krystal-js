/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Get the module's mobile environment.
 * @param global The global object - generally window.
 * @param moduleName The name of the module being wrapped.
 */
export declare function getModuleEnvironment(global: any, moduleName: string): 'android' | 'ios' | undefined;
/**
 * Wrap the appropriate module based on whether or not it's Android/iOS.
 * @param global The global object - generally window.
 * @param moduleName The name of the module being wrapped.
 */
export declare function wrapModule(global: any, moduleName: string): void;
