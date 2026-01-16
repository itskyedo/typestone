import { type RawOutput } from '../../def/def.ts';
import { type Check, createCheck, type DefineCheck } from '../check/check.ts';
import { type ChainDef, chainDef } from './def.ts';

export interface ChainCheck<
  TLeft extends Check = Check,
  TRight extends Check | null = Check | null,
  TAssertion extends RawOutput<TLeft> = RawOutput<TLeft>,
> extends DefineCheck<ChainDef<TLeft, TRight, TAssertion>> {
  kind: 'check';
}

export function chain<const TInner extends Check>(
  check: TInner,
): ChainCheck<TInner, null, RawOutput<TInner>> {
  return createCheck(chainDef(check, null, null));
}
