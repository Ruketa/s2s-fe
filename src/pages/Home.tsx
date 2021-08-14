import React from 'react';
import BarGraph from '../componets/BarGraph';
import { Gateway } from '../controller/Gateway';
import { DataLoader }  from '../controller/DataLoader';

interface IState {
  datasets : {[key: string]: Array<{
    data: Array<number>;
    backgroundColor: string;
    label: string;
  }>} ,
  holdings : Array<number>;
}

class Home extends React.Component<{}, IState> {

  private labels !: Array<Array<string>>;

  private dataloader !: DataLoader;

  private initialize_graphdata(): any{

    const eval_init = [0, 0, 0, 0, 0]

    return {
      'satisfaction': [{
        data: Array.from(eval_init),
        backgroundColor: "rgba(10, 144, 255, 1)",
        label: '満足度',
      }],
      'recommendation':[{
        data: Array.from(eval_init),
        backgroundColor: "rgba(10, 144, 255, 1)",
        label: 'おススメ度',
      }],
      'participation':[{
        data: Array.from(eval_init),
        backgroundColor: "rgba(10, 144, 255, 1)",
        label: 'また参加したい度',
      }],
      'presentation':[{
        data: Array.from(eval_init),
        backgroundColor: "rgba(10, 144, 255, 1)",
        label: '発表したい度',
      }],
    }
  }

  constructor(props: any) {
    super(props);

    this.dataloader = new DataLoader(new Gateway("http://localhost", 8000, 1000));

    this.labels = [
      ["", "1"],
      ["", "2"],
      ["", "3"],
      ["", "4"],
      ["", "5"],
    ]

    this.state = {
      datasets : this.initialize_graphdata(),
      holdings : new Array<number>()
    };
  }

  public componentDidMount() {

    console.log("LoadGraphData is called")

    this.dataloader.fetchQuestionnaireDataAll().then(questionnaires => {
      let new_datasets = this.initialize_graphdata();
      questionnaires.forEach(q_data => {
        new_datasets["satisfaction"][0]["data"][q_data["satisfaction_level"]-1] += 1;
        new_datasets["recommendation"][0]["data"][q_data["recommendation_level"]-1] += 1;
        new_datasets["participation"][0]["data"][q_data["participation_level"]-1] += 1;
        new_datasets["presentation"][0]["data"][q_data["presentation_level"]-1] += 1;
      });

      let hgs = new Array<number>();
      const holding_num = questionnaires.slice(-1)[0]["holding_num"]
      for(let i = 0; i <= holding_num; i++){
        hgs.push(i);
      }

      this.setState({
        datasets: new_datasets,
        holdings: hgs
      });
    });
  }

  public onChangeSelection(e: any) : void {
    const holding_num = e.target.value
    console.log("onChangeSelection is called")
    this.dataloader.fetchQuestionnaireData(holding_num).then(questionnaires => {
      let new_datasets = this.initialize_graphdata();
      questionnaires.forEach(q_data => {
        new_datasets["satisfaction"][0]["data"][q_data["satisfaction_level"]-1] += 1;
        new_datasets["recommendation"][0]["data"][q_data["recommendation_level"]-1] += 1;
        new_datasets["participation"][0]["data"][q_data["participation_level"]-1] += 1;
        new_datasets["presentation"][0]["data"][q_data["presentation_level"]-1] += 1;
      });

      this.setState({
        datasets: new_datasets,
      });
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