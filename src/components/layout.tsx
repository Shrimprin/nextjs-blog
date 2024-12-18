import Link from "next/link";
import styles from "./layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Link href="/">
        <h2>Next.js Practice</h2>
      </Link>
      {children}
    </div>
  );
}
