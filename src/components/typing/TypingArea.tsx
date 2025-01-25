import { useEffect } from "react";
import TypingLine from "./TypingLine";
import { TypingStatus } from "@/types/typingStatus";

type TypingAreaProps = {
  targetTextLines: string[];
  typedTexts: string[];
  setTypedTexts: (typedTexts: string[]) => void;
  cursorPositions: number[];
  setCursorPositions: (cursorPositions: number[]) => void;
  cursorLine: number;
  setCursorLine: (cursorLine: number) => void;
  setTypingStatus: (typingStatus: TypingStatus) => void;
};

export default function TypingArea({
  targetTextLines,
  typedTexts,
  setTypedTexts,
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
    setTypedTexts(newInputs);
    setCursorPositions(newPositions);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newTypedTexts = [...typedTexts];
      const newCursorPositions = [...cursorPositions];

      if (e.key.length === 1) {
        newTypedTexts[cursorLine] += e.key;
        newCursorPositions[cursorLine] = Math.min(
          targetTextLines[cursorLine].length,
          cursorPositions[cursorLine] + 1
        );
      } else if (e.key === "Backspace") {
        newTypedTexts[cursorLine] = typedTexts[cursorLine].slice(0, -1);
        newCursorPositions[cursorLine] = Math.max(
          0,
          cursorPositions[cursorLine] - 1
        );
      } else if (e.key === "Enter") {
        newTypedTexts[cursorLine] += "\n";
        newCursorPositions[cursorLine] = cursorPositions[cursorLine] + 1;
      } else if (e.key === "Tab") {
        e.preventDefault();
        return;
      }

      updateInputsAndPositions(newTypedTexts, newCursorPositions);

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
  }, [typedTexts, cursorPositions, cursorLine]);

  return (
    <>
      {targetTextLines.map((targetTextLine, index) => (
        <TypingLine
          key={index}
          typedText={typedTexts[index]}
          targetTextLine={targetTextLine}
          cursorPosition={cursorPositions[index]}
          isActive={cursorLine >= index}
        />
      ))}
    </>
  );
}
