import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Ingredient, MenuItem } from '../shared/models/guestOrder';
import { Observable } from 'rxjs';
import { TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  bsConfig?: Partial<BsDatepickerConfig>;

  myTime: Date = new Date();
  minTime: Date = new Date();
  maxTime: Date = new Date();

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  menuItems?: MenuItem[];
  pickedMenuItems?: MenuItem[] = [];

  selectedTime?: number;
  timeNow: Date = new Date();


  constructor(private orderService: OrderService, private router: Router, private title: Title, private http: HttpClient){
    this.title.setTitle('Order');

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.bsConfig = {
      minDate: new Date(), // Set the minimum date to today
    };

    this.myTime.setHours(10);
    this.myTime.setMinutes(0);
    this.minTime.setHours(10);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(20);
    this.maxTime.setMinutes(0);

  }
  
  ngOnInit(): void {
    this.orderService.getMenuItems().subscribe({
      next: (menuItems: MenuItem[]) => {
        this.menuItems = menuItems;
      },
      error: (error) => {
        console.error('Error fetching menu items:', error);
      }
    });
  }

  validateTable(){
    this.timeNow = new Date();
    if (this.timeNow.getHours() == this.myTime.getHours()) {
      console.log('You can order!')
    }
    console.log(this.myTime.getHours());
    console.log(this.timeNow.getHours());
  }

  handleOrderAdded(item: MenuItem){
    if(item){
      this.pickedMenuItems?.push(item);
      console.log(this.pickedMenuItems)
    }
  }

  disableEnable() {
    if (this.staticTabs?.tabs[2]) {
      this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
    }
  }


}
