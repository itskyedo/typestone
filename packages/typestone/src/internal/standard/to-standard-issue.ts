import { type Issue } from '../../error/issues.ts';
import { type StandardIssue } from './types.ts';

export function toStandardIssue(issue: Issue): StandardIssue {
  return {
    message: issue.message,
    path: issue.path,
  };
}
