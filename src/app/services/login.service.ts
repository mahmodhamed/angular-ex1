import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private router:Router) {}
  private isAuthenticated = false; 
  login(email: string, password: string) {
     this.http.post<any>("http://localhost:3000/api/login",{username:email,password:password}).subscribe((data)=>{
      this.isAuthenticated = true
      localStorage.setItem('token',data.token)
    this.router.navigate(['/shop'])
   })
    // if (email === 'admin@gmail.com' && password === '123456') { 
    //   this.isAuthenticated = true;
    //   return true;
    // }
    // return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}