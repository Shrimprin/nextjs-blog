import { render, screen } from "@testing-library/react";
import Home from "@/pages/";

describe("Home Page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("First Postページへのリンクが存在する", () => {
    const link = screen.getByRole("link", {
      name: "First Post -> プラクティス「ルーティングとページの作成」で作成したページへ",
    });
    expect(link).toBeInTheDocument();
  });

  it("All Postsページへのリンクが存在する", () => {
    const link = screen.getByRole("link", {
      name: "All Posts -> プラクティス「プリレンダリングとデータの取得方法を理解する」で作成したページへ",
    });
    expect(link).toBeInTheDocument();
  });
});
