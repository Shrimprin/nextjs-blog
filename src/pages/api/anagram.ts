import type { NextApiRequest, NextApiResponse } from "next";

export type AnagramResult = {
  anagrams: string[];
};

const generateAnagrams = (str: string): string[] => {
  if (str.length <= 1) return [str];
  const anagrams = new Set<string>();
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remainingChars = str.slice(0, i) + str.slice(i + 1);
    for (const subAnagram of generateAnagrams(remainingChars)) {
      anagrams.add(char + subAnagram);
    }
  }
  return Array.from(anagrams);
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnagramResult | { error: string }>
) {
  const { word } = req.query;

  if (typeof word !== "string") {
    return res.status(400).json({ error: "不適切な入力です" });
  }

  const anagrams = generateAnagrams(word);
  res.status(200).json({ anagrams });
}
