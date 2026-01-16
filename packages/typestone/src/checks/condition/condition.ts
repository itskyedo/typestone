import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck, type DefineCheck } from '../check/check.ts';
import {
  conditionDef,
  type ConditionDef,
  type ConditionErrorMap,
} from './def.ts';
import { type ConditionFunction } from './types.ts';

export interface ConditionCheck<
  TInput = unknown,
  TOutput extends TInput = TInput,
> extends DefineCheck<ConditionDef<TInput, TOutput>> {
  kind: 'check';
}

export function condition<const TInput, const TOutput extends TInput = TInput>(
  fn: ConditionFunction<TInput, TOutput>,
  error?: ErrorHandlerParameter<ConditionErrorMap>,
): ConditionCheck<TInput, TOutput> {
  return createCheck(conditionDef(fn, error ?? {}));
}
