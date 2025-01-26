import TypingLine from "./TypingLine";
import { useTyping } from "@/hooks/useTyping";
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
  useTyping({
    targetTextLines,
    typedTextLines,
    setTypedTextLines,
    cursorPositions,
    setCursorPositions,
    cursorLine,
    setCursorLine,
    setTypingStatus,
  });
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
