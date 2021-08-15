import React from 'react';
import BarGraph from '../componets/BarGraph';
import { GraphDataset } from '../data/Presenter'
import { Controller } from '../data/Controller';

interface IState {
  datasets : GraphDataset,
  holdings : Array<number>;
}

class Home extends React.Component<{}, IState> {

  private labels !: Array<Array<string>>;

  private controller_ !: Controller;

  /**
   * コンストラクタ
   * 
   * @param props
   */
  constructor(props: any) {
    super(props);

    this.controller_ = new Controller();

    this.labels = [
      ["", "1"],
      ["", "2"],
      ["", "3"],
      ["", "4"],
      ["", "5"],
    ]

    this.state = {
      datasets : {},//this.initialize_graphdata(),
      holdings : new Array<number>()
    };

    this.onChangeSelection = this.onChangeSelection.bind(this)
  }

  /**
   * マウント完了後のコールバック
   */
  componentDidMount() {

    console.log("LoadGraphData is called")

    this.controller_.fetchQuestionnaireDataAll()
      .then((questionnaireGraphDataset: GraphDataset) => {
        //console.log(questionnaireGraphDataset)
        this.setState({ datasets: questionnaireGraphDataset });
      });

    this.controller_.getLatestHoldingNum()
      .then((latestHoldingNum: number) => {
        let holdings = new Array<number>();
        for(let i = 0; i <= latestHoldingNum; i++){
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
  onChangeSelection(e: any) : void {
    const holding_num = e.target.value
    console.log("onChangeSelection in Home is called")

    this.controller_.fetchQuestionnaireData(holding_num)
      .then((questionnaireGraphDataset: GraphDataset) => {
        console.log(questionnaireGraphDataset)
        this.setState({ datasets: questionnaireGraphDataset });
      });
  }

  render() {
    return (
      <div>
        <div>
          <h1>S2Sアンケート集計結果</h1>
        </div>
        <div>
          開催回 :　 
          <span>
            <select onChange={this.onChangeSelection}>
              { 
                this.state.holdings.map((holding_num, index) => {
                    let item_label = holding_num.toString()
                    if (holding_num === 0) {
                      item_label = "全て"
                    }
                    return <option value={ holding_num } key={index}>{ item_label }</option>
                  })
              }
            </select>
          </span>
        </div>
        <div>
          <h2>勉強会の満足度を教えてください</h2>
          <BarGraph graphData={{labels: this.labels, datasets: this.state.datasets["satisfaction"]}} />
        </div>
        <div>
          <h2>他の人にも今回の発表内容を紹介したいと思いますか？</h2>
          <BarGraph graphData={{labels: this.labels, datasets: this.state.datasets["recommendation"]}} />
        </div>
        <div>
          <h2>また参加したいと思いましたか？</h2>
          <BarGraph graphData={{labels: this.labels, datasets: this.state.datasets["participation"]}} />
        </div>
        <div>
          <h2>発表してみたいと思いましたか？</h2>
          <BarGraph graphData={{labels: this.labels, datasets: this.state.datasets["presentation"]}} />
        </div>
      </div>
    );
  }
}

export default Home;