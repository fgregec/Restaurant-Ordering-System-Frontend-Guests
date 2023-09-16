import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { MenuItem } from '../shared/models/guestOrder';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { OrderMenuService } from './order-menu.service';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  

  @ViewChild('people') people!:ElementRef;
  @ViewChild('error') error!:ElementRef;

  @ViewChild('staticTabs', { static: false }) staticTabs!: TabsetComponent;
  bsConfig?: Partial<BsDatepickerConfig>;

  showErrorAlert?: boolean = false;
  emptyOrderAlert?: boolean = false;

  myTime: Date = new Date();
  minTime: Date = new Date();
  maxTime: Date = new Date();

  pickedMenuItemsDictionary: { [id: string]: MenuItem } = {};
  finalMenuItemArray?: MenuItem[] = [];

  selectedDate?: Date;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  menuItems?: MenuItem[];

  nextItemId = 1; 
  totalCheckout?: number;

  timeNow: Date = new Date();

  errorMessage?: string;

  handler:any = null;

  showCheckout: boolean = false;

  constructor(private orderService: OrderService, private router: Router, private title: Title, private http: HttpClient, private toastr: ToastrService, public orderMenuService: OrderMenuService){
    this.title.setTitle('Order');

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.bsConfig = {
      minDate: new Date(),
      showWeekNumbers: false,
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

  ngAfterViewInit(): void {
    if (this.staticTabs) {
      //this.staticTabs.tabs[1].disabled = true;
      //this.staticTabs.tabs[2].disabled = true;
    }
  }

  onValueChange(value: Date): void {
    this.selectedDate = value;
  }

  validateTable(){
    this.timeNow = new Date();
    const timeNowNumber: number = this.timeNow.getHours() + 1;

    if(this.people.nativeElement.value <= 0){
      this.showErrorAlert = true;
      this.errorMessage = 'Number of people can not be 0';
      return;
    } else{
      this.showErrorAlert = false;
    }

    if(!this.selectedDate){
      this.showErrorAlert = true;
      this.errorMessage = 'Please select a date!';
      return;
    } else{
      this.showErrorAlert = false;
    }

    if(this.myTime.getHours() < timeNowNumber && this.myTime.getDate() == this.selectedDate.getDate()){
      this.showErrorAlert = true;
      this.errorMessage = 'You have to order 1 hour in advance!';
      return;
    } else {
      this.showErrorAlert = false;
    }

    this.staticTabs.tabs[0].disabled = !this.staticTabs.tabs[0].disabled;
    this.staticTabs.tabs[1].disabled = false;
    this.staticTabs.tabs[1].active = true; 
  }

  validateMenu(){
    if (this.pickedMenuItemsDictionary && Object.keys(this.pickedMenuItemsDictionary).length <= 0) {
      this.emptyOrderAlert = true;
      return;
    } else {
      this.emptyOrderAlert = false;
    }

    this.staticTabs.tabs[1].disabled = !this.staticTabs.tabs[1].disabled;
    this.staticTabs.tabs[2].disabled = false;
    this.staticTabs.tabs[2].active = true; 

    this.finalMenuItemArray = this.orderMenuService.getPickedMenuItemsArray();
    this.calculateTotal();
    this.showCheckout = true;
   }

  handleOrderAdded(item: MenuItem){
    if (item) {
      const itemId = this.nextItemId.toString();
      this.orderMenuService.setPickedMenuItems(itemId, item);
      this.pickedMenuItemsDictionary[itemId] = item;
      this.nextItemId++;
    }
  }

  removeFromOrder(itemId: string) {
    this.orderMenuService.deletePickedMenuItem(itemId);
    delete this.pickedMenuItemsDictionary[itemId];
  }

  getPickedItemsKeys(): string[] {
    return Object.keys(this.pickedMenuItemsDictionary);
  }

  calculateTotal(){
    let totalPrice = 0;
    if(this.finalMenuItemArray){
      for (let item of this.finalMenuItemArray) {
        if(item.price && item.quantity){
          totalPrice += item.price * item.quantity;
        }
      }
    }
    this.totalCheckout = totalPrice;
  }

  placeOrder(){

    if(this.finalMenuItemArray && this.myTime && this.selectedDate){
      this.orderService.placeOrder(this.finalMenuItemArray, this.selectedDate, this.myTime.getHours(), this.myTime.getMinutes(), this.people.nativeElement.value).subscribe(
        (response) => {
          this.toastr.success('Order Placed!','',{
            positionClass: 'toast-bottom-right'
          });
          this.router.navigateByUrl('/home');
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }


}
