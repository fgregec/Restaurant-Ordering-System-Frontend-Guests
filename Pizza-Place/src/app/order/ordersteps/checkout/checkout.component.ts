import { Component, OnInit } from '@angular/core';
import { OrderMenuService } from '../../order-menu.service';
import { MenuItem } from 'src/app/shared/models/guestOrder';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  finalMenuItemArray?: MenuItem[] = [];
  totalCheckout?: number;

  constructor(public orderMenuService: OrderMenuService) {}

  ngOnInit(): void {
    this.orderMenuService.pickedMenuItemsDictionarySubject$.subscribe(() => {
      this.updateFinalMenuItemArray();
    });
  }

  updateFinalMenuItemArray() {
    this.finalMenuItemArray = this.orderMenuService.getPickedMenuItemsArray();
    this.calculateTotal();
  }

  calculateTotal() {
    let totalPrice = 0;
    if (this.finalMenuItemArray) {
      for (let item of this.finalMenuItemArray) {
        if (item.price && item.quantity) {
          totalPrice += item.price * item.quantity;
        }
      }
    }
    this.totalCheckout = totalPrice;
  }
}
