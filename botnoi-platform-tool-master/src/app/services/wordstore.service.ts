import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { webapi } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WordstoreService {

  constructor(private http: HttpClient) { }

  getWordStore() {
    const userid = "12344"
    const url = webapi + "/dictionary/get_dictionary?user_id=" + userid
    return this.http.get(url);
  }
}
