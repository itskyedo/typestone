import { type CleanObject } from '../internal/type-utils/types.ts';

export interface Def<
  TInput = unknown,
  TOutput = TInput,
> extends TypePropsDefinition<TInput, TOutput> {
  readonly kind: string;
  readonly type: string;
}

export interface TypePropsDefinition<TInput, TOutput = TInput> {
  readonly '~types'?: TypeProps<TInput, TOutput> | undefined;
}

export interface TypeProps<TInput, TOutput = TInput> {
  input: TInput;
  output: TOutput;
}

export type InferTypeProps<T extends Def> = NonNullable<T['~types']>;

export type RawInput<T extends Def> = InferTypeProps<T>['input'];

export type RawOutput<T extends Def> = InferTypeProps<T>['output'];

export type Input<T extends Def> = CleanObject<RawInput<T>>;

export type Output<T extends Def> = CleanObject<RawOutput<T>>;

export type Infer<T extends Def> = Output<T>;
