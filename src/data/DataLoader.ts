import { Gateway } from "./Gateway";
import { Questionnaire } from "./Model/Questionnaire";
import { QuestionnaireDataset } from "./Model/QuestionnaireDataset";
import { Presentation } from "./Model/Presentation";

export class DataLoader {

  private gateway_!: Gateway;

  private questionnaireDataCache_ !: QuestionnaireDataset

  constructor( gateway: Gateway ) {
    this.gateway_ = gateway;
  }

  /**
   * アンケートデータを全て取得する
   */
  public fetchQuestionnaireDataAll(noCache: boolean = false): Promise<QuestionnaireDataset> {
    // return cache
    if ( !noCache && this.questionnaireDataCache_ ) {
      return Promise.resolve( this.questionnaireDataCache_ );
    }

    // fetch data
    return this.gateway_.fetch("/api/questionnaire")
      .then( (response: any) => {
        const dataset = new QuestionnaireDataset();
        // アンケートデータセットの作成
        response.forEach( (item: any) => {
          const q = new Questionnaire(
            item.satisfaction_level,
            item.recommendation_level,
            item.participation_level,
            item.presentation_level,
            item.topics,
            item.free_comment );
          dataset.add(item.holding_num, q);
        });

        this.questionnaireDataCache_ = dataset;         

        return dataset;
      });
  }

  /**
   * 指定開催回のアンケートデータを取得する
   * 
   * @param  holding_num 開催回番号
   * @return アンケートデータ
   */
  public fetchQuestionnaireData(holding_num: number): Promise<Array<Questionnaire>> {
    return this.gateway_.fetch("/api/questionnaire/" + holding_num)
      .then( (response: any) => {
        let questionnaires = new Array<Questionnaire>();
        // アンケートデータセットの作成
        response.forEach( (item: any) => {
          const q = new Questionnaire(
            item.satisfaction_level,
            item.recommendation_level,
            item.participation_level,
            item.presentation_level,
            item.topics,
            item.free_comment );
          questionnaires.push(q);
        });

        return questionnaires;
      });
  }

  /**
   * 最新の開催回を取得する
   * 
   * @return 開催回
   */
  public getLatestHoldingNum(): Promise<number> {
    return this.fetchQuestionnaireDataAll()
      .then( (dataset: QuestionnaireDataset) => {
        return dataset.getLatestHoldingNum();
      });
  }

  /**
   * 発表者情報を取得する
   * 
   * @param  holding_num 開催回番号
   * @return アンケートデータ
   */
  public fetchPresenterInfo(holding_num: number): Promise<Array<Presentation>> {
    const resource_base = "/api/presenter/";
    const resource = holding_num === 0 ? resource_base : resource_base + holding_num;
    return this.gateway_.fetch(resource)
      .then((response: any) => {
        let presenters = new Array<Presentation>();
        // 発表者情報の作成
        response.forEach((item: any) => {
          const p = new Presentation(
            item.Presenter,
            item.Division,
            item.Presentation_title,
          );
          presenters.push(p);
        });

        return presenters;
      })
      .catch((error: any) => {
        throw new Error(error);
      })
  }

}