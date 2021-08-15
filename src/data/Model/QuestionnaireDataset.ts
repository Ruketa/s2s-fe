import { Questionnaire } from './Questionnaire';

export type QuestionnaireDatasetType = {
    [key: string]: Array<Questionnaire>;
}

/**
 * アンケートデータセットクラス
 */
export class QuestionnaireDataset {

  /**
   * アンケートデータセット
   */
  private questionnaireDataset_ !: QuestionnaireDatasetType;

  /**
   * コンストラクタ
   */
  constructor() {
    this.questionnaireDataset_ = {};
  }

  /**
   * アンケートデータセットを追加する
   * 
   * @param holding_num 開催回
   * @param questionnaire アンケートデータ
   */
  add(holding_num: number, questionnaire: Questionnaire): void {
    if (!this.questionnaireDataset_[holding_num]) {
      this.questionnaireDataset_[holding_num] = [];
    }
    this.questionnaireDataset_[holding_num].push(questionnaire);
  }

  /**
   * アンケートデータセットからアンケートデータを取得する
   * 
   * @param holding_num 開催回
   * @return アンケートデータ
   * @throw 例外
   */
  get(holding_num: number): Array<Questionnaire> {
    if (!this.questionnaireDataset_[holding_num]) {
      throw new Error('holding_num is not found.');
    }
    return this.questionnaireDataset_[holding_num];
  }

  /**
   * アンケートデータセットからアンケートデータを取得する
   * 
   * @return アンケートデータセット
   * @throw 例外
   */
  getAll(): QuestionnaireDatasetType {
    return this.questionnaireDataset_;
  }

  /**
   * 最新の開催回を取得する
   * 
   * @return 最新の開催回
   * @throw 例外
   */
  getLatestHoldingNum(): number {
    let latest: number = 0;
    for (let holding_num in this.questionnaireDataset_) {
      if (parseInt(holding_num) > latest) {
        latest = parseInt(holding_num);
      }
    }
    return latest;
  }

}

