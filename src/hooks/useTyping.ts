import { useEffect, useState, useCallback } from "react";
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

  const isMoveToNextLine = useCallback(
    (newCursorPosition: number) => {
      return newCursorPosition === targetTextLines[cursorLine].length;
    },
    [cursorLine, targetTextLines]
  );

  const isComplete = useCallback(
    (newCursorPositions: number[]) => {
      return (
        cursorLine === targetTextLines.length - 1 &&
        newCursorPositions[cursorLine] === targetTextLines[cursorLine].length
      );
    },
    [cursorLine, targetTextLines]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (typingStatus !== "typing") return;

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
        const newCursorPosition = cursorPositions[cursorLine] - 1;
        if (newCursorPosition < 0) {
          newTypedTextLines[cursorLine - 1] = typedTextLines[
            cursorLine - 1
          ].slice(0, -1);
          newCursorPositions[cursorLine - 1] -= 1;
          setCursorLine((prev) => Math.max(0, prev - 1));
        } else {
          newCursorPositions[cursorLine] = newCursorPosition;
        }
      } else if (e.key === "Enter") {
        newTypedTextLines[cursorLine] += "\n";
        newCursorPositions[cursorLine] = Math.min(
          targetTextLines[cursorLine].length,
          cursorPositions[cursorLine] + 1
        );
      } else {
        e.preventDefault();
        return;
      }

      if (isMoveToNextLine(newCursorPositions[cursorLine])) {
        setCursorLine((prev) => Math.min(targetTextLines.length - 1, prev + 1));
      }

      setTypedTextLines(newTypedTextLines);
      setCursorPositions(newCursorPositions);

      if (isComplete(newCursorPositions)) {
        setTypingStatus("completed");
      }
    },
    [
      cursorLine,
      cursorPositions,
      targetTextLines,
      typedTextLines,
      typingStatus,
      isMoveToNextLine,
      isComplete,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    typedTextLines,
    cursorPositions,
    cursorLine,
    typingStatus,
    startTyping,
    resetTyping,
  };
}
