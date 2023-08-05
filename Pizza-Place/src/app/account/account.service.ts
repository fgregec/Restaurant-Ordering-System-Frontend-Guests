import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginGuest, RegisterGuest, Guest } from '../shared/models/guest';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = "http://localhost:5078/api/guest";

  constructor(private http: HttpClient) { }

  registerGuest(user: RegisterGuest) {
    return this.http.post<Guest>(this.baseUrl + '/register', user);
  }

  loginGuest(user: LoginGuest) {
    return this.http.post<Guest>(this.baseUrl + '/login', user);
  }

}
