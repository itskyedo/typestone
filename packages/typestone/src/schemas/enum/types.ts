export type EnumOptions = [string, ...string[]];

export type EnumMap<TOptions extends EnumOptions> = {
  [Option in TOptions[number]]: Option;
};
