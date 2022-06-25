"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.krystal = exports.aaaa = exports.wrapModule = exports.getModuleEnvironment = exports.createSubscription = exports.createDataStream = exports.StreamEvent = void 0;
/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// TODO: Maybe, we do not need to export them.
var simplify_callback_1 = require("./simplify-callback");
Object.defineProperty(exports, "StreamEvent", { enumerable: true, get: function () { return simplify_callback_1.StreamEvent; } });
var subscription_1 = require("./subscription");
Object.defineProperty(exports, "createDataStream", { enumerable: true, get: function () { return subscription_1.createDataStream; } });
Object.defineProperty(exports, "createSubscription", { enumerable: true, get: function () { return subscription_1.createSubscription; } });
var wrap_global_1 = require("./wrap-global");
Object.defineProperty(exports, "getModuleEnvironment", { enumerable: true, get: function () { return wrap_global_1.getModuleEnvironment; } });
Object.defineProperty(exports, "wrapModule", { enumerable: true, get: function () { return wrap_global_1.wrapModule; } });
exports.aaaa = '11116';
const utils_1 = require("./utils");
const wrap_global_2 = require("./wrap-global");
function setWrapModuleToGlobal() {
    // @ts-ignore
    global['wrapModule'] = wrap_global_2.wrapModule;
    // @ts-ignore
    global['checkIsKrystalAvailable'] = utils_1.checkIsKrystalAvailable;
}
setWrapModuleToGlobal();
const krystal_1 = require("./krystal");
exports.krystal = new krystal_1.Krystal();
