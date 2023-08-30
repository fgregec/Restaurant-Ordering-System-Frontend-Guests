import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient, MenuItem } from '../shared/models/guestOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = "http://localhost:5078/api/guestorder";

  constructor(private http: HttpClient) { }

  getMenuItems(){
    return this.http.get<MenuItem[]>(this.baseUrl + '/getmenuitems');
  }

  getMenuIngredients(menuId: string){
    return this.http.get<Ingredient[]>(this.baseUrl + '/getmenuingredients?menuItemId=' + menuId);
  }

  

}
