import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck, type DefineCheck } from '../check/check.ts';
import { type UrlDef, urlDef, type UrlErrorMap } from './def.ts';
import { type UrlOptions } from './types.ts';

export interface UrlCheck extends DefineCheck<UrlDef> {
  kind: 'check';
}

export function url(
  options?: UrlOptions,
  error?: ErrorHandlerParameter<UrlErrorMap>,
): UrlCheck {
  return createCheck(urlDef(options ?? {}, error ?? {}));
}
