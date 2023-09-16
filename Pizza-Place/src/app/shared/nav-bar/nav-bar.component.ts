import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Guest } from '../models/guest';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private router: Router, private accountService: AccountService) { }

    guest?: Guest | null;

    ngOnInit() {
      this.accountService.currentGuest.subscribe(guest => {
        this.guest = guest;
      });
    }

    redirectToLogin() {
      this.router.navigateByUrl('/login');
    }

    redirectToRegister(){
      this.router.navigateByUrl('/register');
    }

    redirectToProfile(){
      this.router.navigateByUrl('/profile');
    }

    redirectToOrder(){
      this.router.navigateByUrl('/order');
    }

    logout(){
      this.accountService.logout();
      this.router.navigateByUrl('/login');
    }

  }
