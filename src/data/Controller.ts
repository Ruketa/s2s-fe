import { DataLoader } from "./DataLoader";
import { Gateway } from "./Gateway";
import { Questionnaire } from "./Model/Questionnaire";
import { QuestionnaireDataset } from "./Model/QuestionnaireDataset";
import { GraphDataset, Presenter } from "./Presenter";
import { Presentation } from "./Model/Presentation";

export class Controller{

  private dataloader_ !: DataLoader;

  private presenter_ !: Presenter;

  /**
   * コンストラクタ
   */ 
  constructor(){
    const gateway = new Gateway("http://localhost", 8000, 1000);
    this.dataloader_ = new DataLoader(gateway);
    this.presenter_ = new Presenter();
  }

  /**
   * アンケートデータを全て取得
   * 
   * @return グラフ表示用データセット
   */
  public fetchQuestionnaireDataAll(): Promise<GraphDataset> {
    return this.dataloader_.fetchQuestionnaireDataAll(true)
      .then( (questionnaireDataset: QuestionnaireDataset) => {
        const graphDataset = this.presenter_.makeGraphDataset(questionnaireDataset.getAll())
        return graphDataset;
      });
  }

  /**
   * アンケートデータを取得
   * 
   * @return グラフ表示用データセット
   */
  public fetchQuestionnaireData(holding_num: number): Promise<GraphDataset> {
    // うーん。。。いまいち。。。
    return this.dataloader_.fetchQuestionnaireData(holding_num)
      .then( (questionnaires: Array<Questionnaire>) => {
        const questionnaireDataset = new QuestionnaireDataset();
        questionnaires.forEach( (questionnaire: Questionnaire) => {
          questionnaireDataset.add(holding_num, questionnaire);
        });
        const graphDataset = this.presenter_.makeGraphDataset(questionnaireDataset.getAll());
        return graphDataset;
      });
  }

  /**
   * アンケートデータ(トピック情報)を取得
   * 
   * @return トピック情報
   */
  public fetchTopicInfo(): Promise<{[key: string]: Array<string>}> {
    return this.dataloader_.fetchQuestionnaireDataAll(true)
      .then( (questionnaireDataset: QuestionnaireDataset) => {
        const topics = this.presenter_.makeTopicList(questionnaireDataset.getAll())
        return topics;
      });
  }

  /**
   * アンケートデータ(コメント情報)を取得
   * 
   * @return コメント情報
   */
  public fetchFreeCommentInfo(): Promise<{[key: string]: Array<string>}> {
    return this.dataloader_.fetchQuestionnaireDataAll(true)
      .then( (questionnaireDataset: QuestionnaireDataset) => {
        const comments = this.presenter_.makeCommentList(questionnaireDataset.getAll())
        return comments;
      });
  }


  /**
   * 最新の開催回番号を取得
   * 
   * @return 開催回番号
   */
  public getLatestHoldingNum(): Promise<number> {
    return this.dataloader_.getLatestHoldingNum();
  }

  /**
   * 発表者情報を種痘
   * 
   * @return 発表者情報
   */
  public fetchPresenterInfo(holding_num: number): Promise<Array<Presentation>> {
    return this.dataloader_.fetchPresenterInfo(holding_num);
  }
}