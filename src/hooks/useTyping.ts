import { useEffect, useState } from "react";
import { TypingStatus } from "@/types/typingStatus";

type useTypingProps = {
  targetTextLines: string[];
};

export function useTyping({ targetTextLines }: useTypingProps) {
  const initialCursorPositions = targetTextLines.map((line) =>
    line.indexOf(line.trimStart())
  );
  const [cursorPositions, setCursorPositions] = useState(
    initialCursorPositions
  );
  const initialTypedTextLines = targetTextLines.map((_, index) =>
    " ".repeat(initialCursorPositions[index])
  );
  const [typedTextLines, setTypedTextLines] = useState(initialTypedTextLines);
  const [cursorLine, setCursorLine] = useState(0);

  const isMoveToNextLine = (newCursorPosition: number) => {
    return newCursorPosition === targetTextLines[cursorLine].length;
  };

  const isMoveToPreviousLine = (newCursorPosition: number) => {
    return newCursorPosition === 0;
  };

  const isComplete = (newCursorPositions: number[]) => {
    return (
      cursorLine === targetTextLines.length - 1 &&
      newCursorPositions[cursorLine] === targetTextLines[cursorLine].length
    );
  };

  const [typingStatus, setTypingStatus] = useState<TypingStatus>("idling");

  const startTyping = () => {
    setTypingStatus("typing");
  };

  const resetTyping = () => {
    setCursorPositions(initialCursorPositions);
    setTypedTextLines(initialTypedTextLines);
    setCursorLine(0);
    setTypingStatus("idling");
  };

  useEffect(() => {
    if (typingStatus !== "typing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const newTypedTextLines = [...typedTextLines];
      const newCursorPositions = [...cursorPositions];

      if (e.key.length === 1) {
        newTypedTextLines[cursorLine] += e.key;
        newCursorPositions[cursorLine] = Math.min(
          targetTextLines[cursorLine].length,
          cursorPositions[cursorLine] + 1
        );
      } else if (e.key === "Backspace") {
        newTypedTextLines[cursorLine] = typedTextLines[cursorLine].slice(0, -1);
        newCursorPositions[cursorLine] = Math.max(
          0,
          cursorPositions[cursorLine] - 1
        );
      } else if (e.key === "Enter") {
        newTypedTextLines[cursorLine] += "\n";
        newCursorPositions[cursorLine] = cursorPositions[cursorLine] + 1;
      } else if (e.key === "Tab") {
        e.preventDefault();
        return;
      }

      setTypedTextLines(newTypedTextLines);
      setCursorPositions(newCursorPositions);

      if (isMoveToNextLine(newCursorPositions[cursorLine])) {
        setCursorLine((prev) => Math.min(targetTextLines.length - 1, prev + 1));
      }

      if (isMoveToPreviousLine(newCursorPositions[cursorLine])) {
        setCursorLine((prev) => Math.max(0, prev - 1));
      }

      if (isComplete(newCursorPositions)) {
        setTypingStatus("completed");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [typedTextLines, cursorPositions, cursorLine, typingStatus]);

  return {
    typedTextLines,
    cursorPositions,
    cursorLine,
    typingStatus,
    startTyping,
    resetTyping,
  };
}
