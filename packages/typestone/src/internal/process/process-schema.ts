import { type RawInput, type RawOutput } from '../../def/def.ts';
import { type Issue } from '../../error/issues.ts';
import { type Schema } from '../../schemas/schema/schema.ts';
import { processGenerator } from './process-generator.ts';
import {
  type ModeSwitch,
  type ParseResult,
  type ProcessContext,
  type ProcessMode,
} from './types.ts';

export function processSchema<
  const TSchema extends Schema,
  const TMode extends ProcessMode,
>(
  schema: TSchema,
  context: ProcessContext<unknown, TMode>,
): ParseResult<ModeSwitch<TMode, RawInput<TSchema>, RawOutput<TSchema>>> {
  const issues: Issue[] = [];
  const iterator = processGenerator(schema._process(context));
  let iteration = iterator.next();

  while (!iteration.done) {
    const issue = iteration.value;
    issues.push(issue);
    if (issue.abort) break;
    iteration = iterator.next();
  }

  if (iteration.done && iteration.value.success && !issues.length) {
    return {
      success: true,
      data: iteration.value.data,
    };
  } else {
    return {
      success: false,
      issues,
    };
  }
}
