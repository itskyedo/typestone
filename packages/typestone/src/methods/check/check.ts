import { type Check } from '../../checks/check/check.ts';
import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type Schema } from '../../schemas/schema/schema.ts';
import { type Refine } from './types.ts';

export type CheckMethod = <
  const TSchema extends Schema,
  const TCheck extends Check,
>(
  this: TSchema,
  check: RawOutput<TSchema> extends RawInput<TCheck>
    ? TCheck
    : Check<RawOutput<TSchema>, RawOutput<TCheck>>,
) => RawOutput<TSchema> extends RawOutput<TCheck>
  ? TSchema
  : Refine<TSchema, RawOutput<TCheck>>;

export const check: CheckMethod = function (check) {
  return {
    ...this,
    checks: [...this.checks, check],
  };
};
