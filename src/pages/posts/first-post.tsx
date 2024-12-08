import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

const FirstPost: NextPage = () => {
  return (
    <>
      <h1>Hello, first post!</h1>
      <Image src="/images/neko.jpg" height={555} width={737} alt="猫" />
      <br />
      <Link href="/">戻る</Link>
    </>
  );
};

export default FirstPost;
