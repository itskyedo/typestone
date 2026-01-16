/**
 * Checks if a value is a generator.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a generator, otherwise `false`.
 */
export function isGenerator(value: unknown): value is Generator {
  return Object.prototype.toString.call(value) === '[object GeneratorFunction]';
}
