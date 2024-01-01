import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';

import { AccountModule } from './account/account.module';
import { HomeModule } from './home/home.module';
import { OrderModule } from './order/order.module';

import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AccountModule,
    HomeModule,
    OrderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
