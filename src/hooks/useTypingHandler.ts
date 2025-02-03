import { useEffect, useState, useCallback } from "react";
import { TypingStatus } from "@/types/typingStatus";

type useTypingHandlerProps = {
  targetTextLines: string[];
};

export function useTypingHandler({ targetTextLines }: useTypingHandlerProps) {
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

  const isComplete = useCallback(
    (newCursorPositions: number[]) => {
      return (
        cursorLine === targetTextLines.length - 1 &&
        newCursorPositions[cursorLine] === targetTextLines[cursorLine].length
      );
    },
    [cursorLine, targetTextLines]
  );

  const handleCharacterInput = useCallback(
    (character: string) => {
      const newTypedTextLines = [...typedTextLines];
      const newCursorPositions = [...cursorPositions];

      newTypedTextLines[cursorLine] += character;
      newCursorPositions[cursorLine] = Math.min(
        targetTextLines[cursorLine].length,
        cursorPositions[cursorLine] + 1
      );
      const newCursorLine =
        newCursorPositions[cursorLine] === targetTextLines[cursorLine].length
          ? Math.min(targetTextLines.length - 1, cursorLine + 1)
          : cursorLine;

      return { newTypedTextLines, newCursorPositions, newCursorLine };
    },
    [typedTextLines, cursorPositions, cursorLine, targetTextLines]
  );

  const handleBackspace = useCallback(() => {
    const newTypedTextLines = [...typedTextLines];
    const newCursorPositions = [...cursorPositions];
    const backspacedCursorPosition = cursorPositions[cursorLine] - 1;
    const newCursorLine =
      backspacedCursorPosition < 0 ? Math.max(0, cursorLine - 1) : cursorLine;

    // 最初の行かつ最初の文字の場合は何もしない
    if (cursorLine === 0 && backspacedCursorPosition < 0) {
      return { newTypedTextLines, newCursorPositions, newCursorLine };
    }

    newTypedTextLines[newCursorLine] = typedTextLines[newCursorLine].slice(
      0,
      -1
    );
    newCursorPositions[newCursorLine] =
      backspacedCursorPosition < 0
        ? newCursorPositions[newCursorLine] - 1
        : backspacedCursorPosition;

    return { newTypedTextLines, newCursorPositions, newCursorLine };
  }, [typedTextLines, cursorPositions, cursorLine]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (typingStatus !== "typing") return;

      let result: {
        newTypedTextLines: string[];
        newCursorPositions: number[];
        newCursorLine: number;
      };

      if (e.key.length === 1) {
        result = handleCharacterInput(e.key);
      } else if (e.key === "Enter") {
        result = handleCharacterInput("\n");
      } else if (e.key === "Backspace") {
        result = handleBackspace();
      } else {
        e.preventDefault();
        return;
      }

      setTypedTextLines(result.newTypedTextLines);
      setCursorPositions(result.newCursorPositions);
      setCursorLine(result.newCursorLine);

      if (isComplete(result.newCursorPositions)) {
        setTypingStatus("completed");
      }
    },
    [typingStatus, handleCharacterInput, handleBackspace, isComplete]
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
