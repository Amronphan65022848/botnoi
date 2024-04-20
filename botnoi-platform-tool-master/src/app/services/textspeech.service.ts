import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webapi } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TextspeechService {

  constructor(private http: HttpClient) { }

  playText(text: String, voice: any) {

    const token = "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjM4MjcxMjAsIm5iZiI6MTYyMzgyNzEyMCwianRpIjoiZTMxMjE1NmYtMmI2MC00MzVhLTg5YTItMTM3YTFmYTNkZTljIiwiaWRlbnRpdHkiOiJVOTllNmM4YWQ5NzQyN2UzZWI4ZmE1YTgxZWMyZDM1MjMiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.xZsi0XebygrbbyTw0s84TV8SHUw1bWPRhdR9OI551p8";
    const header = new HttpHeaders(
      {
        "Authorization": token,
      })

    const url = webapi + '/service/generate_voice?text=' + text + '&speaker=' + voice;

    return this.http.get(url, { responseType: 'blob', headers: header });
  }


  downloadText(text: String) {

    const token = "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjM4MjcxMjAsIm5iZiI6MTYyMzgyNzEyMCwianRpIjoiZTMxMjE1NmYtMmI2MC00MzVhLTg5YTItMTM3YTFmYTNkZTljIiwiaWRlbnRpdHkiOiJVOTllNmM4YWQ5NzQyN2UzZWI4ZmE1YTgxZWMyZDM1MjMiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.xZsi0XebygrbbyTw0s84TV8SHUw1bWPRhdR9OI551p8";
    const header = new HttpHeaders(
      {
        "Authorization": token,
      })

    const url = webapi + '/service/generate_voice_master?text=' + text;

    return this.http.get(url, { responseType: 'blob', headers: header });
  }

}
