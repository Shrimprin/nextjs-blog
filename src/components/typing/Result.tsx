import TypingLine from "./TypingLine";

type ResultProps = {
  targetTextLines: string[];
  typedTextLines: string[];
  accuracy: number;
};

export default function Result({
  targetTextLines,
  typedTextLines,
  accuracy,
}: ResultProps) {
  return (
    <>
      <h2>結果</h2>
      <p>
        進捗: {typedTextLines.join("").length} /{" "}
        {targetTextLines.join("").length}
      </p>
      <p>精度: {accuracy}%</p>
      <div>
        {targetTextLines.map((targetTextLine, index) => (
          <TypingLine
            key={index}
            typedText={typedTextLines[index]}
            targetTextLine={targetTextLine}
            cursorPosition={targetTextLine.length}
            isActive={true}
          />
        ))}
      </div>
    </>
  );
}
