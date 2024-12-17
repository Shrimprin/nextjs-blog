import { NextPage } from "next";
import { useState } from "react";
import { AnagramResult } from "./api/anagram";

const Anagram: NextPage<{}> = () => {
  const [word, setWord] = useState<string>("");
  const [anagrams, setAnagrams] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAnagrams = async () => {
    setAnagrams([]);
    setError(null);
    setIsLoading(true);

    try {
      if (!word) {
        setError("文字を入力してください");
        return;
      }

      const response = await fetch(`/api/anagram?word=${word}`);
      const data: AnagramResult | { error: string } = await response.json();

      if ("error" in data) {
        setError(data.error);
      } else {
        setAnagrams(data.anagrams);
      }
    } catch (err) {
      setError("データを取得できませんでした。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>アナグラム作成</h1>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="文字を入力してください"
      />
      <button onClick={fetchAnagrams} disabled={isLoading}>
        {isLoading ? "作成中..." : "作成"}
      </button>
      {error && <p>{error}</p>}
      <ul>
        {anagrams.map((anagram, index) => (
          <li key={index}>{anagram}</li>
        ))}
      </ul>
    </>
  );
};

export default Anagram;
