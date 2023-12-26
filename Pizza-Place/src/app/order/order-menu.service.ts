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
    const currentDictionary = { ...this.pickedMenuItemsDictionarySubject.value }; 
    currentDictionary[id] = pickedItem; 
    this.pickedMenuItemsDictionarySubject.next(currentDictionary); 
  }

  deletePickedMenuItem(id: string) {
    const currentDictionary = { ...this.pickedMenuItemsDictionarySubject.value };
    delete currentDictionary[id]; 
    this.pickedMenuItemsDictionarySubject.next(currentDictionary);
  }

  getPickedMenuItemsArray(): MenuItem[] {
    const pickedMenuItemsDictionary = this.pickedMenuItemsDictionarySubject.value;
    const menuItemArray: MenuItem[] = Object.values(pickedMenuItemsDictionary);
    return menuItemArray;
  }

}
