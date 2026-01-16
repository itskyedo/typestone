/**
 * Checks if a value has a property.
 *
 * @param value - The value to check.
 * @param property - The property to check.
 * @returns `true` if the value has a property, otherwise `false`.
 */
export function hasProperty<TProperty extends PropertyKey>(
  value: unknown,
  property: TProperty,
): value is Record<TProperty, unknown> {
  return Boolean(
    value && Object.prototype.hasOwnProperty.call(value, property),
  );
}
