import { NextPage } from "next";
import Link from "next/link";
import TypingArea from "@/components/typing/TypingArea";
import ResetButton from "@/components/typing/ResetButton";
import Progress from "@/components/typing/Progress";
import Result from "@/components/typing/Result";
import Start from "@/components/typing/Start";
import { useTyping } from "@/hooks/useTyping";

const Typing: NextPage<{}> = () => {
  const targetText = "def hello_world\n  puts 'Hello, World!'\nend\n";
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

  return (
    <div>
      <h1>タイピング</h1>
      <Link href="/">戻る</Link>
      {typingStatus === "idling" ? (
        <Start startTyping={startTyping} />
      ) : typingStatus === "completed" ? (
        <Result
          targetTextLines={targetTextLines}
          typedTextLines={typedTextLines}
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
            typedText={typedTextLines.slice(0, cursorLine + 1).join("")}
            targetText={targetText}
          />
        </>
      )}
    </div>
  );
};

export default Typing;
