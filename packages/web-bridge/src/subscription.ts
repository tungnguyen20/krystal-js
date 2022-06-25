/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CallbackResult } from './utils';

/** Represents an object that can be unsubscribed from to termindate a stream. */
export type Subscription = Readonly<{
  isUnsubscribed: () => boolean;
  unsubscribe: () => unknown;
}>;

/** Represents functions that can handle stream events. */
export type DataStreamHandlers<T> = Readonly<{
  next?: (data: CallbackResult<T>) => unknown;
  complete?: () => unknown;
}>;

/**
 * Represents a Stream that can deliver some data continually. It can also be
 * used like a Promise - in which case it simply delivers the first value that
 * arrives and then terminates itself.
 *
 * Note that this stream currently does not support error notifications like
 * an Observable would. All errors will be included in the data payload, so as
 * to simplify workflow for end-users.
 * @template T The emission value type.
 */
export type DataStream<T> = Readonly<{
  subscribe: (handlers?: DataStreamHandlers<T>) => Subscription;
}> &
  PromiseLike<CallbackResult<T>>;

/**
 * Create a subscription that can only be unsubscribed from once.
 * @param unsubscribe Unsubscription logic.
 */
export function createSubscription(unsubscribe: () => unknown): Subscription {
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
export function createDataStream<T>(subscribe: DataStream<T>['subscribe']): DataStream<T> {
  return {
    subscribe,
    then: (onFulfilled, onRejected) => {
      return new Promise((resolve, reject) => {
        try {
          let subscription: Subscription | null = null;
          let didFinish = false;

          subscription = subscribe({
            next: (data) => {
              if (onFulfilled == null) {
                // @ts-ignore
                resolve(undefined);
              } else {
                resolve(onFulfilled(data));
              }

              !!subscription && subscription.unsubscribe();
              didFinish = true;
            },
          });

          if (didFinish) !!subscription && subscription.unsubscribe();
        } catch (e) {
          if (onRejected == null) {
            reject(e);
          } else {
            resolve(onRejected(e));
          }
        }
      });
    },
  };
}
