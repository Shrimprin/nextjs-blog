type ResetButtonProps = {
  resetTyping: () => void;
};

export default function ResetButton({ resetTyping }: ResetButtonProps) {
  return (
    <>
      <button onClick={resetTyping}>リセット</button>
    </>
  );
}
