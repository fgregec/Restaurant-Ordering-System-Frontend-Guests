import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginGuest } from 'src/app/shared/models/guest';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private accountService: AccountService, private router: Router, private title: Title, private http: HttpClient){
    this.title.setTitle('Login');
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


login() {
  if (this.loginForm.valid) {
    const user = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    } as LoginGuest;

  this.accountService.loginGuest(user).subscribe({
    next: (userInfo) => {
      this.accountService.updateGuest(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      this.router.navigate(['/profile']);
    },
    error: error => {
      {
        console.log(error);
      }
    }
  });
} else{
  this.loginForm.markAllAsTouched();
  }

  }
}
