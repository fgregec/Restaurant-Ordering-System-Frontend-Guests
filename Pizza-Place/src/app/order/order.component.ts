import { Component, ElementRef, ViewChild } from '@angular/core';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { OrderMenuService } from './order-menu.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent {
  @ViewChild('error') error!: ElementRef;

  @ViewChild('staticTabs', { static: false }) staticTabs!: TabsetComponent;

  showErrorAlert?: boolean = false;

  totalCheckout?: number;

  errorMessage?: string;

  handler: any = null;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private title: Title,
    private http: HttpClient,
    private toastr: ToastrService,
    public orderMenuService: OrderMenuService
  ) {
    this.title.setTitle('Order');
  }

  ngAfterViewInit(): void {
    if (this.staticTabs) {
      setTimeout(() => {
        this.staticTabs.tabs[1].disabled = true;
        this.staticTabs.tabs[2].disabled = true;
      });
    }
  }

  swapTab(tabNumber: number) {
    switch (tabNumber) {
      case 0:
        this.staticTabs.tabs[0].disabled = true;
        this.staticTabs.tabs[1].disabled = false;
        this.staticTabs.tabs[1].active = true;
        break;
      case 1:
        this.staticTabs.tabs[1].disabled = true;
        this.staticTabs.tabs[2].disabled = false;
        this.staticTabs.tabs[2].active = true;
        break;
    }
  }

  // placeOrder() {
  //   if (this.finalMenuItemArray && this.myTime && this.selectedDate) {
  //     this.orderService
  //       .placeOrder(
  //         this.finalMenuItemArray,
  //         this.selectedDate,
  //         this.myTime.getHours(),
  //         this.myTime.getMinutes(),
  //         this.people.nativeElement.value
  //       )
  //       .subscribe(
  //         (response) => {
  //           this.toastr.success('Order Placed!', '', {
  //             positionClass: 'toast-bottom-right',
  //           });
  //           this.router.navigateByUrl('/home');
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //   }
  // }
}
