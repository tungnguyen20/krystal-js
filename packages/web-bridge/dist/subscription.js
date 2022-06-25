"use strict";
/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataStream = exports.createSubscription = void 0;
/**
 * Create a subscription that can only be unsubscribed from once.
 * @param unsubscribe Unsubscription logic.
 */
function createSubscription(unsubscribe) {
    let unsubscribed = false;
    return {
        isUnsubscribed: () => unsubscribed,
        unsubscribe: () => {
            if (!unsubscribed) {
                unsubscribe();
                unsubscribed = true;
            }
        },
    };
}
exports.createSubscription = createSubscription;
/**
 * Create a data stream with default functionalities. When we implement
 * Promise functionalities, beware that if then block is executed immediately
 * (i.e. a resolved promise), the subscription object may not be created yet.
 *
 * The call to subscribe may throw an error which we need to catch, due to the
 * asynchronous nature of Promises. This error will then be passed to the
 * reject call.
 * @param subscribe Injected subscribe function.
 * @return A DataStream instance.
 */
function createDataStream(subscribe) {
    return {
        subscribe,
        then: (onFulfilled, onRejected) => {
            return new Promise((resolve, reject) => {
                try {
                    let subscription = null;
                    let didFinish = false;
                    subscription = subscribe({
                        next: (data) => {
                            if (onFulfilled == null) {
                                // @ts-ignore
                                resolve(undefined);
                            }
                            else {
                                resolve(onFulfilled(data));
                            }
                            !!subscription && subscription.unsubscribe();
                            didFinish = true;
                        },
                    });
                    if (didFinish)
                        !!subscription && subscription.unsubscribe();
                }
                catch (e) {
                    if (onRejected == null) {
                        reject(e);
                    }
                    else {
                        resolve(onRejected(e));
                    }
                }
            });
        },
    };
}
exports.createDataStream = createDataStream;
