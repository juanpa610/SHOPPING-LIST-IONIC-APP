import { Component } from '@angular/core';
import { ShoppingItemsService } from '../services/shopping-items.service';
import { AlertController, ItemReorderEventDetail, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  items: string[] = [];

  constructor(public service: ShoppingItemsService,
     private alertController: AlertController,
     private menuController: MenuController
  ) {
    this.items = this.service.getItems;
  }

  async removeItem(item: string) {

    let alertButtons = [
      {
        text: 'Eliminar',
        cssClass: 'alert-button-confirmation',
        role: 'succcess',
        handler: () => {
          this.service.deleteItems(item);
        },
      },
      {
        text: 'Cancelar',
        cssClass: 'alert-button-cancel',
        role: 'succcess',
        handler: () => {
          alert.dismiss();
        },
      },
    ]
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: 'Estas seguro?',
      cssClass: 'custommm-alert',
      buttons: alertButtons,
    });

    await alert.present();
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    const item = this.items.splice(ev.detail.from, 1)[0];
    this.items.splice(ev.detail.to, 0, item);
    ev.detail.complete();
    console.log(this.items);
  }

  async removeAllItems() {
    let alertButtons = [
      {
        text: 'Eliminarlos',
        role: 'succcess',
        handler: () => {
          this.service.removeAllItems();
          this.menuController.close();
        },
      },
      {
        text: 'NO Cancelar',
        role: 'succcess',
        handler: () => {
          alert.dismiss();
        },
      },
    ]
    const alert = await this.alertController.create({
      header: 'Eliminar todos los items del carrito',
      message: 'Estas seguro?',
      cssClass: 'custommm-alert',
      buttons: alertButtons,
    });

    await alert.present();
    
  }

}
