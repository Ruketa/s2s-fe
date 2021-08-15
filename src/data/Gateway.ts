export class Gateway{

  private baseUrl_ !: string;

  constructor( url: string, port: number, timeout: number,){
    this.baseUrl_ = url + ':' + port;
  }

  public fetch( endpoint: string, data: {} = {}, method: string = 'GET' ): Promise<Array<any>>{
    console.log("fetch is called in gateway")
    const url = this.baseUrl_ + endpoint;

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


