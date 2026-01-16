import {
  type GuardedConditionFunction,
  type UnguardedConditionFunction,
} from '../../checks/condition/types.ts';

export type CustomFunction<TType> =
  | GuardedConditionFunction<unknown, TType>
  | UnguardedConditionFunction<unknown>;
