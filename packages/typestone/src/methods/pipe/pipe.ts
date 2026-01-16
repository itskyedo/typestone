import { type RawInput, type RawOutput } from '../../def/def.ts';
import { pipeDef } from '../../schemas/pipe/def.ts';
import { type PipeSchema } from '../../schemas/pipe/pipe.ts';
import {
  type CreateSchemaFunction,
  type Schema,
} from '../../schemas/schema/schema.ts';

export type PipeMethod = <
  const TInput extends Schema,
  const TOutput extends Schema,
>(
  this: TInput,
  target: RawOutput<TInput> extends RawInput<TOutput>
    ? TOutput
    : Schema<RawOutput<TInput>, RawOutput<TOutput>>,
) => PipeSchema<TInput, TOutput>;

export const attachPipe: (attach: CreateSchemaFunction) => PipeMethod = (
  attach,
) =>
  function (target) {
    return attach(pipeDef(this, target));
  };
