import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import styles from "./index.module.css";

type Post = {
  id: number;
  title: string;
  date: string;
};

type HomeProps = {
  allPostsData: Post[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      allPostsData: [
        { id: 1, title: "First Post", date: "2024-01-01" },
        { id: 2, title: "Second Post", date: "2024-01-02" },
        { id: 3, title: "Third Post", date: "2024-01-03" },
      ],
    },
  };
};

const Home: NextPage<HomeProps> = ({ allPostsData }) => {
  return (
    <>
      {allPostsData?.map(({ id, title, date }) => (
        <div key={id} className={styles.postContainer}>
          <p className={styles.postDate}>{date}</p>
          <p className={styles.postTitle}>{title}</p>
        </div>
      ))}
      <br />
      <Link href="/">戻る</Link>
    </>
  );
};

export default Home;
