export interface TransferRequest {
    amount: number;
    toAddress: string;
}

export interface TransferResponse {
    code?: number;
    message?: string;
}