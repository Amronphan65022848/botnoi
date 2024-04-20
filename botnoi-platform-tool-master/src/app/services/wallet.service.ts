import { Injectable } from '@angular/core';
import { webapi } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient) {}

  postWallet(price: Number) {
    const token =
      'Bearer ' +
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjM4MjcxMjAsIm5iZiI6MTYyMzgyNzEyMCwianRpIjoiZTMxMjE1NmYtMmI2MC00MzVhLTg5YTItMTM3YTFmYTNkZTljIiwiaWRlbnRpdHkiOiJVOTllNmM4YWQ5NzQyN2UzZWI4ZmE1YTgxZWMyZDM1MjMiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.xZsi0XebygrbbyTw0s84TV8SHUw1bWPRhdR9OI551p8';

    const header = new HttpHeaders({
      Authorization: `${token}`,
    });


    const user_id = 'U99e6c8ad97427e3eb8fa5a81ec2d3523';
    const body = {
      price: price,
      package_id:50
      
    };

    const url = webapi + '/payment/register_qrcode';
    return this.http.post(url, body, { headers: header } );
  }

  postCheck(transactionId: String) {
    const token =
      'Bearer ' +
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjM4MjcxMjAsIm5iZiI6MTYyMzgyNzEyMCwianRpIjoiZTMxMjE1NmYtMmI2MC00MzVhLTg5YTItMTM3YTFmYTNkZTljIiwiaWRlbnRpdHkiOiJVOTllNmM4YWQ5NzQyN2UzZWI4ZmE1YTgxZWMyZDM1MjMiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.xZsi0XebygrbbyTw0s84TV8SHUw1bWPRhdR9OI551p8';

    const header = new HttpHeaders({
      Authorization: `${token}`,
    });

    const user_id = 'U99e6c8ad97427e3eb8fa5a81ec2d3523';
    const bodycheck = {
      transactionId :transactionId
      
      
    };

    const url = webapi + '/payment/check_qrcode';
    return this.http.post(url, bodycheck, { headers: header } );

  }


}
