import { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { AnagramResult } from "./api/anagram";
import styles from "./anagram.module.css";

const Anagram: NextPage<{}> = () => {
  type Inputs = {
    word: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const [anagrams, setAnagrams] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAnagrams: SubmitHandler<Inputs> = async (data: Inputs) => {
    setAnagrams([]);
    setError(null);
    const url = `/api/anagram?word=${data.word}`;
    try {
      const response = await fetch(url);
      const data: AnagramResult | { error: string } = await response.json();

      if ("error" in data) {
        setError(data.error);
      } else {
        setAnagrams(data.anagrams);
      }
    } catch (err) {
      setError("データを取得できませんでした。");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1>アナグラム作成</h1>
        <form onSubmit={handleSubmit(fetchAnagrams)}>
          <div>
            <input
              type="text"
              {...register("word", {
                required: "文字を入力してください",
                maxLength: {
                  value: 8,
                  message: "文字数は8文字以内としてください",
                },
              })}
              placeholder="文字を入力してください"
              className={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.button}
          >
            {isSubmitting ? "作成中..." : "作成"}
          </button>
          {errors.word?.message && (
            <p className={styles.error}>{errors.word?.message}</p>
          )}
          {error && <p className={styles.error}>{error}</p>}
        </form>

        {anagrams.length > 0 && (
          <ul className={styles.anagramList}>
            {anagrams.map((anagram, index) => (
              <li key={index} className={styles.anagramItem}>
                {anagram}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link href="/" className={styles.link}>
        戻る
      </Link>
    </>
  );
};

export default Anagram;
