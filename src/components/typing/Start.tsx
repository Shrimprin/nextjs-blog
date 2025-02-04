import { useEffect } from "react";

type StartProps = {
  startTyping: () => void;
};

export default function Start({ startTyping }: StartProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        startTyping();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [startTyping]);

  return <p>スペースキーでスタート</p>;
}
