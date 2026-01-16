import { type Issue } from '../../error/issues.ts';
import { type Context, type ProcessResult } from './types.ts';

export function* processContext(
  context: Context,
): Generator<Issue, ProcessResult<true>, any> {
  if (!context.issues.length) {
    return {
      success: true,
      data: true,
    };
  }

  for (const issue of context.issues) {
    yield issue;
    if (issue.abort) {
      return {
        success: false,
        abort: true,
      };
    }
  }

  return {
    success: false,
  };
}
