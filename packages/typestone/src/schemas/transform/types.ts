import { type Context } from '../../internal/process/types.ts';

export type TransformFunction<TInput, TOutput> = (
  value: TInput,
  context: Context,
) => TOutput;
