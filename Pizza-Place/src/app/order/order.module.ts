import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StripeComponent } from '../stripe/stripe.component';
import { CheckoutMenuItemComponent } from './items/checkout-menu-item/checkout-menu-item.component';
import { MenuItemComponent } from './items/menu-item/menu-item.component';
import { OrderMenuItemComponent } from './items/order-menu-item/order-menu-item.component';
import { OrderComponent } from './order.component';

import { CheckoutComponent } from './orderSteps/checkout/checkout.component';
import { MenuMakerComponent } from './orderSteps/menu-maker/menu-maker.component';
import { TablePickerComponent } from './orderSteps/table-picker/table-picker.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxStripeModule } from 'ngx-stripe';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    OrderComponent,
    MenuItemComponent,
    OrderMenuItemComponent,
    StripeComponent,
    CheckoutMenuItemComponent,
    TablePickerComponent,
    MenuMakerComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    TabsModule,
    BsDatepickerModule,
    BrowserAnimationsModule,
    TimepickerModule,
    AlertModule,
    NgxStripeModule.forRoot(
      'pk_test_51MVytIFqBUpBtecpTPEEyF8CTV2ucDbGPj5iJmWteNhokAsk2SI7D1ihiY5ZRGhRefnfQb6OWqHNDX3Ti1CBOx6s00kfJu7ZOU'
    ),
    ToastrModule,
    SharedModule
  ],
})
export class OrderModule {}
