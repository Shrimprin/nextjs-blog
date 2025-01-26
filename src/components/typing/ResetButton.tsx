import { TypingStatus } from "@/types/typingStatus";

type ResetButtonProps = {
  setCursorLine: (cursorLine: number) => void;
  setTypedTextLines: (typedTexts: string[]) => void;
  setCursorPositions: (cursorPositions: number[]) => void;
  initialTypedTextLines: string[];
  initialCursorPositions: number[];
  setTypingStatus: (typingStatus: TypingStatus) => void;
};

export default function ResetButton({
  setCursorLine,
  setTypedTextLines,
  setCursorPositions,
  initialTypedTextLines,
  initialCursorPositions,
  setTypingStatus,
}: ResetButtonProps) {
  return (
    <>
      <button
        onClick={() => {
          setCursorLine(0);
          setTypedTextLines(initialTypedTextLines);
          setCursorPositions(initialCursorPositions);
          setTypingStatus("idling");
        }}
      >
        リセット
      </button>
    </>
  );
}
