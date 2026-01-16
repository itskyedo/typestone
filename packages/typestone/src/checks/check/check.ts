import { type Def, type RawInput } from '../../def/def.ts';
import { type ErrorMap } from '../../error/error.ts';
import {
  type ProcessContext,
  type ProcessGenerator,
  type ProcessMode,
} from '../../internal/process/types.ts';
import { attachChain, type ChainMethod } from '../../methods/chain/chain.ts';

export interface CheckDef<
  TInput = unknown,
  TOutput extends TInput = TInput,
  TErrorMap extends ErrorMap<any> | ErrorMap<never> =
    | ErrorMap<any>
    | ErrorMap<never>,
> extends Def<TInput, TOutput> {
  readonly kind: 'check';
  readonly type: string;
  readonly errorMap: TErrorMap;

  /**
   * @internal
   */
  _process: CheckProcessFunction<this>;
}

export type CheckProcessFunction<TDef extends CheckDef> = <
  const TCheck extends DefineCheck<TDef>,
  const TMode extends ProcessMode,
>(
  this: TCheck,
  context: ProcessContext<RawInput<TCheck>, TMode>,
) => ProcessGenerator<void>;

export type DefineCheck<T extends CheckDef> = T & CheckMethods & {};

export interface Check<
  TInput = unknown,
  TOutput extends TInput = TInput,
> extends DefineCheck<CheckDef<TInput, TOutput>> {}

export interface CheckMethods {
  chain: ChainMethod;
}

export type CreateCheckFunction = <TDef extends CheckDef>(
  def: TDef,
) => DefineCheck<TDef>;

export const createCheck: CreateCheckFunction = (def) => {
  return {
    ...def,

    chain: attachChain(createCheck),
  };
};
