import { QuestionnaireDatasetType } from './Model/QuestionnaireDataset';

// グラフデータの定義
export type GraphDataset = {
  [key: string]: Array<{
    data: Array<number>;
    backgroundColor: string;
    label: string;
  }>
}; 
 
export class Presenter {

  /**
   * グラフデータの初期化
   * @return {Array}
   */
  private initialize_graphdata(): GraphDataset{

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

  public makeGraphDataset(questionnaireDataset: QuestionnaireDatasetType): GraphDataset {
    let graphDataset = this.initialize_graphdata()

    Object.keys(questionnaireDataset).forEach((key: string) => {
      const questionnaires = questionnaireDataset[key]
      let satisfaction_data = graphDataset["satisfaction"][0]["data"]
      let recommendation_data = graphDataset["recommendation"][0]["data"]
      let participation_data = graphDataset["participation"][0]["data"]
      let presentation_data = graphDataset["presentation"][0]["data"]
      questionnaires.forEach(questionnaire => {
        satisfaction_data[questionnaire.satisfactionLevel-1] += 1;
        recommendation_data[questionnaire.recommendationLevel-1] += 1;
        participation_data[questionnaire.participationLevel-1] += 1;
        presentation_data[questionnaire.presentationLevel-1] += 1;
      });
    }) 

    return graphDataset
  }
}