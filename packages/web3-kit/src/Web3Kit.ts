import { ModuleWrapper } from '@krystal-js/common';
import { Response } from '@krystal-js/common';
import { TransferRequest, TransferResponse } from './requests/TransferRequest';

export class Web3Kit {

    private wrappedModule: ModuleWrapper;

    constructor() {
        this.wrappedModule = new ModuleWrapper('Web3Module');
    }

    transfer(request: TransferRequest): Promise<TransferResponse> {
        return new Promise((resolve) => {
            this.wrappedModule.invoke('transfer', request).then((res) => {
                var response = res as Response<TransferResponse>
                try {
                    if (response.status_code == 200) {
                        resolve({
                            code: response.status_code,
                            message: response.error
                        })
                    } else {
                        resolve({
                            code: response.status_code,
                            message: response.error
                        })
                    }
                } catch (error) {
                    resolve({
                        code: 400,
                        message: 'something_wrong'
                    });
                }
            })
        });
    }

}