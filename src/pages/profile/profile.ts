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
    public modalCtrl: ModalController,
    //private nativeStorage: NativeStorage
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
        text: 'Use Camera',
        icon: 'camera',
        role: 'destructive',
        handler: () => {
          let options: CameraOptions = assign(cameraOptions, { sourceType: 1 })

          this.renderImage(options);
        }
      },
      {
        text: 'Photo Library',
        icon: 'image',
        handler: () => {
          let options: CameraOptions = assign(cameraOptions, { sourceType: 0 })

          this.renderImage(options);
        }
      },
      {
        text: 'Remove Pic',
        icon: 'trash',
        handler: () => {
          this.removePicture();
        }
      }]
    });

    actionSheet.present();
  }

  renderImage(options){
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      /*this.nativeStorage.setItem('picture', {picture: base64Image}).then(() => {
        let toast = this.toastCtrl.create({
          message: 'Profile Image Updated.',
          duration: 3000
        });

        toast.present();
      },
        (error) => {
          console.error('Error storing item', error)
      });*/

      this.profileImage = base64Image;
    }, (err) => {
      this.error = err;
    });
  }

  removePicture(){
    //this.nativeStorage.remove('picture');

    this.profileImage = null;
  }
}
