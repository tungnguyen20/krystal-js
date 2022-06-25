"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Krystal = void 0;
class Krystal {
    constructor() {
    }
    isAvailable() {
        // @ts-ignore
        return (global['checkIsKrystalAvailable'] && global['checkIsKrystalAvailable']()) || false;
    }
}
exports.Krystal = Krystal;
