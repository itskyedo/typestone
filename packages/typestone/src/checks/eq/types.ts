export type ComparableType = WithLength | Date | number | bigint;

export interface WithLength {
  length: number;
}
