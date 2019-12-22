import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = environment.apiUrl;
  managePayee = environment.managepayee;


  userDetails = 'user';
  constructor(private http: HttpClient) {
    //this.apiUrl = this.maintiainPayee;
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
  updateData(endpoints, body) {
    const url = environment.apiUrl + endpoints;
    return this.http.put(url, body);
  }

  /* Delete API logic is done by using createData method and it takes  */
  delteData() { }

  /* POST API logic is done by using createData method and it takes  */
  payeecreateData(endpoints, body) {
    const url = this.managePayee + endpoints;
    return this.http.post(url, body);
  }

  /* GET API logic is done by using createData method and it takes  */
  payeereadData(endpoints) {
    const url = this.managePayee + endpoints;
    return this.http.get(url);
  }

  /* UPDATE API logic is done by using createData method and it takes  */
  payeeupdateData(endpoints, body) {
    const url = this.managePayee + endpoints;
    return this.http.put(url, body);
  }

  /* Delete API logic is done by using createData method and it takes  */
  payeedelteData(endpoints) {
    const url = this.managePayee + endpoints;
    return this.http.delete(url);

  }



}
