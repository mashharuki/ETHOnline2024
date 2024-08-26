import Toaster from "@/components/Toaster";
import styles from "@/styles/Home.module.css";
import "react-toastify/dist/ReactToastify.css";

/**
 * Home Component
 * @returns
 */
export default function Home() {
  return (
    <>
      <main className={styles.main}>
        テスト
        <Toaster />
      </main>
    </>
  );
}
