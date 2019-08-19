import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  intAtual: string;
  unpaired: any;
  paired: any;
  gettingDevices: boolean;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private bluetoothSerial: BluetoothSerial,
    private toastCtrl: ToastController) {};

  startScanning() {
    this.paired = null;
    this.unpaired = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpaired = success;
      this.gettingDevices = false;
      success.forEach(element => {
        // alert(element.name);
    }); }, failure => {
      console.log(failure);
    })

    this.bluetoothSerial.list().then((success) => {
      this.paired = success;
    }, failure => {

      })
    }
    success = (data) => alert(data);
    fail = (error) => alert(error);

  async selectDevice(address: any) {
    const alert = await this.alertCtrl.create({
      header: 'Conectar',
      message: 'Deseja se conectar com?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Conectar',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    await alert.present();
  }

  async disconnect() {
      const alert = await this.alertCtrl.create({
        header: 'Desconectar?',
        message: 'Deseja desconectar?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelado');
            }
          },
          {
            text: 'Desconectar',
            handler: () => {
              this.bluetoothSerial.disconnect();
            }
          }
        ]
      });await alert.present();
  }

  mandarDados(atual){
    this.bluetoothSerial.write(atual+"a").then(success =>{
      let toast = this.toastCtrl.create({
        message: 'Dados Enviados',
        duration: 3000,
        position: 'bottom'
      });
    }, failure =>{
      let toast = this.toastCtrl.create({
        message: 'Erro no envio dos dados',
        duration: 3000,
        position: 'bottom'
      });
    });
  }
  mandarDado(atual){
    this.bluetoothSerial.write(atual+"b").then(success =>{
      let toast = this.toastCtrl.create({
        message: 'Dados Enviados',
        duration: 3000,
        position: 'bottom'
      });
    }, failure =>{
      let toast = this.toastCtrl.create({
        message: 'Erro no envio dos dados',
        duration: 3000,
        position: 'bottom'
      });
    });
  }
}
