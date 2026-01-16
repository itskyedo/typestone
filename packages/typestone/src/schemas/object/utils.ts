import { type ObjectShape } from './types.ts';

export function createRequiredKeysSet<T extends ObjectShape>(
  shape: T,
): ReadonlySet<keyof T> {
  const requiredKeys: ReadonlySet<keyof T> = new Set();

  Object.entries(shape).forEach(([key, schema]) => {
    if (schema.type !== 'optional') {
      (requiredKeys as Set<keyof T>).add(key);
    }
  });

  return requiredKeys;
}
