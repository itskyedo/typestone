import { type InferTypeProps, type TypeProps } from '../../def/def.ts';
import { type IntersectUnion } from '../../internal/type-utils/types.ts';
import { type Schema } from '../schema/schema.ts';

export type IntersectionOptions = [Schema, Schema, ...Schema[]];

export type IntersectionInput<T extends IntersectionOptions> =
  IntersectionTypeProps<T>['input'];

export type IntersectionOutput<T extends IntersectionOptions> =
  IntersectionTypeProps<T>['output'];

type IntersectionTypeProps<T extends IntersectionOptions> =
  IntersectUnion<InferTypeProps<T[number]>> extends infer Types
    ? Types extends TypeProps<any, any>
      ? Types
      : never
    : never;
