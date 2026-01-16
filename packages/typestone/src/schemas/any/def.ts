import { type ErrorMap } from '../../error/error.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { type SchemaDef } from '../schema/schema.ts';
import { type AnySchema } from './any.ts';

export type AnyErrorMap = ErrorMap<never>;

export interface AnyDef extends SchemaDef<any, any, AnyErrorMap> {
  readonly type: 'any';
}

export function anyDef(): AnyDef {
  return {
    kind: 'schema',
    type: 'any',
    checks: [],
    errorMap: {},

    _process,
  };
}

const _process: AnySchema['_process'] = function* (context) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return yield* processChecks(this, context);
};
