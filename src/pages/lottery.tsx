import { NextPage } from "next";
import { LotteryResult } from "./api/lottery";
import useSWR from "swr";

const fetcher = (url: string): Promise<LotteryResult> =>
  fetch(url).then((response) => response.json());

const Lottery: NextPage<{}> = () => {
  const { data: lottery, error } = useSWR("/api/lottery", fetcher);
  return (
    <>
      <p>おみくじ結果: {lottery?.result}</p>
    </>
  );
};
export default Lottery;
