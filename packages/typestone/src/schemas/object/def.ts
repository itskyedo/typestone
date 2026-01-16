import {
  type ErrorHandlerParameter,
  type ErrorMap,
  errorParamToErrorMap,
} from '../../error/error.ts';
import { NEVER } from '../../internal/constants/constants.ts';
import { processChecks } from '../../internal/process/process-checks.ts';
import { processGenerator } from '../../internal/process/process-generator.ts';
import { processIssue } from '../../internal/process/process-issue.ts';
import {
  getValueType,
  ValueType,
} from '../../internal/value-type/value-type.ts';
import { type Schema, type SchemaDef } from '../schema/schema.ts';
import { type ObjectSchema } from './object.ts';
import {
  type ObjectBehavior,
  type ObjectInput,
  type ObjectOutput,
  type ObjectShape,
} from './types.ts';
import { createRequiredKeysSet } from './utils.ts';

export type ObjectErrorMap = ErrorMap<
  'invalid_type' | 'unrecognized_key' | 'required'
>;

export interface ObjectDef<
  TShape extends ObjectShape,
  TBehavior extends ObjectBehavior,
> extends SchemaDef<ObjectInput<TShape>, ObjectOutput<TShape>, ObjectErrorMap> {
  readonly type: 'object';

  readonly shape: TShape;
  readonly behavior: TBehavior;
  readonly requiredKeys: ReadonlySet<keyof TShape>;
  readonly catchallSchema?: Schema;
}

export function objectDef<
  const TShape extends ObjectShape,
  const TBehavior extends ObjectBehavior,
>(
  shape: { [Key in keyof TShape]: TShape[Key] },
  behavior: TBehavior,
  error: ErrorHandlerParameter<ObjectErrorMap>,
): ObjectDef<TShape, TBehavior> {
  return {
    kind: 'schema',
    type: 'object',
    checks: [],
    errorMap: errorParamToErrorMap(error),

    shape,
    behavior,
    requiredKeys: createRequiredKeysSet(shape),

    _process,
  };
}

const _process: ObjectSchema['_process'] = function* (context) {
  if (
    !context.value ||
    Array.isArray(context.value) ||
    typeof context.value !== 'object'
  ) {
    return yield* processIssue(this.errorMap, {
      code: 'invalid_type',
      path: context.path,
      input: context.value,
      expected: ValueType.object,
      received: getValueType(context.value),
      message: `Expected an ${ValueType.object}.`,
    });
  }

  const newData: Record<string, unknown> = {};
  let errored: boolean = false;

  for (const [key, targetSchema] of Object.entries(this.shape)) {
    const value = context.value[key as keyof typeof context.value];
    if (this.requiredKeys.has(key) && typeof value === 'undefined') {
      errored = true;
      yield* processIssue(this.errorMap, {
        code: 'required',
        path: [...context.path, key],
        input: value,
        message: 'Required.',
      });
    } else {
      const result = yield* processGenerator(
        targetSchema._process({
          ...context,
          value,
          path: [...context.path, key],
        }),
      );

      if (result.success) {
        newData[key] = result.data;
      } else {
        errored = true;
        if (result.abort) {
          return NEVER;
        }
      }
    }
  }

  for (const [key, value] of Object.entries(context.value)) {
    if (Object.prototype.hasOwnProperty.call(this.shape, key)) {
      continue;
    }

    if (this.catchallSchema) {
      const result = yield* processGenerator(
        this.catchallSchema._process({
          ...context,
          value,
          path: [...context.path, key],
        }),
      );

      if (result.success) {
        newData[key] = result.data;
      } else {
        errored = true;
        if (result.abort) {
          return NEVER;
        }
      }
    } else if (this.behavior === 'strict') {
      errored = true;
      yield* processIssue(this.errorMap, {
        code: 'unrecognized_key',
        path: [...context.path, key],
        input: context.value,
        message: `Unrecognized key: "${key}".`,
      });
    } else if (this.behavior === 'loose') {
      newData[key] = value;
    } else {
      continue;
    }
  }

  if (errored) {
    return NEVER;
  }

  return yield* processChecks(this, {
    ...context,
    value: newData,
  });
};
