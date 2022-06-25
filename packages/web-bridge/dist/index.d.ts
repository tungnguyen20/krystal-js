/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export { StreamEvent } from './simplify-callback';
export { createDataStream, createSubscription } from './subscription';
export { getModuleEnvironment, wrapModule } from './wrap-global';
export declare var aaaa: string;
export type { StreamEventResult } from './simplify-callback';
export type { DataStream, DataStreamHandlers, Subscription } from './subscription';
export type { CallbackResult, NativeParameter } from './utils';
import { Krystal } from './krystal';
export declare const krystal: Krystal;
