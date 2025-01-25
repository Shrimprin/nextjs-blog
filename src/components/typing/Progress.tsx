type ProgressProps = {
  typedTextCount: number;
  targetTextCount: number;
  accuracy: number;
};

export default function ProgressDisplay({
  typedTextCount,
  targetTextCount,
  accuracy,
}: ProgressProps) {
  return (
    <>
      <p>
        進捗: {typedTextCount}/{targetTextCount} 文字
      </p>
      <p>精度: {accuracy}%</p>
    </>
  );
}
