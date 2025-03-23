import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private router:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
    let editedReq = req;
    if(token != undefined){
      editedReq= req.clone({
        setHeaders:{
          Authorization :`bearer ${token}`
        }
      })
    }
    console.log("Sending http req")
    return next.handle(editedReq).pipe(
     
           catchError((error:HttpErrorResponse)=>{
            let message =''
        switch(error.status){
          case 401:
            message="Unauthorized user, please login"
            this.router.navigate(['/login'])
        }
        return throwError(()=> new Error(message))
      })

    )
  }
}
