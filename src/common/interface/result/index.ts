interface Fail<ERROR> {
  error: ERROR;
  data?: never;
}

interface Success<RESPONSE> {
  error?: never;
  data: RESPONSE;
}

// interface UnwrapResult { <RESPONSE, ERROR>(result: Result<RESPONSE, ERROR>): NonNullable<RESPONSE | ERROR>; }

export type Result<RESPONSE, ERROR> = NonNullable<Success<RESPONSE> | Fail<ERROR>>;

// export const unwrapResult: UnwrapResult = <RESPONSE, ERROR>({ success, fail }: Result<RESPONSE, ERROR>) => {
//   if (success !== undefined && fail !== undefined) {
//     throw new Error(`Received both fail and success values at runtime \n Fail: ${JSON.stringify(fail)} \n Success: ${JSON.stringify(success)}`);
//   }
//   if (fail !== undefined) {
//     return fail as NonNullable<ERROR>;
//   }
//   if (success !== undefined) {
//     return success as NonNullable<RESPONSE>;
//   }
//   throw new Error('Received no fail or success values at runtime');
// };

export const isFail = <RESPONSE, ERROR>(result: Result<RESPONSE, ERROR>): result is Fail<ERROR> => result.error !== undefined;

// export const isSuccess = <RESPONSE, ERROR>(result: Result<RESPONSE, ERROR>): result is Success<RESPONSE> => result.success !== undefined;

export const createFail = <RESPONSE>(value: RESPONSE): Fail<RESPONSE> => ({ error: value });

export const createSuccess = <ERROR>(value: ERROR): Success<ERROR> => ({ data: value });
