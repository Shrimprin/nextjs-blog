import { act, renderHook } from "@testing-library/react";
import { useCounter } from "@/hooks/useCounter";

describe("初期値", () => {
  it("カウンターが初期値であること", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });
});

describe("increment", () => {
  it("カウンターが増加すること", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
