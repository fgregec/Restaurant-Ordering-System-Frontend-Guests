import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient, MenuItem } from 'src/app/shared/models/guestOrder';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem!: MenuItem;
  @Output() orderAdded = new EventEmitter<void>();

  ingredients?: Ingredient[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    if (this.menuItem.id) {
      this.orderService.getMenuIngredients(this.menuItem.id).subscribe({
        next: (ingredients) => {
          this.ingredients = ingredients;
        },
        error: (error) => {
          console.log('Error fetching menu ingredients:', error);
        },
      });
    }
  }

  addToOrder() {
    this.orderAdded.emit();
  }
}
