"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapModuleName = exports.wrapModule = void 0;
function wrapModule(global, moduleName) {
    var globalWrapModule = global['wrapModule'];
    if (globalWrapModule != null) {
        return globalWrapModule(global, moduleName);
    }
    else {
        if (typeof document !== 'undefined') {
            throw Error('Please install @krystal-js/web-bridge before using any feature of krystal-js');
        }
        else if (navigator && navigator.product === 'ReactNative') {
            throw Error('Please install @krystal-js/react-native-bridge before using any feature of krystal-js');
        }
        else {
            throw new Error('Unsupported environment');
        }
    }
}
exports.wrapModule = wrapModule;
function wrapModuleName(moduleName) {
    return "Wrapped".concat(moduleName);
}
exports.wrapModuleName = wrapModuleName;
