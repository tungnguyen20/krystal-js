"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Kit = void 0;
const common_1 = require("@krystal-js/common");
class Web3Kit {
    constructor() {
        this.wrappedModule = new common_1.ModuleWrapper('Web3Module');
    }
    transfer(request) {
        return new Promise((resolve) => {
            this.wrappedModule.invoke('transfer', request).then((res) => {
                var response = res;
                try {
                    if (response.status_code == 200) {
                        resolve({
                            code: response.status_code,
                            message: response.error
                        });
                    }
                    else {
                        resolve({
                            code: response.status_code,
                            message: response.error
                        });
                    }
                }
                catch (error) {
                    resolve({
                        code: 400,
                        message: 'something_wrong'
                    });
                }
            });
        });
    }
}
exports.Web3Kit = Web3Kit;
