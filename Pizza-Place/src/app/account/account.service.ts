import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginGuest, RegisterGuest, Guest } from '../shared/models/guest';
import { BehaviorSubject } from 'rxjs';
import { AllOrdersDto } from '../shared/models/guestOrder';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = "http://localhost:5078/api/guest";

  private guest = new BehaviorSubject<Guest | null>(null);
  currentGuest = this.guest.asObservable();

  constructor(private http: HttpClient) {
    var storedGuest = localStorage.getItem('user');
    if(storedGuest){
      this.updateGuest(JSON.parse(storedGuest) as Guest)
    }
   }

  registerGuest(user: RegisterGuest) {
    return this.http.post<Guest>(this.baseUrl + '/register', user);
  }

  loginGuest(user: LoginGuest) {
    return this.http.post<Guest>(this.baseUrl + '/login', user);
  }

  logout(){
    localStorage.clear();
    this.guest.next(null);
  }

  updateGuest(guest: Guest) {
    this.guest.next(guest);
  }

  getGuestOrders(){

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

    return this.http.get<AllOrdersDto[]>('http://localhost:5078/api/GuestOrder/getguestorders', options);
  }

  cancelOrder(orderId: string){
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
    return this.http.post('http://localhost:5078/api/GuestOrder/cancel?orderId=' + orderId, orderId, options);

  }

}
