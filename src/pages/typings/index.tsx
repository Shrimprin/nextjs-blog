import { NextPage } from "next";
import { useState } from "react";
import TypingArea from "@/components/typing/TypingArea";
import ResetButton from "@/components/typing/ResetButton";
import Progress from "@/components/typing/Progress";
import Result from "@/components/typing/Result";
import Start from "@/components/typing/Start";
import { useTyping } from "@/hooks/useTyping";

const Typing: NextPage<{}> = () => {
  const targetText = "def fizz_buzz(num)\n  if num % 15 == 0\nend";
  const targetTextLines = targetText.split(/(?<=\n)/);
  const {
    typedTextLines,
    cursorPositions,
    cursorLine,
    typingStatus,
    startTyping,
    resetTyping,
  } = useTyping({
    targetTextLines,
  });

  const typedText = typedTextLines.slice(0, cursorLine + 1).join("");
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
        <Start startTyping={startTyping} />
      ) : typingStatus === "completed" ? (
        <Result
          targetTextLines={targetTextLines}
          typedTextLines={typedTextLines}
          accuracy={accuracy}
        />
      ) : (
        <>
          <TypingArea
            targetTextLines={targetTextLines}
            typedTextLines={typedTextLines}
            cursorPositions={cursorPositions}
            cursorLine={cursorLine}
          />
          <ResetButton resetTyping={resetTyping} />
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
