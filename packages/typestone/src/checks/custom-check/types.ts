import { type Context } from '../../internal/process/types.ts';

export type CustomCheckFunction<TInput> = (
  value: TInput,
  context: Context,
) => boolean | void;
