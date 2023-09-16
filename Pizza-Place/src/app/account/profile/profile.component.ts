import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guest } from 'src/app/shared/models/guest';
import { AllOrdersDto } from 'src/app/shared/models/guestOrder';
import { AccountService } from '../account.service';
import { Title } from '@angular/platform-browser';
import { format, parseISO, isBefore } from 'date-fns';
import { OrderStatus } from 'src/app/shared/models/guestOrder';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  guest!: Guest;
  previousOrders!: AllOrdersDto[];
  orderStatus: OrderStatus = OrderStatus.BOOKED;

  constructor(private router: Router, private accountService: AccountService, private title: Title) {
    this.title.setTitle('Profile');
  }

  ngOnInit(): void {

    const userData = localStorage.getItem('user');
    if (userData) {
      this.guest = JSON.parse(userData) as Guest;
    } else {
      this.router.navigateByUrl('/home');
    }

    if(this.guest){
    this.accountService.getGuestOrders().subscribe(
      (response) => {
        this.previousOrders = response;
      },
      (error) => console.log('Error fetching previous orders')  
    )
    }

  }
  
  formatDate(date: string){
    const parsedDate = parseISO(date);
    const formattedDate = format(parsedDate, 'yyyy-MM-dd HH:mm:ss');  

    if(formattedDate){
      return formattedDate;
    }
    return '1';
  }

  checkCancelation(placedFor: string){
    const dateNow: Date = new Date();
    const parsedDate = parseISO(placedFor);

    return isBefore(dateNow, parsedDate);
  }

  cancelOrder(orderId: string){
    this.accountService.cancelOrder(orderId).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.log(error)
      }
    );
  }

}
