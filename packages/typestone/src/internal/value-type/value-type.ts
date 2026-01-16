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
 * Gets the standard value type of a value.
 *
 * @param value - The value to check.
 * @returns The standard value type.
 */
export function getValueType(value: unknown): StandardValueType {
  switch (typeof value) {
    case 'boolean':
      return ValueType.boolean;
    case 'number':
      if (Number.isNaN(value)) return ValueType.nan;
      else return ValueType.number;
    case 'bigint':
      return ValueType.bigint;
    case 'string':
      return ValueType.string;
    case 'symbol':
      return ValueType.symbol;
    case 'function':
      return ValueType.function;
    case 'undefined':
      return ValueType.undefined;
    case 'object':
      if (value === null) return ValueType.null;
      else if (Array.isArray(value)) return ValueType.array;
      else if (value instanceof Date) return ValueType.date;
      else if (value instanceof Map) return ValueType.map;
      else if (value instanceof Set) return ValueType.set;
      else if (isPromiseLike(value)) return ValueType.promise;
      else return ValueType.object;
    default:
      return ValueType.unknown;
  }
}
