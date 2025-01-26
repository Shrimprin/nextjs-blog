type ProgressProps = {
  targetText: string;
  typedText: string;
};

export default function ProgressDisplay({
  targetText,
  typedText,
}: ProgressProps) {
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
    <>
      <p>
        進捗: {typedTextCount}/{targetTextCount} 文字
      </p>
      <p>精度: {accuracy}%</p>
    </>
  );
}
