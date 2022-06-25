import { DataStream, Response } from './types';

export class Result<T> {
  success: boolean;
  value?: T;
  error?: Error;

  constructor(isSuccess: boolean, error?: Error, value?: T) {
    this.success = isSuccess;
    this.value = value;
    this.error = error;
  }

  isSuccess(): boolean {
    return this.success;
  }

  isFailure(): boolean {
    return !this.success;
  }

  getValue(): T {
    return this.value;
  }

  getError(): Error {
    return this.error;
  }
}

export class Success<T> extends Result<T> {
  constructor(value?: T) {
    super(true, null, value);
  }
}

export class Failure extends Result<never> {
  constructor(error: Error) {
    super(false, error);
  }
}

export function success<U>(value?: U): Success<U> {
  return new Success<U>(value);
}

export function failure(error: Error): Failure {
  return new Failure(error);
}

export function mapResponseToResult<T>(response: Response<T>): Result<T> {
  if (response.status_code === 200) {
    return new Success(response.result);
  } else {
    return new Failure(new Error(response.error));
  }
}

export function toResult<T>(block: () => DataStream<T>): Promise<Result<T>> {
  return new Promise((resolve) => {
    block().then((response) => {
      if (response.status_code === 200) {
        resolve(new Success(response.result));
      } else {
        resolve(new Failure(new Error(response.error)));
      }
    });
  });
}
