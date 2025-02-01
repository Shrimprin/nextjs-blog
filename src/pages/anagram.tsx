import { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { useForm, SubmitHandler } from "react-hook-form";
import { AnagramResult } from "./api/anagram";
import { wordAtom } from "../atom";
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

  const fetchAnagrams = async (
    word: string
  ): Promise<AnagramResult | { error: string }> => {
    const url = `/api/anagram?word=${word}`;
    const response = await fetch(url);
    return response.json();
  };

  const handleClickSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setAnagrams([]);
    setError(null);
    try {
      const anagramData = await fetchAnagrams(data.word);

      if ("error" in anagramData) {
        setError(anagramData.error);
      } else {
        setAnagrams(anagramData.anagrams);
      }
    } catch (err) {
      setError("データを取得できませんでした。");
    }
  };

  const [word, setWord] = useAtom(wordAtom);

  return (
    <>
      <div className={styles.container}>
        <h1>アナグラム作成</h1>
        <form onSubmit={handleSubmit(handleClickSubmit)}>
          <div>
            <input
              type="text"
              {...register("word", {
                required: "文字を入力してください",
                maxLength: {
                  value: 8,
                  message: "文字数は8文字以内としてください",
                },
                onChange: (e) => setWord(e.target.value),
              })}
              placeholder="文字を入力してください"
              className={styles.input}
              value={word}
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
