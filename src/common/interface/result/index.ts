interface Fail<ERROR> {
  error: ERROR;
  data?: never;
}

interface Success<RESPONSE> {
  error?: never;
  data: RESPONSE;
}

export type Result<RESPONSE, ERROR> = NonNullable<Success<RESPONSE> | Fail<ERROR>>;

export const isFail = <RESPONSE, ERROR>(result: Result<RESPONSE, ERROR>): result is Fail<ERROR> => result.error !== undefined;

export const createFail = <RESPONSE>(value: RESPONSE): Fail<RESPONSE> => ({ error: value });

export const createSuccess = <ERROR>(value: ERROR): Success<ERROR> => ({ data: value });
