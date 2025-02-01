import { atom } from "jotai";

export enum SortOrder {
  Ascending, // 昇順
  Descending, // 降順
}

export const sortOrderAtom = atom(SortOrder.Descending);

export const wordAtom = atom<string>("");
export const anagramsAtom = atom<string[]>([]);
