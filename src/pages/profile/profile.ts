import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { assign } from 'lodash';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  public profileImage = null;
  public error = null;
  public person = {};
  
  constructor(
  	public navCtrl: NavController,
  	public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
    ) {

  }

  presentActionSheet() {
    this.error = null;

    var cameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select photo source',
      buttons: [{
        text: 'Take Photo',
        icon: 'camera',
        role: 'destructive',
        handler: () => {
          let options: CameraOptions = assign(cameraOptions, { sourceType: 1 })

          this.renderImage(options);
        }
      },
      {
        text: 'Choose Photo',
        icon: 'image',
        handler: () => {
          let options: CameraOptions = assign(cameraOptions, { sourceType: 0 })

          this.renderImage(options);
        }
      },
      {
        text: 'Cancel',
        icon: 'trash',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });

    actionSheet.present();
  }

  renderImage(options){
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      let toast = this.toastCtrl.create({
        message: 'Profile Image Updated.',
        duration: 3000
      });

      toast.present();

      this.profileImage = base64Image;
    }, (err) => {
      this.error = err;
    });
  }

  removePicture(){
    this.profileImage = null;
  }
}
