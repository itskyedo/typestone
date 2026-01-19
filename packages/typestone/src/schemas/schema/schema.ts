import { type Check } from '../../checks/check/check.ts';
import {
  type Def,
  type RawInput,
  type RawOutput,
  type TypePropsDefinition,
} from '../../def/def.ts';
import { type ErrorMap } from '../../error/error.ts';
import {
  type ModeSwitch,
  type ProcessContext,
  type ProcessGenerator,
  type ProcessMode,
} from '../../internal/process/types.ts';
import { getStandardProps } from '../../internal/standard/get-standard-props.ts';
import { type StandardSchema } from '../../internal/standard/types.ts';
import { type AndMethod, attachAnd } from '../../methods/and/and.ts';
import { type ArrayMethod, attachArray } from '../../methods/array/array.ts';
import { check, type CheckMethod } from '../../methods/check/check.ts';
import { decode, type DecodeMethod } from '../../methods/decode/decode.ts';
import { encode, type EncodeMethod } from '../../methods/encode/encode.ts';
import {
  attachNullable,
  type NullableMethod,
} from '../../methods/nullable/nullable.ts';
import {
  attachOptional,
  type OptionalMethod,
} from '../../methods/optional/optional.ts';
import { attachOr, type OrMethod } from '../../methods/or/or.ts';
import { parse, type ParseMethod } from '../../methods/parse/parse.ts';
import { attachPipe, type PipeMethod } from '../../methods/pipe/pipe.ts';
import {
  safeDecode,
  type SafeDecodeMethod,
} from '../../methods/safe-decode/safe-decode.ts';
import {
  safeEncode,
  type SafeEncodeMethod,
} from '../../methods/safe-encode/safe-encode.ts';
import {
  safeParse,
  type SafeParseMethod,
} from '../../methods/safe-parse/safe-parse.ts';

export interface SchemaDef<
  TInput = unknown,
  TOutput = TInput,
  TErrorMap extends ErrorMap<any> | ErrorMap<never> =
    | ErrorMap<any>
    | ErrorMap<never>,
> extends Def<TInput, TOutput> {
  readonly kind: 'schema';
  readonly type: string;
  readonly checks: Check[];
  readonly errorMap: TErrorMap;

  /**
   * @internal
   */
  _process: SchemaProcessFunction<this>;
}

export type SchemaProcessFunction<TDef extends SchemaDef> = <
  const TSchema extends DefineSchema<TDef>,
  const TMode extends ProcessMode,
>(
  this: TSchema,
  context: ProcessContext<unknown, TMode>,
) => ProcessGenerator<ModeSwitch<TMode, RawInput<TSchema>, RawOutput<TSchema>>>;

export type DefineSchema<T extends SchemaDef> = T &
  SchemaMethods &
  StandardSchema<RawInput<T>, RawOutput<T>> & {};

export type ReplaceSchemaTypes<TSchema extends Schema, TInput, TOutput> = (Omit<
  TSchema,
  '~types' | 'standard'
> &
  TypePropsDefinition<TInput, TOutput> &
  StandardSchema<TInput, TOutput>) & {};

export interface Schema<
  TInput = unknown,
  TOutput = TInput,
> extends DefineSchema<SchemaDef<TInput, TOutput>> {}

export interface SchemaMethods {
  safeParse: SafeParseMethod;
  safeEncode: SafeEncodeMethod;
  safeDecode: SafeDecodeMethod;
  parse: ParseMethod;
  encode: EncodeMethod;
  decode: DecodeMethod;
  check: CheckMethod;
  pipe: PipeMethod;
  and: AndMethod;
  or: OrMethod;
  optional: OptionalMethod;
  nullable: NullableMethod;
  array: ArrayMethod;
}

export type CreateSchemaFunction = <TDef extends SchemaDef>(
  def: TDef,
) => DefineSchema<TDef>;

export const createSchema: CreateSchemaFunction = (def) => {
  return {
    ...def,

    get '~standard'() {
      return getStandardProps(this);
    },

    safeParse,
    safeEncode,
    safeDecode,
    parse,
    encode,
    decode,
    check,
    pipe: attachPipe(createSchema),
    and: attachAnd(createSchema),
    or: attachOr(createSchema),
    optional: attachOptional(createSchema),
    nullable: attachNullable(createSchema),
    array: attachArray(createSchema),
  };
};
