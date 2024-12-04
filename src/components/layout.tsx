import styles from "./layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <h2>Next.js Practice</h2>
      {children}
    </div>
  );
}
