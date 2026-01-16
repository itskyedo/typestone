import { type RawOutput } from '../../def/def.ts';
import { type ErrorMap } from '../../error/error.ts';
import { type Issue } from '../../error/issues.ts';
import { processGenerator } from '../../internal/process/process-generator.ts';
import { type Check, type CheckDef } from '../check/check.ts';
import { type ChainCheck } from './chain.ts';
import { type ChainTransformFunction } from './types.ts';

export type ChainErrorMap = ErrorMap<never>;

export interface ChainDef<
  TLeft extends Check,
  TRight extends Check | null,
  TAssertion extends RawOutput<TLeft>,
> extends CheckDef<TAssertion, TAssertion, ChainErrorMap> {
  readonly type: 'chain';

  readonly left: TLeft;
  readonly right: TRight;
  readonly transform: TRight extends Check
    ? ChainTransformFunction<TLeft, TRight, TAssertion> | null
    : null;
}

export function chainDef<
  const TLeft extends Check,
  const TRight extends Check<RawOutput<TLeft>> | null,
  const TAssertion extends RawOutput<TLeft>,
>(
  left: TLeft,
  right: TRight,
  transform: TRight extends Check
    ? ChainTransformFunction<TLeft, TRight, TAssertion> | null
    : null,
): ChainDef<TLeft, TRight, TAssertion> {
  return {
    kind: 'check',
    type: 'chain',
    errorMap: {},

    left,
    right,
    transform,

    _process,
  };
}

const _process: ChainCheck['_process'] = function* (context) {
  let success: boolean;

  if (typeof this.transform === 'function') {
    let issues: Issue[] = [];
    success = this.transform(context.value, (value: unknown) => {
      issues = Array.from(
        this.left._process({
          ...context,
          value,
        }),
      );

      return issues.length === 0;
    });

    for (const issue of issues) {
      yield issue;
    }
  } else {
    success = (yield* processGenerator(
      this.left._process({ ...context, value: context.value }),
    )).success;
  }

  if (success && this.right) {
    yield* this.right._process(context);
  }
};
