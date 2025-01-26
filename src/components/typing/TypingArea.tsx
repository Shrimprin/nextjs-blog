import TypingLine from "./TypingLine";
import { TypingStatus } from "@/types/typingStatus";

type TypingAreaProps = {
  targetTextLines: string[];
  typedTextLines: string[];
  cursorPositions: number[];
  cursorLine: number;
};

export default function TypingArea({
  targetTextLines,
  typedTextLines,
  cursorPositions,
  cursorLine,
}: TypingAreaProps) {
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
