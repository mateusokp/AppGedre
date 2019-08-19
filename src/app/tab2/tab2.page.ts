import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  pairedList;
  listToggle: boolean = false;
  pairedDeviceID: number = 0;
  dataSend: string = "";

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private bluetoothSerial: BluetoothSerial,
  private toastCtrl: ToastController) {
    this.checkBluetoothEnabled();
  }

checkBluetoothEnabled() {
  this.bluetoothSerial.isEnabled().then(sucess => {
    this.listPairedDevices();
  }, error => {
    this.showError("Por Favor ative o Bluetooth")
  });
}

listPairedDevices() {
  this.bluetoothSerial.list().then(sucess => {
    this.pairedList = sucess;
    this.listToggle = true;
  }, error => {
    this.showError("Por Favor ative o Bluetooth")
    this.listToggle = false;
  });
}

selectDevice(){
  let connectedDevice = this.pairedList[this.pairedDeviceID];
  if (!connectedDevice.address){
    this.showError('Selecione dispositivo pareado para conectar');
    return;
  }
  let address = connectedDevice.address;
  let name = connectedDevice.name;

  this.connect(address);
}

connect(address){
  this.bluetoothSerial.connect(address).subscribe(success => {
    this.deviceConnected();
    this.showToast("Conetado com sucesso");
  }, error => {
    this.showError("Erro: Conectando com dispositivo");
  });
}

deviceConnected(){
  this.bluetoothSerial.subscribe('\n').subscribe(success => {
    this.handleData(success);
    this.showToast("Conectado com sucesso");
  }, error => {
    this.showError(error);
  });
}

deviceDisconnected(){
  this.bluetoothSerial.disconnect();
  this.showToast("Dispositivo desconectado");
}

handleData(data){
  this.showToast(data);
}

sendData(){
  this.dataSend += '\n';
  this.showToast(this.dataSend);

  this.bluetoothSerial.write(this.dataSend).then(success => {
    this.showToast(success);
  }, error => {
    this.showToast(error)
  });
}

showError(error){
  let alert = this.alertCtrl.create({
    buttons: ['Cancelar']
  }).then(alert=> alert.present());
}

showToast(msj){
  const toast = this.toastCtrl.create({
    message: msj,
    duration: 1000
  }).then(alert=> alert.present());

}
}
export interface pairedlist {
  "class": number,
  "id": string,
  "address": string,
  "name": string
}


