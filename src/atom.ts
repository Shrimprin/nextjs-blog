import { atom } from "jotai";

export enum SortOrder {
  Ascending, // 昇順
  Descending, // 降順
}

export const sortOrderAtom = atom(SortOrder.Descending);
