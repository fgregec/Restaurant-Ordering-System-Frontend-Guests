import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/guestOrder';

@Component({
  selector: 'app-checkout-menu-item',
  templateUrl: './checkout-menu-item.component.html',
  styleUrls: ['./checkout-menu-item.component.css']
})
export class CheckoutMenuItemComponent {
  @Input() menuItem! : MenuItem;
  
  constructor(){}
  
}
