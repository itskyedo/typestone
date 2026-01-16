import { type ChainCheck } from '../../checks/chain/chain.ts';
import { chainDef } from '../../checks/chain/def.ts';
import { type ChainTransformFunction } from '../../checks/chain/types.ts';
import {
  type Check,
  type CreateCheckFunction,
} from '../../checks/check/check.ts';
import { type RawInput, type RawOutput } from '../../def/def.ts';

export interface ChainMethod {
  <const TLeft extends Check, const TRight extends Check>(
    this: TLeft,
    check: RawOutput<TLeft> extends RawInput<TRight>
      ? TRight
      : Check<RawOutput<TLeft>>,
  ): ChainCheck<TLeft, TRight>;

  <
    const TLeft extends Check,
    const TRight extends Check,
    const TAssertion extends RawOutput<TLeft>,
  >(
    this: TLeft,
    check: TRight,
    transform: ChainTransformFunction<TLeft, TRight, TAssertion>,
  ): ChainCheck<TLeft, TRight, TAssertion>;
}

export const attachChain: (attach: CreateCheckFunction) => ChainMethod = (
  attach,
) =>
  function (
    this: Check,
    check: Check,
    transform?: ChainTransformFunction<Check, Check, any>,
  ) {
    return attach(chainDef(this, check, transform ?? null));
  };
