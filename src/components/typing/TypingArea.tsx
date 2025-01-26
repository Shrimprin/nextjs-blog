import { useEffect } from "react";
import TypingLine from "./TypingLine";
import { TypingStatus } from "@/types/typingStatus";

type TypingAreaProps = {
  targetTextLines: string[];
  typedTextLines: string[];
  setTypedTextLines: (typedTextLines: string[]) => void;
  cursorPositions: number[];
  setCursorPositions: (cursorPositions: number[]) => void;
  cursorLine: number;
  setCursorLine: (cursorLine: number) => void;
  setTypingStatus: (typingStatus: TypingStatus) => void;
};

export default function TypingArea({
  targetTextLines,
  typedTextLines,
  setTypedTextLines,
  cursorPositions,
  setCursorPositions,
  cursorLine,
  setCursorLine,
  setTypingStatus,
}: TypingAreaProps) {
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

  const updateInputsAndPositions = (
    newInputs: string[],
    newPositions: number[]
  ) => {
    setTypedTextLines(newInputs);
    setCursorPositions(newPositions);
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

      updateInputsAndPositions(newTypedTextLines, newCursorPositions);

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

  return (
    <>
      {targetTextLines.map((targetTextLine, index) => (
        <TypingLine
          key={index}
          typedText={typedTextLines[index]}
          targetTextLine={targetTextLine}
          cursorPosition={cursorPositions[index]}
          isActive={cursorLine >= index}
        />
      ))}
    </>
  );
}
