import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = environment.apiUrl;
  userDetails = 'user';
  constructor(private http: HttpClient) {

  }

  httpHeaders = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  /* POST API logic is done by using createData method and it takes  */
  createData(endpoints, body) {
    const url = environment.apiUrl + endpoints;
    return this.http.post(url, body);
  }

  /* GET API logic is done by using createData method and it takes  */
  readData(endpoints) {
    const url = environment.apiUrl + endpoints;
    return this.http.get(url);
  }

  /* UPDATE API logic is done by using createData method and it takes  */
  updateData() {

  }

  /* Delete API logic is done by using createData method and it takes  */
  delteData() { }



}
