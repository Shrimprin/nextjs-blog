import { render, screen } from "@testing-library/react";
import FirstPost from "@/pages/posts/first-post";

describe("First Post Page", () => {
  beforeEach(() => {
    render(<FirstPost />);
  });

  it("タイトルが存在する", () => {
    const title = screen.getByRole("heading", { name: "Hello, first post!" });
    expect(title).toBeInTheDocument();
  });

  it("猫の画像が存在する", () => {
    const image = screen.getByRole("img", { name: "猫" });
    expect(image).toBeInTheDocument();
  });

  it("戻るリンクが存在する", () => {
    const link = screen.getByRole("link", { name: "戻る" });
    expect(link).toBeInTheDocument();
  });
});
