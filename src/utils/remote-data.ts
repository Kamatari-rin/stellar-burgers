type NotAsked = {
  type: 'notAsked';
};

type Waiting = {
  type: 'waiting';
};

type Rejected = {
  type: 'rejected';
  error: string;
};

type Fulfilled<T> = {
  type: 'fulfilled';
  value: T;
};

export type RemoteData<T> = NotAsked | Waiting | Rejected | Fulfilled<T>;

export const notAsked = <T>(): RemoteData<T> => ({ type: 'notAsked' });

export const isNotAsked = <T>(value: RemoteData<T>): value is NotAsked =>
  value.type === 'notAsked';

export const waiting = <T>(): RemoteData<T> => ({ type: 'waiting' });

export const isWaiting = <T>(value: RemoteData<T>): value is Waiting =>
  value.type === 'waiting';

export const rejected = <T>(error: string): RemoteData<T> => ({
  type: 'rejected',
  error
});

export const isRejected = <T>(value: RemoteData<T>): value is Rejected =>
  value.type === 'rejected';

export const fulfilled = <T>(value: T): Fulfilled<T> => ({
  type: 'fulfilled',
  value
});

export const isFulfilled = <T>(value: RemoteData<T>): value is Fulfilled<T> =>
  value.type === 'fulfilled';

export const getValue = <T>(x: Fulfilled<T>): T => x.value;

export const getWithDefault = <T>(x: RemoteData<T>, defaultValue: T): T =>
  isFulfilled(x) ? x.value : defaultValue;

export const getRejected = (x: Rejected): string => x.error;

export const getRejectedWithDefault = <T>(
  x: RemoteData<T>,
  defaultError: string | null | undefined
): string | null | undefined => (isRejected(x) ? x.error : defaultError);

export const remoteData = {
  notAsked,
  isNotAsked,
  waiting,
  isWaiting,
  rejected,
  isRejected,
  fulfilled,
  isFulfilled,
  getValue,
  getWithDefault,
  getRejected,
  getRejectedWithDefault
};
