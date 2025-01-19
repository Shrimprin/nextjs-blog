import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className={styles.grid}>
          <Link href="/posts/first-post" className={styles.card}>
            <h2>
              First Post <span>-&gt;</span>
            </h2>
            <p>プラクティス「ルーティングとページの作成」で作成したページへ</p>
          </Link>

          <Link href="/posts" className={styles.card}>
            <h2>
              All Posts <span>-&gt;</span>
            </h2>
            <p>
              プラクティス「プリレンダリングとデータの取得方法を理解する」で作成したページへ
            </p>
          </Link>

          <Link href="/anagram" className={styles.card}>
            <h2>
              Anagram <span>-&gt;</span>
            </h2>
            <p>プラクティス「APIを作成する」で作成したページへ</p>
          </Link>

          <Link href="/hooks" className={styles.card}>
            <h2>
              Hooks <span>-&gt;</span>
            </h2>
            <p>プラクティス「React Hooks」で作成したページへ</p>
          </Link>
        </div>
      </main>
    </>
  );
}
