import { TypingStatus } from "@/types/typingStatus";

type ResetButtonProps = {
  setCursorLine: (cursorLine: number) => void;
  setTypedTexts: (typedTexts: string[]) => void;
  setCursorPositions: (cursorPositions: number[]) => void;
  initialTypedTexts: string[];
  initialCursorPositions: number[];
  setTypingStatus: (typingStatus: TypingStatus) => void;
};

export default function ResetButton({
  setCursorLine,
  setTypedTexts,
  setCursorPositions,
  initialTypedTexts,
  initialCursorPositions,
  setTypingStatus,
}: ResetButtonProps) {
  return (
    <>
      <button
        onClick={() => {
          setCursorLine(0);
          setTypedTexts(initialTypedTexts);
          setCursorPositions(initialCursorPositions);
          setTypingStatus("idling");
        }}
      >
        リセット
      </button>
    </>
  );
}
