import React from "react";
import { render } from "@testing-library/react";
import FreeCommentPanel from "./componets/FreeCommentPanel";
import GradeEvalGraphPanel from "./componets/GradeEvalGraphPanel";
import TopicsPanel from "./componets/TopicsPanel";

describe("test App component", () => {
  // TypeError: Cannot read property 'addEventListener' of nullが出力
  // エラーログを見るにchart.jsの中で参照が見つからずレンダリングされていない模様
  test("renders 五段階評価", () => {
    const freeCommentPanel = render(<GradeEvalGraphPanel />);
    expect(
      freeCommentPanel.getByText("勉強会の満足度を教えてください")
    ).toBeInTheDocument();
  });

  test("renders トピック", () => {
    const freeCommentPanel = render(<TopicsPanel />);
    expect(
      freeCommentPanel.getByText("取り上げてほしいトピック")
    ).toBeInTheDocument();
  });
  test("renders 自由回答", () => {
    const freeCommentPanel = render(<FreeCommentPanel />);
    expect(freeCommentPanel.getByText("自由回答コメント")).toBeInTheDocument();
  });
});
