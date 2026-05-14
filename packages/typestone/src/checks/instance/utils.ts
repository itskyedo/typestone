export function getConstructorName(value: unknown): string | null {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isConstructor = typeof value === 'function' && value.prototype;
  if (isConstructor) {
    return value.name || null;
  }

  const isObject = typeof value === 'object' && value !== null;
  if (isObject) {
    const ctor = value.constructor;
    if (typeof ctor === 'function') {
      return ctor.name || null;
    }
  }

  return null;
}
