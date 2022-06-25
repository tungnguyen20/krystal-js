export type Response<T> = {
  /** The status code. */
  status_code: number;

  /** The result of the operation. */
  result?: T;

  /** The error's message, if any. */
  error?: string;
};

export type DataStreamHandler<T> = Readonly<{
  next?: (data: Response<T>) => void;
  complete?: () => void;
}>;

export type Subscription = Readonly<{
  unsubscribe: () => void;
}>;

export type ResponsePromise<T> = PromiseLike<Response<T>>;

export type DataStream<T> = Readonly<{
  subscribe: (handlers?: DataStreamHandler<T>) => Subscription;
}> &
  ResponsePromise<T>;
