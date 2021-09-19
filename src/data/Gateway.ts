export class Gateway{

  private baseUrl_ !: string;

  private timeout_ !: number;

  constructor( url: string, port: number, timeout: number,){
    this.baseUrl_ = url + ':' + port;
    this.timeout_ = timeout;
  }

  public fetch( endpoint: string, data: {} = {}, method: string = 'GET' ): Promise<Array<any>>{
    const url = this.baseUrl_ + endpoint;

    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    .then(response => {
      return response.json();
    })
  }

}


