import { type ErrorMap } from '../../error/error.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { type SchemaDef } from '../schema/schema.ts';
import { type UnknownSchema } from './unknown.ts';

export type UnknownErrorMap = ErrorMap<never>;

export interface UnknownDef extends SchemaDef<
  unknown,
  unknown,
  UnknownErrorMap
> {
  readonly type: 'unknown';
}

export function unknownDef(): UnknownDef {
  return {
    kind: 'schema',
    type: 'unknown',
    checks: [],
    errorMap: {},

    _process,
  };
}

const _process: UnknownSchema['_process'] = function* (context) {
  return yield* processChecks(this, context);
};
