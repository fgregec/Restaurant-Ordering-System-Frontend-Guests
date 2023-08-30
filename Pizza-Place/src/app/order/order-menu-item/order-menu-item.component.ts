import { Component, Input, TemplateRef } from '@angular/core';
import { MenuItem, Ingredient } from 'src/app/shared/models/guestOrder';
import { OrderService } from '../order.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

import { shareReplay } from 'rxjs';


@Component({
  selector: 'app-order-menu-item',
  templateUrl: './order-menu-item.component.html',
  styleUrls: ['./order-menu-item.component.css']
})
export class OrderMenuItemComponent {
  @Input() menuItem! : MenuItem;
  
  ingredients?: Ingredient[];
  quantity?: number = 1;
  removedIngredients?: Ingredient[] = [];

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(private orderService: OrderService, private modalService: BsModalService, private cdRef: ChangeDetectorRef) {}
  
  menuForm = new FormGroup({
    quantity: new FormControl('', [Validators.required]),
  });


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

      this.menuForm.controls['quantity'].valueChanges.subscribe((newValue) => {
        this.quantity = newValue !== null ? parseInt(newValue, 10) : 0;
        if(this.quantity <= 0){
          this.quantity = 1;
          this.menuForm.controls['quantity'].setValue('1');
        }
      });
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  removeIngredient(ingredient: Ingredient){
    if(ingredient && this.ingredients){
      this.removedIngredients?.push(ingredient);
      this.ingredients = this.ingredients.filter(item => item !== ingredient);
    }
  }

  addBackIngredient(ingredient: Ingredient){
    if(ingredient && this.removedIngredients){
      this.ingredients?.push(ingredient);
      this.removedIngredients = this.removedIngredients.filter(item => item !== ingredient);
    }
  }
}
