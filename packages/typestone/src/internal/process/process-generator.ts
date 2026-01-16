import { type ProcessGenerator, type ProcessResult } from './types.ts';

export function* processGenerator<const TReturn>(
  generator: ProcessGenerator<TReturn>,
): ProcessGenerator<ProcessResult<TReturn>> {
  let yielded = false;
  let iteration = generator.next();
  while (!iteration.done) {
    yielded = true;
    yield iteration.value;
    if (iteration.value.abort) {
      return {
        success: false,
        abort: true,
      };
    }
    iteration = generator.next();
  }

  if (yielded) {
    return {
      success: false,
    };
  } else {
    return {
      success: true,
      data: iteration.value,
    };
  }
}
