import TypingLine from "./TypingLine";

type ResultProps = {
  targetTextLines: string[];
  typedTexts: string[];
  accuracy: number;
};

export default function Result({
  targetTextLines,
  typedTexts,
  accuracy,
}: ResultProps) {
  return (
    <>
      <h2>結果</h2>
      <p>
        進捗: {typedTexts.join("").length} / {targetTextLines.join("").length}
      </p>
      <p>精度: {accuracy}%</p>
      <div>
        {targetTextLines.map((targetTextLine, index) => (
          <TypingLine
            key={index}
            typedText={typedTexts[index]}
            targetTextLine={targetTextLine}
            cursorPosition={targetTextLine.length}
            isActive={true}
          />
        ))}
      </div>
    </>
  );
}
