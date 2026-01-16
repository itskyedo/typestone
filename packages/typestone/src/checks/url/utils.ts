export function parseUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch (_) {
    return null;
  }
}
