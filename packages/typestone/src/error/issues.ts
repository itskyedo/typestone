import { type Path } from '../internal/process/types.ts';

export interface BaseIssue<TCode extends string> {
  readonly code: TCode;
  readonly message: string;
  readonly input: unknown;
  readonly path: Path;

  readonly abort?: boolean;
  readonly expected?: unknown;
  readonly received?: unknown;
}

export interface CustomIssue extends BaseIssue<'custom'> {}

export interface InvalidTypeIssue extends BaseIssue<'invalid_type'> {
  readonly expected: string;
  readonly received: string;
}

export interface InvalidUnionIssue extends BaseIssue<'invalid_union'> {
  readonly unionIssues: { issues: Issue[] }[];
}

export interface InvalidValueIssue extends BaseIssue<'invalid_value'> {
  readonly values?: any[];
}

export interface RequiredIssue extends BaseIssue<'required'> {}

export interface TooBigIssue extends BaseIssue<'too_big'> {
  readonly expected: number | bigint;
  readonly received: number | bigint;
}

export interface TooSmallIssue extends BaseIssue<'too_small'> {
  readonly expected: number | bigint;
  readonly received: number | bigint;
}

export interface UnrecognizedKeyIssue extends BaseIssue<'unrecognized_key'> {}

export interface InvalidFormatIssue extends BaseIssue<'invalid_format'> {
  readonly format: string;
}

export type IssueWithCode<TCode extends Issue['code']> = Extract<
  Issue,
  { code: TCode }
>;

export type IssueCode = Issue['code'];

export type Issue =
  | InvalidTypeIssue
  | CustomIssue
  | InvalidUnionIssue
  | InvalidValueIssue
  | TooBigIssue
  | TooSmallIssue
  | RequiredIssue
  | UnrecognizedKeyIssue
  | InvalidFormatIssue;
