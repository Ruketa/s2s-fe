import { Gateway } from "./Gateway";

export class DataLoader {

  private gateway_!: Gateway;

  constructor( gateway: Gateway ) {
    this.gateway_ = gateway;
  }

  public fetchQuestionnaireDataAll(): Promise<Array<any>> {
    console.log("fetchQuestionnaireDataAll is called");
    return this.gateway_.fetch("/api/questionnaire/0")
      .then( (response: any) => {
        //console.log(response);
        return response;
      });
  }

  public fetchQuestionnaireData(id: number): Promise<Array<any>> {
    console.log("fetchQuestionnaireData is called");
    return this.gateway_.fetch("/api/questionnaire/" + id)
      .then( (response: any) => {
        //console.log(response);
        return response;
      });
  }

}