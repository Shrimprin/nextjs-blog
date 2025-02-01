import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import styles from "./index.module.css";
import { useAtom } from "jotai";
import { sortOrderAtom, SortOrder } from "../../atom";

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
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  // 日付で並べ替えたデータ
  const sortedPosts = allPostsData?.sort(
    (a, b) => Date.parse(a.date) - Date.parse(b.date)
  );
  // 指定順で並べ替えたデータ
  const posts =
    sortOrder === SortOrder.Ascending ? sortedPosts : sortedPosts.toReversed();

  return (
    <>
      <div>
        <span>
          <input
            type="radio"
            id="descending"
            name="descending"
            value="descending"
            checked={sortOrder === SortOrder.Descending}
            onChange={(_) => setSortOrder(SortOrder.Descending)}
          />
          <label htmlFor="descending">Newer</label>
        </span>
        <span>
          <input
            type="radio"
            id="ascending"
            name="ascending"
            value="ascending"
            checked={sortOrder === SortOrder.Ascending}
            onChange={(_) => setSortOrder(SortOrder.Ascending)}
          />
          <label htmlFor="ascending">Older</label>
        </span>
      </div>
      {posts?.map(({ id, title, date }) => (
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
