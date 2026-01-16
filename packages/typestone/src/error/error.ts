import { type IssueCode, type IssueWithCode } from './issues.ts';

export type ErrorMap<TCodes extends IssueCode = any> = Partial<
  {
    [Code in TCodes]: ErrorMapHandler<Code>;
  } & {
    error: ErrorMapHandler<TCodes>;
  }
>;

export type ErrorMapHandler<TCodes extends IssueCode> =
  | string
  | ErrorMapHandlerFunction<TCodes>
  | undefined;

export type ErrorMapHandlerFunction<TCodes extends IssueCode> = (
  issue: IssueWithCode<TCodes>,
) => IssueWithCode<TCodes>;

export type ErrorHandlerParameter<TErrorMap extends ErrorMap> =
  | TErrorMap
  | string;

export function errorParamToErrorMap<TCode extends IssueCode>(
  param: ErrorHandlerParameter<ErrorMap<TCode>>,
): ErrorMap<TCode> {
  if (typeof param === 'string') {
    return {
      error: param,
    } satisfies ErrorMap<any> as ErrorMap<TCode>;
  } else if (param && typeof param === 'object') {
    return param;
  } else {
    return {};
  }
}
