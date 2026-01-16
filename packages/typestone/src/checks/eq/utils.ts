import {
  type ProcessContext,
  type ProcessMode,
} from '../../internal/process/types.ts';
import { type ComparableType } from './types.ts';

export function getComparableValue(
  context: ProcessContext<ComparableType, ProcessMode>,
) {
  if (typeof context.value === 'object' && 'length' in context.value) {
    return {
      value: context.value.length,
      path: [...context.path, 'length'],
    };
  } else if (context.value instanceof Date) {
    return {
      value: context.value.getTime(),
      path: [...context.path],
    };
  } else {
    return {
      value: context.value,
      path: [...context.path],
    };
  }
}
