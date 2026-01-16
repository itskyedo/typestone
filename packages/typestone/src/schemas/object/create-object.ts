import { type ErrorHandlerParameter } from '../../error/error.ts';
import { createSchema } from '../schema/schema.ts';
import { objectDef, type ObjectErrorMap } from './def.ts';
import { catchall, type CatchallMethod } from './methods/catchall/catchall.ts';
import { extend, type ExtendMethod } from './methods/extend/extend.ts';
import { attachOmit, type OmitMethod } from './methods/omit/omit.ts';
import {
  partialAll,
  type PartialAllMethod,
} from './methods/partial-all/partial-all.ts';
import {
  partialOnly,
  type PartialOnlyMethod,
} from './methods/partial-only/partial-only.ts';
import { attachPick, type PickMethod } from './methods/pick/pick.ts';
import {
  safeExtend,
  type SafeExtendMethod,
} from './methods/safe-extend/safe-extend.ts';
import { type ObjectSchema } from './object.ts';
import { type ObjectBehavior, type ObjectShape } from './types.ts';

export interface ObjectMethods<TShape extends ObjectShape> {
  readonly extend: ExtendMethod<TShape>;
  readonly safeExtend: SafeExtendMethod<TShape>;
  readonly partialAll: PartialAllMethod<TShape>;
  readonly partialOnly: PartialOnlyMethod<TShape>;
  readonly catchall: CatchallMethod<TShape>;
  readonly pick: PickMethod<TShape>;
  readonly omit: OmitMethod<TShape>;
}

export type CreateObjectFunction = typeof createObject;

export function createObject<
  const TShape extends ObjectShape,
  const TBehavior extends ObjectBehavior,
>(
  // Necessary to preserve strong typing of type parameters.
  // Inlining the mapping so type hints are more useful.
  shape: { [Key in keyof TShape]: TShape[Key] },
  behavior: TBehavior,
  error?: ErrorHandlerParameter<ObjectErrorMap>,
): ObjectSchema<TShape, TBehavior> {
  return createSchema({
    ...objectDef(shape, behavior, error ?? {}),

    extend,
    safeExtend,
    partialAll,
    partialOnly,
    catchall,
    pick: attachPick(createObject),
    omit: attachOmit(createObject),
  });
}
