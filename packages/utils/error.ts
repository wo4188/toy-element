import { isString } from "lodash-es";

class ToyViewError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ToyViewError";
  }
}

export function throwError(scope: string, msg: string) {
  throw new ToyViewError(`[${scope}] ${msg}`);
}

export function echoWarn(err: Error): void;
export function echoWarn(scope: string, msg: string): void;
export function echoWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV === "production") return;

  const info = isString(scope) //
    ? new ToyViewError(`[${scope}] ${msg}`)
    : scope;
  console.warn(info);
}
