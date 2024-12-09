import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  url = 'http://localhost:8080/'

  constructor(
    private http: HttpClient,
  ) { }


  signup(data: any) {
    return this.http.post(this.url + "user/signup", data,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') })
  }

  forgotPassword(data: any) {
    return this.http.post(this.url + "user/forgotPassword", data,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') })
  }

}
