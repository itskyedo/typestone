import { type TypePropsDefinition } from '../../def/def.ts';
import { type StandardSchema } from '../standard/types.ts';

export function declareTypes<TInput, TOutput>() {
  return {} as TypePropsDefinition<TInput, TOutput> &
    StandardSchema<TInput, TOutput>;
}
