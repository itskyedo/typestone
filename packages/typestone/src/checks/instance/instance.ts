import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createCheck, type DefineCheck } from '../check/check.ts';
import { type InstanceDef, instanceDef, type InstanceErrorMap } from './def.ts';
import { type AnyClass } from './types.ts';

export interface InstanceCheck<
  TClass extends AnyClass = AnyClass,
> extends DefineCheck<InstanceDef<TClass>> {
  kind: 'check';
}

export function instance<const TClass extends AnyClass>(
  ctor: TClass,
  error?: ErrorHandlerParameter<InstanceErrorMap>,
): InstanceCheck<TClass> {
  return createCheck(instanceDef(ctor, error ?? {}));
}
