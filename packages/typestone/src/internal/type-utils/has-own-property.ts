/**
 * Type guard that checks if a value has the specified own property, excluding
 * inherited properties from the prototype chain.
 *
 * @param value - The value to check.
 * @param property - The property key to check for.
 * @returns `true` if the value has the own property, otherwise `false`.
 */
export function hasOwnProperty<TProperty extends PropertyKey>(
  value: unknown,
  property: TProperty,
): value is Record<TProperty, unknown> {
  return Boolean(
    typeof value !== 'undefined' &&
    value !== null &&
    Object.prototype.hasOwnProperty.call(value, property),
  );
}
