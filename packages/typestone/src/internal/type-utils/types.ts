export type CleanObject<TObject> = {
  [Key in keyof TObject]: TObject[Key];
} & {};

export type IntersectUnion<TUnion> = (
  TUnion extends any ? (x: TUnion) => void : never
) extends (x: infer I) => void
  ? I
  : never;
