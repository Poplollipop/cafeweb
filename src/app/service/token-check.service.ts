import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenCheckService implements HttpInterceptor {

  constructor(
    private router: Router,

  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    }
    return null;
  }



}
