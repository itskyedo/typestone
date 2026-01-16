export type GuardedConditionFunction<TInput, TOutput extends TInput> = (
  value: TInput,
) => value is TOutput;

export type UnguardedConditionFunction<TInput> = (value: TInput) => boolean;

export type ConditionFunction<TInput, TOutput extends TInput> =
  | UnguardedConditionFunction<TInput>
  | GuardedConditionFunction<TInput, TOutput>;
