import { Component, Input, TemplateRef } from '@angular/core';
import { MenuItem, Ingredient } from 'src/app/shared/models/guestOrder';
import { OrderService } from '../order.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-order-menu-item',
  templateUrl: './order-menu-item.component.html',
  styleUrls: ['./order-menu-item.component.css']
})
export class OrderMenuItemComponent {
  @Input() menuItem! : MenuItem;
  
  ingredients?: Ingredient[];
  quantity?: number;
  removedIngredients?: Ingredient[] = [];

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(private orderService: OrderService, private modalService: BsModalService){}
  
  ngOnInit(): void {
    if (this.menuItem) {
      this.orderService.getMenuIngredients(this.menuItem.id).subscribe({
        next: (ingredients) => {
          this.ingredients = ingredients;
        },
        error: (error) => {
          console.log('Error fetching menu ingredients:', error);
        },
        complete: () => {
          console.log('Observable completed.');
        }
      });
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
    console.log(this.ingredients)
  }

  removeIngredient(ingredient: Ingredient){
    if(ingredient && this.ingredients){
      this.removedIngredients?.push(ingredient);
      this.ingredients = this.ingredients.filter(item => item !== ingredient);
      console.log('Removing ingredient' + ingredient);
      console.log('All ingredients: ' + this.ingredients);
    }
  }

  addBackIngredient(ingredient: Ingredient){
    if(ingredient && this.removedIngredients){
      this.ingredients?.push(ingredient);
      this.removedIngredients = this.removedIngredients.filter(item => item !== ingredient);
      console.log('Adding back' + ingredient);
      console.log('All ingredients: ' + this.ingredients);
    }
  }
}
