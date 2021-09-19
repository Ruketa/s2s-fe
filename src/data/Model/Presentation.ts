export class Presentation {

  private name_ !: string;

  private division_ !: string;

  private presentationTitle_ !: string;

  /**
   * コンストラクタ
   */ 
  constructor(name: string, division: string, presentationTitle: string) {
    this.name_ = name;
    this.division_ = division;
    this.presentationTitle_ = presentationTitle;
    if (this.name_ === '') {
      throw new Error('Presenter name is empty.');
    }
    if (this.division_ === '') {
      throw new Error('Presenter division is empty.');
    }
    if (this.presentationTitle_ === '') {
      throw new Error('Presenter presentationTitle is empty.');
    }
  }

  /**
   * 名前を取得する
   * @return 名前
   */
  get name(): string {
    return this.name_;
  }

  /**
   * 所属を取得する
   * @return 所属
   */
  get division(): string {
    return this.division;
  }

  /**
   * プレゼンテーションタイトルを取得する
   * @return プレゼンテーションタイトル
   */
  get presentationTitle(): string {
    return this.presentationTitle;
  }

}