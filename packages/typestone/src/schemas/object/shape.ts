import { type ObjectSchema } from './object.ts';
import { type ObjectShape } from './types.ts';

export type ShapeOf<TSchema extends ObjectSchema> = TSchema['shape'];

export function objectShape<const TShape extends ObjectShape>(shape: {
  [Key in keyof TShape]: TShape[Key];
}): typeof shape {
  return shape;
}
