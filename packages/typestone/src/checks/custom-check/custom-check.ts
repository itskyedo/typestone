import { createCheck, type DefineCheck } from '../check/check.ts';
import { type CustomCheckDef, customCheckDef } from './def.ts';
import { type CustomCheckFunction } from './types.ts';

export interface CustomCheck<
  TInput = unknown,
  TOutput extends TInput = TInput,
> extends DefineCheck<CustomCheckDef<TInput, TOutput>> {
  kind: 'check';
}

export function customCheck<
  const TInput,
  const TOutput extends TInput = TInput,
>(fn: CustomCheckFunction<TInput>): CustomCheck<TInput, TOutput> {
  return createCheck(customCheckDef(fn));
}
