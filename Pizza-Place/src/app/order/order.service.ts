import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getMenuItem(itemID: string){
    return this.http.get<MenuItem>(this.baseUrl + '/getmenuitem?menuItemId='+ itemID);
  }

  placeOrder(menuItems: MenuItem[], selectedDate: Date, selectedHours: number, selectedMinutes: number, numberOfPeople: number){

    const userInfoString = localStorage.getItem('user');

    let userInfo: any; 

    if (userInfoString) {
      userInfo = JSON.parse(userInfoString);
    } else {
      console.error('User information not found in localStorage.');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Guest-Info': JSON.stringify(userInfo)
    });

    const options = { headers: headers };

    const requestBody = {
      menuItems: menuItems,
      selectedDate: selectedDate,
      selectedHours: selectedHours,
      selectedMinutes: selectedMinutes,
      numberOfPeople: numberOfPeople
    };

    return this.http.post(this.baseUrl + '/placeorder', requestBody, options);
  }

}
