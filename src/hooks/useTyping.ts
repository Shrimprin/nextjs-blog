import { useEffect } from "react";
import { TypingStatus } from "@/types/typingStatus";

type useTypingProps = {
  targetTextLines: string[];
  typedTextLines: string[];
  setTypedTextLines: (typedTextLines: string[]) => void;
  cursorPositions: number[];
  setCursorPositions: (cursorPositions: number[]) => void;
  cursorLine: number;
  setCursorLine: (cursorLine: number) => void;
  setTypingStatus: (typingStatus: TypingStatus) => void;
};

export function useTyping({
  targetTextLines,
  typedTextLines,
  setTypedTextLines,
  cursorPositions,
  setCursorPositions,
  cursorLine,
  setCursorLine,
  setTypingStatus,
}: useTypingProps) {
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

  useEffect(() => {
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
        setCursorLine(Math.min(targetTextLines.length - 1, cursorLine + 1));
      }

      if (isMoveToPreviousLine(newCursorPositions[cursorLine])) {
        setCursorLine(Math.max(0, cursorLine - 1));
      }

      if (isComplete(newCursorPositions)) {
        setTypingStatus("completed");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [typedTextLines, cursorPositions, cursorLine]);
}
