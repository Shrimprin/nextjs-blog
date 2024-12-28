import { render, screen } from "@testing-library/react";
import Home from "@/pages/posts";

describe("Post Index Page", () => {
  const allPostsData = [
    { id: 1, title: "First Post", date: "2024-01-01" },
    { id: 2, title: "Second Post", date: "2024-01-02" },
    { id: 3, title: "Third Post", date: "2024-01-03" },
  ];

  beforeEach(() => {
    render(<Home allPostsData={allPostsData} />);
  });

  it("全ての投稿が表示されている", () => {
    allPostsData.forEach(({ title, date }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(date)).toBeInTheDocument();
    });
  });

  it("戻るリンクが存在する", () => {
    const link = screen.getByRole("link", { name: "戻る" });
    expect(link).toBeInTheDocument();
  });
});
