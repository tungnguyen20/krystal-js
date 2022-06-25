"use strict";
/**
 * Copyright (c) Grab Taxi Holdings PTE LTD (GRAB)
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsKrystalAvailableIOS = exports.checkIsKrystalAvailableAndroid = exports.checkIsKrystalAvailable = exports.parseJson = exports.wrapModuleName = exports.isType = exports.getFirstAvailableCallbackName = exports.getCallbackName = exports.getObjectKeys = void 0;
/**
 * Get the keys of an object.
 * @param object Some object.
 * @return Array of object keys.
 */
function getObjectKeys(object) {
    return [...Object.keys(object), ...Object.getOwnPropertyNames(Object.getPrototypeOf(object))];
}
exports.getObjectKeys = getObjectKeys;
/**
 * Get the callback name that will be used to access global callback.
 * @param param0 The required parameters.
 * @return The combined callback name.
 */
function getCallbackName({ moduleName, funcName, requestID: req, }) {
    return `${moduleName}_${funcName}Callback${req !== null ? `_${req}` : ''}`;
}
exports.getCallbackName = getCallbackName;
/**
 * Instead of keeping state, find the first available callback name by
 * iterating through all callback names in the global object and pick the next
 * one.
 */
function getFirstAvailableCallbackName(global, { moduleName, funcName }) {
    let nextAvailableRequestID = 0;
    return (() => {
        let callbackName = '';
        while ((callbackName = getCallbackName({
            moduleName,
            funcName,
            requestID: nextAvailableRequestID,
        })) in global) {
            nextAvailableRequestID += 1;
        }
        nextAvailableRequestID += 1;
        return callbackName;
    })();
}
exports.getFirstAvailableCallbackName = getFirstAvailableCallbackName;
/**
 * Check if an object is of a certain type.
 * @param object Some object.
 * @return Whether the object is of this type.
 */
function isType(object, ...keys) {
    if (!object)
        return false;
    const objectKeys = getObjectKeys(object);
    return keys.every((key) => objectKeys.indexOf(key) >= 0);
}
exports.isType = isType;
/**
 * Wrap a module name to mark it as wrapped.
 * @param moduleName The original module name.
 * @return The wrapped module name.
 */
function wrapModuleName(moduleName) {
    return `Wrapped${moduleName}`;
}
exports.wrapModuleName = wrapModuleName;
function parseJson(json) {
    if (typeof json != 'string') {
        return json;
    }
    try {
        return JSON.parse(json);
    }
    catch (error) {
        return json;
    }
}
exports.parseJson = parseJson;
function checkIsKrystalAvailable() {
    return checkIsKrystalAvailableAndroid() || checkIsKrystalAvailableIOS();
}
exports.checkIsKrystalAvailable = checkIsKrystalAvailable;
function checkIsKrystalAvailableAndroid() {
    // @ts-ignore
    return !!global['KrystalWebModule'];
}
exports.checkIsKrystalAvailableAndroid = checkIsKrystalAvailableAndroid;
function checkIsKrystalAvailableIOS() {
    // @ts-ignore
    return !!global.webkit && !!global.webkit.messageHandlers && !!global.webkit.messageHandlers['KrystalWebModule'];
}
exports.checkIsKrystalAvailableIOS = checkIsKrystalAvailableIOS;
