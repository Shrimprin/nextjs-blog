import type { NextPage } from "next";
import Link from "next/link";

const FirstPost: NextPage = () => {
  return (
    <>
      <h1>Hello, first post!</h1>
      <Link href="/">戻る</Link>
    </>
  );
};

export default FirstPost;
