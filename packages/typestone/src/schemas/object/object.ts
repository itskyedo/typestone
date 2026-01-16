import { type ErrorHandlerParameter } from '../../error/error.ts';
import { type DefineSchema } from '../schema/schema.ts';
import { createObject, type ObjectMethods } from './create-object.ts';
import { type ObjectDef, type ObjectErrorMap } from './def.ts';
import { type ObjectBehavior, type ObjectShape } from './types.ts';

export interface ObjectSchema<
  TShape extends ObjectShape = ObjectShape,
  TBehavior extends ObjectBehavior = ObjectBehavior,
>
  extends DefineSchema<ObjectDef<TShape, TBehavior>>, ObjectMethods<TShape> {
  kind: 'schema';
}

export function object<const TShape extends ObjectShape>(
  shape: {
    [Key in keyof TShape]: TShape[Key];
  },
  error?: ErrorHandlerParameter<ObjectErrorMap>,
): ObjectSchema<TShape, 'strip'> {
  return createObject(shape, 'strip', error);
}

export function strictObject<const TShape extends ObjectShape>(
  shape: {
    [Key in keyof TShape]: TShape[Key];
  },
  error?: ErrorHandlerParameter<ObjectErrorMap>,
): ObjectSchema<TShape, 'strict'> {
  return createObject(shape, 'strict', error);
}

export function looseObject<const TShape extends ObjectShape>(
  shape: {
    [Key in keyof TShape]: TShape[Key];
  },
  error?: ErrorHandlerParameter<ObjectErrorMap>,
): ObjectSchema<TShape, 'loose'> {
  return createObject(shape, 'loose', error);
}
