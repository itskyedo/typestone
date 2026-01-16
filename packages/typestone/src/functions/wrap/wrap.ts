export type MaybeWrapped<T> = T | Wrapper<T>;

export class Wrapper<T> {
  readonly inner: () => T;

  constructor(fn: () => T) {
    this.inner = fn;
  }
}

/**
 * Wraps a value to make it identifiable by the validator.
 *
 * @param value - The value to wrap.
 * @returns A wrapper.
 */
export function wrap<const T>(value: () => T): Wrapper<T> {
  return new Wrapper(value);
}
