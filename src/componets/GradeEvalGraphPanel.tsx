import React from "react";

import BarGraph from "./BarGraph";

import { Controller } from "../data/Controller";
import { GraphDataset } from "../data/Presenter";
import { Presentation } from '../data/Model/Presentation'

interface IGradeEvalGraphPanelProps {}

interface IGradeEvalGraphPanelState {
  datasets: GraphDataset;
  holdings: Array<number>;
  presentation: Array<Presentation>;
}

class GradeEvalGraphPanel extends React.Component<
  IGradeEvalGraphPanelProps,
  IGradeEvalGraphPanelState
> {
  private readonly labels = [
    ["", "1"],
    ["", "2"],
    ["", "3"],
    ["", "4"],
    ["", "5"],
  ];

  private readonly barGraphList = [
    { question: "勉強会の満足度を教えてください", datasets: "satisfaction" },
    {
      question: "他の人にも今回の発表内容を紹介したいと思いますか？",
      datasets: "recommendation",
    },
    { question: "また参加したいと思いましたか？", datasets: "participation" },
    { question: "発表してみたいと思いましたか？", datasets: "presentation" },
  ];

  private controller_!: Controller;

  /**
   * コンストラクタ
   *
   * @param props プロパティ
   */
  constructor(props: IGradeEvalGraphPanelProps) {
    super(props);

    this.controller_ = new Controller();

    this.state = {
      datasets: {},
      holdings: new Array<number>(),
      presentation: Array<Presentation>(),
    };

    this.onChangeSelection = this.onChangeSelection.bind(this);
  }

  /**
   * マウント完了後のコールバック
   */
  componentDidMount() {
    // アンケート情報
    this.controller_
      .fetchQuestionnaireDataAll()
      .then((questionnaireGraphDataset: GraphDataset) => {
        this.setState({ datasets: questionnaireGraphDataset });
      });

    this.controller_.getLatestHoldingNum().then((latestHoldingNum: number) => {
      let holdings = new Array<number>();
      for (let i = 0; i <= latestHoldingNum; i++) {
        holdings.push(i);
      }
      this.setState({ holdings: holdings });
    });
  }

  /**
   * セレクション変更のイベントハンドラ
   *
   * @param e イベント
   */
  onChangeSelection(e: any): void {
    const holding_num = e.target.value;

    this.controller_
      .fetchQuestionnaireData(holding_num)
      .then((questionnaireGraphDataset: GraphDataset) => {
        this.setState({ datasets: questionnaireGraphDataset });
      });

    // 発表者情報
    this.controller_.fetchPresenterInfo(holding_num)
      .then((presenterInfo: Array<Presentation>) => {
        this.setState({ presentation: presenterInfo });
      })
  }

  flexBoxStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
  };
  flexItemStyle: React.CSSProperties = {
    display: "flex",
    width: "50%",
    flexDirection: "column",
    fontSize: "small",
  };
  presentationContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  };
  presentationContainerItemStyle: React.CSSProperties = {
    display: "flex",
    marginLeft: "10px",
    marginRight: "10px",
  };


  render() {
    return (
      <>
        <div>
          <div>
            開催回 :
            <span>
              <select onChange={this.onChangeSelection}>
                {this.state.holdings.map((holding_num, index) => {
                  let item_label = holding_num === 0 ? "全て" : holding_num.toString()
                  return (
                    <option value={holding_num} key={index}>
                      {item_label}
                    </option>
                  );
                })}
              </select>
            </span>
          </div>
          <div>
            {this.state.presentation.map((presentation, index) => {
              return (
                <div style={this.presentationContainerStyle} key={index}>
                  <p style={this.presentationContainerItemStyle}>発表者：{presentation.name}</p>
                  <p style={this.presentationContainerItemStyle}>所属：{presentation.division}</p>
                  <p style={this.presentationContainerItemStyle}>発表タイトル：{presentation.presentationTitle}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div style={this.flexBoxStyle}>
          {this.barGraphList.map((barGraphItem, index) => {
            return (
              <>
                <div style={this.flexItemStyle} key={"bargraph-div-" + index}>
                  <h2 style={{ marginBottom: "auto" }} key={"bargraph-title-" + index}>
                    {barGraphItem.question}
                  </h2>
                  <BarGraph
                    graphData={{
                      labels: this.labels,
                      datasets: this.state.datasets[`${barGraphItem.datasets}`],
                    }}
                    key={"bargraph-" + { index }}
                  />
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  }
}

export default GradeEvalGraphPanel;
