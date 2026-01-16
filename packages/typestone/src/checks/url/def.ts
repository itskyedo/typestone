import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type CheckDef } from '../check/check.ts';
import { type UrlOptions } from './types.ts';
import { type UrlCheck } from './url.ts';
import { parseUrl } from './utils.ts';

export type UrlErrorMap = ErrorMap<'invalid_format'>;

export interface UrlDef extends CheckDef<string, string, UrlErrorMap> {
  readonly type: 'url';

  readonly protocol: RegExp | null;
  readonly hostname: RegExp | null;
}

export function urlDef(
  options: UrlOptions,
  error: ErrorHandlerParameter<UrlErrorMap>,
): UrlDef {
  return {
    kind: 'check',
    type: 'url',
    errorMap: errorParamToErrorMap(error),

    protocol: options.protocol ?? null,
    hostname: options.hostname ?? null,

    _process,
  };
}

const _process: UrlCheck['_process'] = function* (context) {
  const url = parseUrl(context.value);
  if (!url) {
    yield* processIssue(this.errorMap, {
      code: 'invalid_format',
      format: 'url',
      path: context.path,
      input: context.value,
      message: 'Invalid url format.',
    });
    return;
  }

  if (this.protocol) {
    const protocol = url.protocol.slice(0, -1);
    if (!this.protocol.test(protocol)) {
      yield* processIssue(this.errorMap, {
        code: 'invalid_format',
        format: 'custom',
        path: context.path,
        input: protocol,
        message: 'Invalid url protocol.',
      });
    }
  }

  if (this.hostname) {
    const hostname = url.hostname;
    if (!this.hostname.test(hostname)) {
      yield* processIssue(this.errorMap, {
        code: 'invalid_format',
        format: 'custom',
        path: context.path,
        input: hostname,
        message: 'Invalid url hostname.',
      });
    }
  }
};
