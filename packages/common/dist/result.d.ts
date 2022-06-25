import { DataStream, Response } from './types';
export declare class Result<T> {
    success: boolean;
    value?: T;
    error?: Error;
    constructor(isSuccess: boolean, error?: Error, value?: T);
    isSuccess(): boolean;
    isFailure(): boolean;
    getValue(): T;
    getError(): Error;
}
export declare class Success<T> extends Result<T> {
    constructor(value?: T);
}
export declare class Failure extends Result<never> {
    constructor(error: Error);
}
export declare function success<U>(value?: U): Success<U>;
export declare function failure(error: Error): Failure;
export declare function mapResponseToResult<T>(response: Response<T>): Result<T>;
export declare function toResult<T>(block: () => DataStream<T>): Promise<Result<T>>;
