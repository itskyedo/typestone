import { type Check } from '../../checks/check/check.ts';
import { type Def } from '../../def/def.ts';
import { type Schema } from '../../schemas/schema/schema.ts';

export function isOfKind<T extends string>(
  target: unknown,
  kind: T,
): target is Def & { kind: T } {
  return Boolean(
    target &&
    typeof target === 'object' &&
    (target as Record<string, any>).kind === kind,
  );
}

export function isOfType<T extends string>(
  target: unknown,
  type: T,
): target is Def & { type: T } {
  return Boolean(
    target &&
    typeof target === 'object' &&
    (target as Record<string, any>).type === type,
  );
}

export function isCheck(target: unknown): target is Check;
export function isCheck<T extends Check>(
  target: unknown,
  type: T['type'],
): target is T;
export function isCheck(target: unknown, type?: string): boolean {
  const isKind = isOfKind(target, 'check');
  const isType = typeof type === 'string' ? isOfType(target, type) : true;
  return isKind && isType;
}

export function isSchema(target: unknown): target is Schema;
export function isSchema<T extends Schema>(
  target: unknown,
  type: T['type'],
): target is T;
export function isSchema(target: unknown, type?: string): boolean {
  const isKind = isOfKind(target, 'schema');
  const isType = typeof type === 'string' ? isOfType(target, type) : true;
  return isKind && isType;
}
