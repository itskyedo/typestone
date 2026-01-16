import { type Schema } from '../../schemas/schema/schema.ts';
import { toStandardIssue } from './to-standard-issue.ts';

export function getStandardProps<TSchema extends Schema>(
  schema: TSchema,
): TSchema['~standard'] {
  return {
    version: 1,
    vendor: 'typestone',
    validate: (value) => {
      const result = schema.safeDecode(value);
      return result.success
        ? { value: result.data }
        : { issues: result.issues.map(toStandardIssue) };
    },
  };
}
