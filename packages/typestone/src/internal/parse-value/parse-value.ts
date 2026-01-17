import { isPromiseLike } from '../type-utils/is-promise-like.ts';

export type StandardValueType = keyof typeof StandardValueType;
export const StandardValueType = Object.freeze({
  boolean: 'boolean',
  number: 'number',
  nan: 'nan',
  bigint: 'bigint',
  string: 'string',
  object: 'object',
  symbol: 'symbol',
  array: 'array',
  function: 'function',
  null: 'null',
  undefined: 'undefined',
  unknown: 'unknown',

  date: 'date',
  map: 'map',
  set: 'set',
  promise: 'promise',
});

export type ExtendedValueType = keyof typeof ExtendedValueType;
export const ExtendedValueType = Object.freeze({
  integer: 'integer',
  float: 'float',

  never: 'never',
});

export type ValueType = keyof typeof ValueType;
export const ValueType = Object.freeze({
  ...StandardValueType,
  ...ExtendedValueType,
});

/**
 * Parses a value and gets its details.
 *
 * @param value - The value to check.
 * @returns An object containing the type and the value.
 */
export function parseValue(value: unknown) {
  switch (typeof value) {
    case 'boolean':
      return {
        type: ValueType.boolean,
        value,
      } as const;
    case 'number':
      if (Number.isNaN(value)) {
        return {
          type: ValueType.nan,
          value,
        } as const;
      } else {
        return {
          type: ValueType.number,
          isInteger: Number.isInteger(value),
          value,
        } as const;
      }
    case 'bigint':
      return {
        type: ValueType.bigint,
        value,
      } as const;
    case 'string':
      return {
        type: ValueType.string,
        value,
      } as const;
    case 'symbol':
      return {
        type: ValueType.symbol,
        value,
      } as const;
    case 'function':
      return {
        type: ValueType.function,
        value,
      } as const;
    case 'undefined':
      return {
        type: ValueType.undefined,
        value,
      } as const;
    case 'object':
      if (value === null) {
        return {
          type: ValueType.null,
          value,
        } as const;
      } else if (Array.isArray(value)) {
        return {
          type: ValueType.array,
          value,
        } as const;
      } else if (value instanceof Date) {
        return {
          type: ValueType.date,
          isValid: !Number.isNaN(value.getTime()),
          value,
        } as const;
      } else if (value instanceof Map) {
        return {
          type: ValueType.map,
          value,
        } as const;
      } else if (value instanceof Set) {
        return {
          type: ValueType.set,
          value,
        } as const;
      } else if (isPromiseLike(value)) {
        return {
          type: ValueType.promise,
          value,
        } as const;
      } else {
        return {
          type: ValueType.object,
          value,
        } as const;
      }
    default:
      return {
        type: ValueType.unknown,
        value,
      } as const;
  }
}
