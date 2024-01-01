import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RegisterGuest } from 'src/app/shared/models/guest';
import { AccountService } from '../account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  constructor(private accountService: AccountService, private router: Router, private title: Title, private http: HttpClient){
    this.title.setTitle('Register');
  }
  

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });


  register() {
    if (this.registerForm.valid) {
      const user = {
        firstName: this.registerForm.controls['firstName'].value,
        lastName: this.registerForm.controls['lastName'].value,
        phoneNumber: this.registerForm.controls['phoneNumber'].value,
        email: this.registerForm.controls['email'].value,
        password: this.registerForm.controls['password'].value,
      } as RegisterGuest;
      this.accountService.registerGuest(user).subscribe({
        next: (userInfo) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
