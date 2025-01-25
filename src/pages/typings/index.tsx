import { NextPage } from "next";
import { useState } from "react";
import TypingArea from "@/components/typing/TypingArea";
import ResetButton from "@/components/typing/ResetButton";
import Progress from "@/components/typing/Progress";
import Result from "@/components/typing/Result";
import Start from "@/components/typing/Start";
import { TypingStatus } from "@/types/typingStatus";

const Typing: NextPage<{}> = () => {
  const targetText = "def fizz_buzz(num)\n  if num % 15 == 0\nend";
  const targetTextLines = targetText.split(/(?<=\n)/);

  // 行頭のスペースは入力済みとする
  const initialCursorPositions = targetTextLines.map((line) =>
    line.indexOf(line.trimStart())
  );
  const [cursorPositions, setCursorPositions] = useState(
    initialCursorPositions
  );
  const initialTypedTexts = targetTextLines.map((_, index) =>
    " ".repeat(initialCursorPositions[index])
  );
  const [typedTexts, setTypedTexts] = useState(initialTypedTexts);
  const [typingStatus, setTypingStatus] = useState<TypingStatus>("idling");
  const [cursorLine, setCursorLine] = useState(0);

  const typedText = typedTexts.slice(0, cursorLine + 1).join("");
  const correctTypedTextCount = typedText
    .split("")
    .filter((char, index) => char === targetText[index]).length;
  const targetTextCount = targetText.length;
  const typedTextCount = typedText.length;
  const accuracy = parseFloat(
    (
      (typedTextCount > 0 ? correctTypedTextCount / typedTextCount : 1) * 100
    ).toFixed(1)
  );

  return (
    <div>
      <h1>タイピング</h1>
      {typingStatus === "idling" ? (
        <Start setTypingStatus={setTypingStatus} />
      ) : typingStatus === "completed" ? (
        <Result
          targetTextLines={targetTextLines}
          typedTexts={typedTexts}
          accuracy={accuracy}
        />
      ) : (
        <>
          <TypingArea
            targetTextLines={targetTextLines}
            typedTexts={typedTexts}
            cursorPositions={cursorPositions}
            setTypedTexts={setTypedTexts}
            setCursorPositions={setCursorPositions}
            cursorLine={cursorLine}
            setCursorLine={setCursorLine}
            setTypingStatus={setTypingStatus}
          />
          <ResetButton
            setCursorLine={setCursorLine}
            setTypedTexts={setTypedTexts}
            setCursorPositions={setCursorPositions}
            initialTypedTexts={initialTypedTexts}
            initialCursorPositions={initialCursorPositions}
            setTypingStatus={setTypingStatus}
          />
          <Progress
            typedTextCount={typedTextCount}
            targetTextCount={targetTextCount}
            accuracy={accuracy}
          />
        </>
      )}
    </div>
  );
};

export default Typing;
