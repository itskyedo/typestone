import { type Issue } from '../../error/issues.ts';

export type Path = PropertyKey[];

export type ProcessMode = 'encode' | 'decode';

export interface ProcessContext<TValue, TMode extends ProcessMode> {
  readonly value: TValue;
  readonly path: Path;
  readonly mode: TMode;
}

export interface Context {
  readonly path: Path;
  readonly issues: Issue[];
}

export type ProcessGenerator<TReturn> = Generator<Issue, TReturn, any>;

export type ModeSwitch<
  TMode extends ProcessMode,
  TIn,
  TOut,
> = TMode extends 'encode' ? TIn : TOut;

export interface ParseSuccessResult<T> {
  success: true;
  data: T;
  issues?: undefined;
}

export interface ParseFailResult {
  success: false;
  data?: undefined;
  issues: Issue[];
}

export type ParseResult<T> = ParseSuccessResult<T> | ParseFailResult;

export interface ProcessSuccess<T> {
  success: true;
  data: T;
  abort?: undefined;
}

export interface ProcessFail {
  success: false;
  data?: undefined;
  abort?: boolean | undefined;
}

export type ProcessResult<T> = ProcessSuccess<T> | ProcessFail;

export type ProcessReturn<
  TMode extends ProcessMode,
  TIn,
  TOut,
> = TMode extends 'in' ? ProcessResult<TIn> : ProcessResult<TOut>;
