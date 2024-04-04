import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { WeLoveLazyService } from '../services/we-love-lazy.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private weLoveLazy:WeLoveLazyService  
    ) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     const token = localStorage.getItem('token');
    if(token){
      request =request.clone({
        setHeaders:{
        Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err)=>{
        if(err instanceof HttpErrorResponse){
          console.log("err.url: ",err.url);
          if(err.status === 401||err.status === 403){
           setTimeout(async ()=>{   
            if(this.router.url === '/'){}
            else{
              (await ((this.weLoveLazy).close)).execute();  
              setTimeout(()=>{   
            }, 10);     
            }
           }, 10);     
          }
        } 
        return throwError(() => { 
        });
      })
    );
  }
}

