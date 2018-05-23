import { AlertController } from 'ionic-angular';

export class PromptFactory {
  static createTextUpdatePrompt(alertCtrl: AlertController, title: string, placeholder: string, callback: any): void {
    let alert = alertCtrl.create({
      title: title,
      inputs: [
        {
          name: 'data',
          placeholder: placeholder
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Update',
          handler: data => {
            callback(data.data);
          }
        }
      ]
    });
    
    alert.present();
  }

  static createTextActionPrompt(alertCtrl: AlertController, title: string, placeholder: string, action: string, callback: any): void {
    let alert = alertCtrl.create({
      title: title,
      inputs: [
        {
          name: 'data',
          placeholder: placeholder
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: action,
          handler: data => {
            callback(data.data);
          }
        }
      ]
    });
    
    alert.present();
  }

  static createInformationPrompt(alertCtrl: AlertController, title: string, message: string): void {
    let alert = alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'close'
        }
      ]
    });

    alert.present();
  }
}