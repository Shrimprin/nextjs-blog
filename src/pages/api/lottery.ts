import type { NextApiRequest, NextApiResponse } from "next";

export type LotteryResult = {
  result: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<LotteryResult>
) {
  const fortune = Math.random();
  let result = "unlucky";
  if (fortune >= 0.5) {
    result = "lucky";
  }
  if (fortune >= 0.75) {
    result = "very lucky";
  }
  res.status(200).json({ result });
}
