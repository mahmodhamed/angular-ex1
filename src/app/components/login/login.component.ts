import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password = '';
  email = '';

  constructor(private loggerService: LoginService, private router: Router){}
  onLogin(){
    if (this.loggerService.login(this.email, this.password)) {
      this.router.navigate(['/shop']); 
    } else {
      alert('Invalid credentials');
    }
  }
}
