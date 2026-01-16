import { hasProperty } from './has-property.ts';

/**
 * Checks if a value is promise-like (an object matching the shape of a
 * promise).
 *
 * @param value - The value to check.
 * @returns `true` if the value is promise-like, otherwise `false`.
 */
export function isPromiseLike(value: unknown): value is Promise<unknown> {
  return Boolean(
    value &&
    hasProperty(value, 'then') &&
    hasProperty(value, 'catch') &&
    typeof value.then === 'function' &&
    typeof value.catch === 'function',
  );
}
