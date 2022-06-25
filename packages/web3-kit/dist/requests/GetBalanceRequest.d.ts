export interface GetBalanceRequest {
    address: string;
}
export interface GetBalanceResponse {
    resultCode?: number;
    error?: String;
    data?: BalanceData;
}
export interface BalanceData {
    amount: number;
}
