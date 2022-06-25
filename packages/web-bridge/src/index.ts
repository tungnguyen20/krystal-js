/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// TODO: Maybe, we do not need to export them.
export { StreamEvent } from './simplify-callback';
export { createDataStream, createSubscription } from './subscription';
export { getModuleEnvironment, wrapModule } from './wrap-global';
export var aaaa = '11116';

// eslint-disable-next-line
export type { StreamEventResult } from './simplify-callback';

export type { DataStream, DataStreamHandlers, Subscription } from './subscription';
export type { CallbackResult, NativeParameter } from './utils';

import { checkIsKrystalAvailable } from './utils';
import { wrapModule } from './wrap-global';

function setWrapModuleToGlobal() {
  // @ts-ignore
  global['wrapModule'] = wrapModule;
  // @ts-ignore
  global['checkIsKrystalAvailable'] = checkIsKrystalAvailable;
}

setWrapModuleToGlobal();

import { Krystal } from './krystal';

export const krystal = new Krystal();