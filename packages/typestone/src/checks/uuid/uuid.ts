import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck } from '../check/check.ts';
import { regexDef, type RegexErrorMap } from '../regex/def.ts';
import { type RegexCheck } from '../regex/regex.ts';

export type UuidErrorMap = RegexErrorMap;

export interface UuidCheck extends Omit<
  RegexCheck<`${string}-${string}-${string}-${string}`>,
  'type'
> {
  kind: 'check';
  type: 'uuid';
}

export function uuid(error?: ErrorHandlerParameter<UuidErrorMap>): UuidCheck {
  return createCheck({
    ...regexDef<`${string}-${string}-${string}-${string}`>(
      uuidRegex,
      error ?? {},
    ),
    type: 'uuid',
  });
}

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
