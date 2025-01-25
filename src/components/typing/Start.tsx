import { useEffect } from "react";
import { TypingStatus } from "@/types/typingStatus";

type StartProps = {
  setTypingStatus: (typingStatus: TypingStatus) => void;
};

export default function Start({ setTypingStatus }: StartProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setTypingStatus("typing");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <p>スペースキーでスタート</p>;
}
