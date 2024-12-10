import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenCheckService implements HttpInterceptor {

  constructor(
    private router: Router,

  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = null;
    if (typeof window !== 'undefined' && localStorage) { // 確保只有在瀏覽器中執行
      token = localStorage.getItem("token");
    }
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err.url)
          if (err.status == 401 || err.status == 403) {
            if (this.router.url === '/') {

            } else {
              localStorage.clear();
              this.router.navigateByUrl('/');
            }
          }
        }
        return throwError(err);
      })
    )
  }



}
