import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type Check } from '../check/check.ts';

export type ChainAssertion<
  TLeft extends Check,
  TRight extends Check | null,
> = TRight extends Check ? RawOutput<TRight> : RawOutput<TLeft>;

export type ChainTransformFunction<
  TLeft extends Check<any>,
  TRight extends Check<any>,
  TAssertion extends RawOutput<TLeft>,
> = (
  value: TLeft extends Check ? RawOutput<TLeft> : unknown,
  validate: (value: RawInput<TRight>) => boolean,
) => value is TAssertion;
