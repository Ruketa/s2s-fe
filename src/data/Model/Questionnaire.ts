/**
 * アンケートデータクラス
 */
export class Questionnaire{

  /** 満足度 */
  private satisfactionLevel_ !: number;

  /** おススメ度 */
  private recommendationLevel_ !: number;

  /** 参加したい度 */
  private participationLevel_ !: number;

  /** 発表したい度 */
  private presentationLevel_!: number;

  /** トピック */
  private topic_ !: string;

  /** コメント */
  private freeComment_!: string;

  /**
   * コンストラクタ
   * @param satisfactionLevel_ 満足度
   * @param recommendationLevel_ おススメ度
   * @param participationLevel_ 参加したい度
   * @param presentationLevel_ 発表したい度
   * @param topic_ トピック
   * @param freeComment_ コメント
   */
  constructor(
    satisfactionLevel_: number,
    recommendationLevel_: number,
    participationLevel_: number,
    presentationLevel_: number,
    topic_: string,
    freeComment_: string,
  ) {
    this.satisfactionLevel_ = satisfactionLevel_;
    this.recommendationLevel_ = recommendationLevel_;
    this.participationLevel_ = participationLevel_;
    this.presentationLevel_ = presentationLevel_;
    this.topic_ = topic_;
    this.freeComment_ = freeComment_;
  }

  /**
   * 満足度を取得する
   * @return 満足度
   */
  get satisfactionLevel(): number {
    return this.satisfactionLevel_;
  }
  /**
   * おススメ度を取得する
   * @return おススメ度
   */
  get recommendationLevel(): number {
    return this.recommendationLevel_;
  }
  /**
   * 参加したい度を取得する
   * @return 参加したい度
   */
  get participationLevel(): number {
    return this.participationLevel_;
  }
  /**
   * 発表したい度を取得する
   * @return 発表したい度
   */
  get presentationLevel(): number {
    return this.presentationLevel_;
  }
  /**
   * トピックを取得する
   * @return トピック
   */
  get topic(): string {
    return this.topic_;
  }
  /**
   * コメントを取得する
   * @return コメント
   */
  get freeComment(): string {
    return this.freeComment_;
  }

  /**
   * 満足度を設定する
   * @param satisfactionLevel 満足度
   */
  set satisfactionLevel(satisfactionLevel: number) {
    this.satisfactionLevel_ = satisfactionLevel;
  }
  /**
   * おススメ度を設定する
   * @param recommendationLevel おススメ度
   */
  set recommendationLevel(recommendationLevel: number) {
    this.recommendationLevel_ = recommendationLevel;
  }
  /**
   * 参加したい度を設定する
   * @param participationLevel 参加したい度
   */
  set participationLevel(participationLevel: number) {
    this.participationLevel_ = participationLevel;
  }
  /**
   * 発表したい度を設定する
   * @param presentationLevel 発表したい度
   */
  set presentationLevel(presentationLevel: number) {
    this.presentationLevel_ = presentationLevel;
  }
  /**
   * トピックを設定する
   * @param topic トピック
   */
  set topic(topic: string) {
    this.topic_ = topic;
  }
  /**
   * コメントを設定する
   * @param freeComment コメント
   */
  set freeComment(freeComment: string) {
    this.freeComment_ = freeComment;
  }

}