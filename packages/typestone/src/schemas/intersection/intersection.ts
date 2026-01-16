import { createSchema, type DefineSchema } from '../schema/schema.ts';
import { type IntersectionDef, intersectionDef } from './def.ts';
import { type IntersectionOptions } from './types.ts';

export interface IntersectionSchema<
  TOptions extends IntersectionOptions = IntersectionOptions,
> extends DefineSchema<IntersectionDef<TOptions>> {
  kind: 'schema';
}

export function intersection<const TOptions extends IntersectionOptions>(
  options: TOptions,
): IntersectionSchema<TOptions> {
  return createSchema(intersectionDef(options));
}
