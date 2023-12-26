import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/guestOrder';
import { OrderService } from '../../order.service';
import { OrderMenuService } from '../../order-menu.service';

@Component({
  selector: 'app-menu-maker',
  templateUrl: './menu-maker.component.html',
  styleUrls: ['./menu-maker.component.css'],
})
export class MenuMakerComponent implements OnInit {
  @Output() validationSuccess = new EventEmitter<boolean>();

  menuItems?: MenuItem[];
  nextItemId = 1;

  emptyOrderAlert?: boolean = false;
  pickedMenuItemsDictionary: { [id: string]: MenuItem } = {};
  finalMenuItemArray?: MenuItem[] = [];

  constructor(
    private orderService: OrderService,
    public orderMenuService: OrderMenuService
  ) {}

  ngOnInit(): void {
    this.orderService.getMenuItems().subscribe({
      next: (menuItems: MenuItem[]) => {
        this.menuItems = menuItems;
      },
      error: (error) => {
        console.error('Error fetching menu items:', error);
      },
    });
  }

  handleOrderAdded(item: MenuItem) {
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

  validateMenu() {
    if (
      this.pickedMenuItemsDictionary &&
      Object.keys(this.pickedMenuItemsDictionary).length <= 0
    ) {
      this.emptyOrderAlert = true;
      return;
    } else {
      this.emptyOrderAlert = false;
    }

    //this.staticTabs.tabs[1].disabled = !this.staticTabs.tabs[1].disabled;
    //this.staticTabs.tabs[2].disabled = false;
    // this.staticTabs.tabs[2].active = true;

    this.finalMenuItemArray = this.orderMenuService.getPickedMenuItemsArray();
    //this.calculateTotal();
    //this.showCheckout = true;
    this.validationSuccess.emit(true);
  }
}
