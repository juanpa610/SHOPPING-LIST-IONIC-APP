import { Component, ViewChild } from '@angular/core';
import { AlertController, IonInput } from '@ionic/angular';
import { ShoppingItemsService } from '../services/shopping-items.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  itemString = '';
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  constructor(private service: ShoppingItemsService, 
    private alertController: AlertController
  ) { }


  onInput() {
    const filteredValue = this.itemString.replace(/[^a-zA-Z\s]+/g, '');
    this.itemString = filteredValue;
  }

  addItem() {
    if (this.service.existItem(this.itemString)){
      this.errorAlert();
    } else {
      this.service.addItems(this.itemString);
      this.itemString = '';
      this.successAlert();
    }
  }
  async successAlert() {
    let alertButtons = [
      {
        text: 'Okay',
        role: 'succcess',
        handler: () => {
          // return true;
        },
      },
    ]
    const alert = await this.alertController.create({
      header: 'Exito',
      subHeader: 'Bien',
      message: 'Item agregado.',
      buttons: alertButtons,
    });

    await alert.present();
  }
  async errorAlert() {
    let alertButtons = [
      {
        text: 'NO Okay',
        role: 'error',
        handler: () => {
          // return false;
        },
      },
    ]
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Error',
      message: 'Item no agregado.',
      buttons: alertButtons,
    });

    await alert.present();
  }

 

}
