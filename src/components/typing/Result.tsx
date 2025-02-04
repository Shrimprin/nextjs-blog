import TypingLine from "./TypingLine";
import Progress from "./Progress";

type ResultProps = {
  targetTextLines: string[];
  typedTextLines: string[];
};

export default function Result({
  targetTextLines,
  typedTextLines,
}: ResultProps) {
  return (
    <>
      <h2>結果</h2>
      <Progress
        typedText={typedTextLines.join("")}
        targetText={targetTextLines.join("")}
      />
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
