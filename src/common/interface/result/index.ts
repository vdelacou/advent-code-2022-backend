interface Fail<ERROR> {
  fail: ERROR;
  success?: never;
}

interface Success<RESPONSE> {
  fail?: never;
  success: RESPONSE;
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

export const isFail = <RESPONSE, ERROR>(error: Result<RESPONSE, ERROR>): error is Fail<ERROR> => error.fail !== undefined;

// export const isSuccess = <RESPONSE, ERROR>(result: Result<RESPONSE, ERROR>): result is Success<RESPONSE> => result.success !== undefined;

export const makeFail = <RESPONSE>(value: RESPONSE): Fail<RESPONSE> => ({ fail: value });

export const makeSuccess = <ERROR>(value: ERROR): Success<ERROR> => ({ success: value });
