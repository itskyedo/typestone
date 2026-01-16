import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type ProcessMode } from '../../internal/process/types.ts';
import { type Schema } from '../schema/schema.ts';

export type TupleParts = [Schema, ...Schema[]];

export type TupleInput<
  TParts extends [Schema, ...Schema[]],
  TRest extends Schema | undefined,
> = TupleValue<'encode', TParts, TRest>;

export type TupleOutput<
  TParts extends [Schema, ...Schema[]],
  TRest extends Schema | undefined,
> = TupleValue<'decode', TParts, TRest>;

type TupleValue<
  TMode extends ProcessMode,
  TParts extends [Schema, ...Schema[]],
  TRest extends Schema | undefined,
> = undefined extends TRest
  ? MapTupleParts<TMode, TParts>
  : [...MapTupleParts<TMode, TParts>, ...TRest[]];

type MapTupleParts<
  TMode extends ProcessMode,
  TParts extends [Schema, ...Schema[]],
> = {
  [Key in keyof TParts]: TMode extends 'encode'
    ? RawInput<TParts[Key]>
    : RawOutput<TParts[Key]>;
};
