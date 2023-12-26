import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { MenuItem, Ingredient } from 'src/app/shared/models/guestOrder';
import { OrderService } from '../../order.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderMenuService } from '../../order-menu.service';

@Component({
  selector: 'app-order-menu-item',
  templateUrl: './order-menu-item.component.html',
  styleUrls: ['./order-menu-item.component.css'],
})
export class OrderMenuItemComponent {
  @Input() menuItem!: MenuItem;
  @Input() dictionaryIndex!: string;
  @Output() removeOrder = new EventEmitter<void>();

  ingredients?: Ingredient[];
  quantity?: number = 1;
  removedIngredients?: Ingredient[] = [];

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false,
  };

  constructor(
    private orderService: OrderService,
    private modalService: BsModalService,
    private orderMenuService: OrderMenuService
  ) {}

  menuForm = new FormGroup({
    quantity: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    if (this.menuItem) {
      this.orderService
        .getMenuIngredients(this.menuItem.id ? this.menuItem.id : '0')
        .subscribe({
          next: (ingredients) => {
            this.ingredients = ingredients;
          },
          error: (error) => {
            console.log('Error fetching menu ingredients:', error);
          },
        });

      this.menuForm.controls['quantity'].valueChanges.subscribe((newValue) => {
        this.quantity = newValue !== null ? parseInt(newValue, 10) : 0;
        if (this.quantity <= 0) {
          this.quantity = 1;
          this.menuForm.controls['quantity'].setValue('1');
        }
        this.updateOrder();
      });
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  removeIngredient(ingredient: Ingredient) {
    if (ingredient && this.ingredients) {
      this.removedIngredients?.push(ingredient);
      this.ingredients = this.ingredients.filter((item) => item !== ingredient);
    }
    this.updateOrder();
  }

  addBackIngredient(ingredient: Ingredient) {
    if (ingredient && this.removedIngredients) {
      this.ingredients?.push(ingredient);
      this.removedIngredients = this.removedIngredients.filter(
        (item) => item !== ingredient
      );
    }
    this.updateOrder();
  }

  removeFromOrder() {
    this.orderMenuService.deletePickedMenuItem(this.dictionaryIndex);
    this.removeOrder.emit();
  }

  updateOrder() {
    if (this.dictionaryIndex) {
      const item: MenuItem = new MenuItem();
      item.id = this.menuItem.id;
      item.name = this.menuItem.name;
      item.price = this.menuItem.price;
      item.description = this.menuItem.description;
      item.quantity = this.quantity;
      item.icon = this.menuItem.icon;
      item.removedIngredients = this.removedIngredients;

      this.orderMenuService.setPickedMenuItems(this.dictionaryIndex, item);
    }
  }
}
