export type LiteralValue = string | number | boolean;

export type LiteralOptions = [LiteralValue, ...LiteralValue[]];

export type LiteralValues = LiteralValue | LiteralOptions;

export type InferLiteralValue<TValues extends LiteralValues> =
  TValues extends any[] ? TValues[number] : TValues;
