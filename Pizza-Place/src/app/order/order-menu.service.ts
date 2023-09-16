import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from '../shared/models/guestOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderMenuService {
  
  private pickedMenuItemsDictionarySubject = new BehaviorSubject<{[id: string]: MenuItem;}>({});

  pickedMenuItemsDictionarySubject$: Observable<{[id: string]: MenuItem;}> = this.pickedMenuItemsDictionarySubject.asObservable();

  setPickedMenuItems(id: string, pickedItem: MenuItem) {
    const currentDictionary = { ...this.pickedMenuItemsDictionarySubject.value }; // Create a copy of the current dictionary
    currentDictionary[id] = pickedItem; // Set the item at the given ID
    this.pickedMenuItemsDictionarySubject.next(currentDictionary); // Update the BehaviorSubject with the new dictionary
  }

  deletePickedMenuItem(id: string) {
    const currentDictionary = { ...this.pickedMenuItemsDictionarySubject.value }; // Create a copy of the current dictionary
    delete currentDictionary[id]; // Delete the item at the given ID
    this.pickedMenuItemsDictionarySubject.next(currentDictionary); // Update the BehaviorSubject with the new dictionary
  }

  getPickedMenuItemsArray(): MenuItem[] {
    const pickedMenuItemsDictionary = this.pickedMenuItemsDictionarySubject.value;
    const menuItemArray: MenuItem[] = Object.values(pickedMenuItemsDictionary);
    return menuItemArray;
  }

}
