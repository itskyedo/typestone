import { type EnumDef } from './def.ts';
import { type EnumSchema } from './enum.ts';
import { type EnumMap, type EnumOptions } from './types.ts';

export function createEnumMap<T extends EnumOptions>(options: T): EnumMap<T> {
  const map: Record<string, any> = {};
  for (const option of options.values()) {
    map[option] = option;
  }

  return Object.freeze(map) as EnumSchema<T>['enum'];
}

export function getEnumOption<const TOptions extends EnumOptions>(
  this: EnumDef<TOptions>,
  value: string,
): TOptions[number] | null {
  return Object.prototype.hasOwnProperty.call(this.enum, value)
    ? this.enum[value as keyof EnumMap<TOptions>]
    : null;
}
