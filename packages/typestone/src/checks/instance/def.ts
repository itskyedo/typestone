import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import { type CheckDef } from '../check/check.ts';
import { type InstanceCheck } from './instance.ts';
import { type AnyClass } from './types.ts';
import { getConstructorName } from './utils.ts';

export type InstanceErrorMap = ErrorMap<'invalid_type'>;

export interface InstanceDef<TClass extends AnyClass> extends CheckDef<
  InstanceType<TClass>,
  InstanceType<TClass>,
  InstanceErrorMap
> {
  readonly type: 'instance';

  readonly ctor: TClass;
}

export function instanceDef<const TClass extends AnyClass>(
  ctor: TClass,
  error: ErrorHandlerParameter<InstanceErrorMap>,
): InstanceDef<TClass> {
  return {
    kind: 'check',
    type: 'instance',
    errorMap: errorParamToErrorMap(error),

    ctor,

    _process,
  };
}

const _process: InstanceCheck['_process'] = function* (context) {
  const ctorName = getConstructorName(this.ctor) ?? 'No constructor name';
  const valueCtorName =
    getConstructorName(context.value) ?? 'No constructor name';
  if (!((context.value as unknown) instanceof this.ctor)) {
    yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ctorName,
      received: valueCtorName,
      message: `Expected an instance of ${ctorName}.`,
    });
  }
};
