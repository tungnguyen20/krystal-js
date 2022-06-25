"use strict";
/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplifyCallback = exports.StreamEvent = void 0;
const subscription_1 = require("./subscription");
const utils_1 = require("./utils");
/**
 * Represents stream events that be used to communicate state of the stream
 * from native to web.
 */
var StreamEvent;
(function (StreamEvent) {
    StreamEvent["STREAM_TERMINATED"] = "STREAM_TERMINATED";
})(StreamEvent = exports.StreamEvent || (exports.StreamEvent = {}));
/**
 * Convert the callback to a stream to receive continual values.
 * @template T The emission value type.
 * @param global The global object - generally window.
 * @param param1 Parameters for stream creation.
 * @return A stream that can be subscribed to.
 */
function streamCallback(global, { callbackNameFunc, funcToWrap }) {
    return (0, subscription_1.createDataStream)((handlers) => {
        /** Generate callback name dynamically to make this stream idempotent. */
        const callbackName = callbackNameFunc();
        let subscription;
        global[callbackName] = (data) => {
            const result = (0, utils_1.parseJson)(data.result);
            if ((0, utils_1.isType)(result, 'event')) {
                switch (result.event) {
                    case StreamEvent.STREAM_TERMINATED:
                        subscription.unsubscribe();
                        break;
                }
            }
            else {
                const { result, error, status_code } = data;
                !!handlers &&
                    !!handlers.next &&
                    handlers.next({
                        result: result === null ? undefined : (0, utils_1.parseJson)(result),
                        error: error === null ? undefined : error,
                        status_code: status_code === null ? undefined : status_code,
                    });
            }
        };
        /**
         * Beware that this function may throw a non-recoverable error, such
         * as module not available. In that case, we should let this call fail
         * and ensure the error is caught downstream.
         */
        funcToWrap(callbackName);
        subscription = (0, subscription_1.createSubscription)(() => {
            /**
             * Native should check for the existence of this callback every time a
             * value is bound to be delivered. If no such callback exists, it may
             * be assumed that the web client has unsubscribed from this stream, and
             * therefore the stream may be terminated on the mobile side.
             */
            global[callbackName] = undefined;
            !!handlers && !!handlers.complete && handlers.complete();
        });
        return subscription;
    });
}
/**
 * Handle the simplication of callbacks for both single asynchronous return
 * values and streams.
 * @param global The global object - generally window.
 * @param param1 Parameters for callback simplification.
 * @return Check the return types for private functions in this module.
 */
function simplifyCallback(global, _a) {
    var { funcNameToWrap } = _a, restParams = __rest(_a, ["funcNameToWrap"]);
    return streamCallback(global, restParams);
}
exports.simplifyCallback = simplifyCallback;
