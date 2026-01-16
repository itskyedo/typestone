import {
  type ErrorMap,
  type ErrorMapHandlerFunction,
} from '../../error/error.ts';
import { type IssueCode, type IssueWithCode } from '../../error/issues.ts';
import { NEVER } from '../constants/constants.ts';

export function* processIssue<const TCodes extends IssueCode>(
  errorMap: ErrorMap<TCodes>,
  issue: IssueWithCode<TCodes>,
): Generator<IssueWithCode<TCodes>, never> {
  const handler =
    typeof errorMap.error === 'undefined'
      ? errorMap[issue.code]
      : errorMap.error;

  if (typeof handler === 'string') {
    yield {
      ...issue,
      message: handler,
    };
  } else if (typeof handler === 'function') {
    yield (handler as ErrorMapHandlerFunction<TCodes>)(issue);
  } else {
    yield issue;
  }

  return NEVER;
}
