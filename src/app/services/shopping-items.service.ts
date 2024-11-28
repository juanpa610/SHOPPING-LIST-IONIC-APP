import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemsService {

  private items: string[] = [];
  isEmptyCar: boolean = true;

  constructor() { }


  get getItems(): string[]{
    return this.items;
  }

  addItems(item: string): void {
    this.items.push(item);
    this.isEmptyCar = false;
  }


  deleteItems(item: string) : void {
    const indexOfItem = this.items.indexOf(item);
    if (indexOfItem !== -1)  this.items.splice(indexOfItem, 1);
    if (this.items.length == 0) this.isEmptyCar = true;
  }

  removeAllItems() : void {
    this.items = [];
    this.isEmptyCar = true;
  }

  existItem(item: string) {
    const itemFound = this.items.find((it) => it.toUpperCase().trim() === item.toUpperCase().trim());
    return itemFound;
  }

}
