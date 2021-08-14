//import axios, { AxiosResponse } from 'axios';

export class Gateway{

  private baseUrl_ !: string;

  private timeout_ : number;

  constructor( url: string, port: number, timeout: number,){
    this.baseUrl_ = url + ':' + port;
    this.timeout_ = timeout;
  }

  public fetch( endpoint: string, data: {} = {}, method: string = 'GET' ): Promise<Array<any>>{
    console.log("fetch is called in gateway")
    const url = this.baseUrl_ + endpoint;
    //console.log(url)

    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    .then(response => {
      //console.log(response)
      return response.json();
    })
  }

}


