import { act, fireEvent, renderHook } from "@testing-library/react";
import { useTypingHandler } from "@/hooks/useTypingHandler";

describe("useTypingHandler", () => {
  const targetTextLines = [
    "def hello_world\n",
    "  puts 'Hello, World!'\n",
    "end\n",
  ];

  describe("初期値", () => {
    it("行頭のスペースは入力済みであること", () => {
      const { result } = renderHook(() =>
        useTypingHandler({ targetTextLines })
      );
      expect(result.current.typedTextLines).toEqual(["", "  ", ""]);
      expect(result.current.cursorPositions).toEqual([0, 2, 0]);
    });

    it("カーソル行が1行目であること", () => {
      const { result } = renderHook(() =>
        useTypingHandler({ targetTextLines })
      );
      expect(result.current.cursorLine).toBe(0);
    });

    it("typingStatus が idling であること", () => {
      const { result } = renderHook(() =>
        useTypingHandler({ targetTextLines })
      );
      expect(result.current.typingStatus).toBe("idling");
    });

    it("キー入力してもタイピングできないこと", () => {
      const { result } = renderHook(() =>
        useTypingHandler({ targetTextLines })
      );
      act(() => {
        fireEvent.keyDown(window, { key: "A" });
      });
      expect(result.current.typedTextLines).toEqual(["", "  ", ""]);
      expect(result.current.cursorPositions).toEqual([0, 2, 0]);
      expect(result.current.cursorLine).toBe(0);
    });

    it("タイピング開始できること", () => {
      const { result } = renderHook(() =>
        useTypingHandler({ targetTextLines })
      );
      act(() => {
        result.current.startTyping();
      });
      expect(result.current.typingStatus).toBe("typing");
    });
  });

  describe("タイピング中", () => {
    it("キー入力できること", () => {
      const { result } = renderHook(() =>
        useTypingHandler({ targetTextLines })
      );
      act(() => {
        result.current.startTyping();
      });
      act(() => {
        fireEvent.keyDown(window, { key: "d" });
      });
      expect(result.current.typedTextLines).toEqual(["d", "  ", ""]);
      expect(result.current.cursorPositions).toEqual([1, 2, 0]);
    });

    it("エンターキーを入力できること", () => {
      const { result } = renderHook(() =>
        useTypingHandler({ targetTextLines })
      );
      act(() => {
        result.current.startTyping();
      });
      act(() => {
        fireEvent.keyDown(window, { key: "Enter" });
      });
      expect(result.current.typedTextLines).toEqual(["\n", "  ", ""]);
      expect(result.current.cursorPositions).toEqual([1, 2, 0]);
    });

    it("バックスペースキーで入力を取り消せること", () => {
      const { result } = renderHook(() =>
        useTypingHandler({ targetTextLines })
      );
      act(() => {
        result.current.startTyping();
      });
      act(() => {
        fireEvent.keyDown(window, { key: "d" });
      });
      expect(result.current.typedTextLines).toEqual(["d", "  ", ""]);
      expect(result.current.cursorPositions).toEqual([1, 2, 0]);
      act(() => {
        fireEvent.keyDown(window, { key: "Backspace" });
      });
      expect(result.current.typedTextLines).toEqual(["", "  ", ""]);
      expect(result.current.cursorPositions).toEqual([0, 2, 0]);
    });

    it("タブキーを入力できないこと", () => {
      const { result } = renderHook(() =>
        useTypingHandler({ targetTextLines })
      );
      act(() => {
        result.current.startTyping();
      });
      act(() => {
        fireEvent.keyDown(window, { key: "Tab" });
      });
      expect(result.current.typedTextLines).toEqual(["", "  ", ""]);
      expect(result.current.cursorPositions).toEqual([0, 2, 0]);
    });

    it("改行できること", () => {
      const { result } = renderHook(() =>
        useTypingHandler({ targetTextLines })
      );
      act(() => {
        result.current.startTyping();
      });
      const keys = "def hello_world".split("");
      keys.forEach((key) => {
        act(() => {
          fireEvent.keyDown(window, { key });
        });
      });
      expect(result.current.typedTextLines).toEqual([
        "def hello_world",
        "  ",
        "",
      ]);
      expect(result.current.cursorPositions).toEqual([15, 2, 0]);
      expect(result.current.cursorLine).toBe(0);

      act(() => {
        fireEvent.keyDown(window, { key: "Enter" });
      });
      expect(result.current.typedTextLines).toEqual([
        "def hello_world\n",
        "  ",
        "",
      ]);
      expect(result.current.cursorPositions).toEqual([16, 2, 0]);
      expect(result.current.cursorLine).toBe(1);
    });

    it("バックスペースキーで改行を取り消せること", () => {
      const { result } = renderHook(() =>
        useTypingHandler({ targetTextLines })
      );
      act(() => {
        result.current.startTyping();
      });
      const keys = "def hello_world\n".split("");
      keys.forEach((key) => {
        act(() => {
          fireEvent.keyDown(window, { key });
        });
      });
      expect(result.current.typedTextLines).toEqual([
        "def hello_world\n",
        "  ",
        "",
      ]);
      expect(result.current.cursorPositions).toEqual([16, 2, 0]);
      expect(result.current.cursorLine).toBe(1);

      // スペースがあるため3回バックスペースキーを入力する
      [...Array(3)].forEach(() => {
        act(() => {
          fireEvent.keyDown(window, { key: "Backspace" });
        });
      });
      expect(result.current.typedTextLines).toEqual([
        "def hello_world",
        "",
        "",
      ]);
      expect(result.current.cursorPositions).toEqual([15, 0, 0]);
      expect(result.current.cursorLine).toBe(0);
    });

    it("タイピング完了できること", () => {
      const { result } = renderHook(() =>
        useTypingHandler({ targetTextLines })
      );
      act(() => {
        result.current.startTyping();
      });
      const lines = ["def hello_world", "puts 'Hello, World!'", "end"];
      lines.forEach((line) => {
        const keys = line.split("");
        keys.forEach((key) => {
          act(() => {
            fireEvent.keyDown(window, { key });
          });
        });
        act(() => {
          fireEvent.keyDown(window, { key: "Enter" });
        });
      });
      expect(result.current.typedTextLines).toEqual([
        "def hello_world\n",
        "  puts 'Hello, World!'\n",
        "end\n",
      ]);
      expect(result.current.cursorPositions).toEqual([16, 23, 4]);
      expect(result.current.cursorLine).toBe(2);
      expect(result.current.typingStatus).toBe("completed");
    });

    it("リセットできること", () => {
      const { result } = renderHook(() =>
        useTypingHandler({ targetTextLines })
      );
      act(() => {
        result.current.startTyping();
      });
      const keys = "def hello_world".split("");
      keys.forEach((key) => {
        act(() => {
          fireEvent.keyDown(window, { key });
        });
      });
      act(() => {
        fireEvent.keyDown(window, { key: "Enter" });
      });
      expect(result.current.typedTextLines).toEqual([
        "def hello_world\n",
        "  ",
        "",
      ]);
      expect(result.current.cursorPositions).toEqual([16, 2, 0]);
      expect(result.current.cursorLine).toBe(1);
      expect(result.current.typingStatus).toBe("typing");

      act(() => {
        result.current.resetTyping();
      });
      expect(result.current.typedTextLines).toEqual(["", "  ", ""]);
      expect(result.current.cursorPositions).toEqual([0, 2, 0]);
      expect(result.current.cursorLine).toBe(0);
      expect(result.current.typingStatus).toBe("idling");
    });
  });
});
