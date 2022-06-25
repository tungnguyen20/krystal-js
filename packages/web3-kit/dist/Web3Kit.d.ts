import { TransferRequest, TransferResponse } from './requests/TransferRequest';
export declare class Web3Kit {
    private wrappedModule;
    constructor();
    transfer(request: TransferRequest): Promise<TransferResponse>;
}
