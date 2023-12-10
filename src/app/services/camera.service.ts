import { Injectable } from '@angular/core';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';



@Injectable({
  providedIn: 'root'
})
export class CameraService {

  public photos: Photo[] = []

  constructor() { }

  // Add foto à galeria
  addNewToGalery = async () => {
    const capturePhoto = await Camera.getPhoto({
      quality: 100, // Qualidade 100%
      allowEditing: true,
      resultType: CameraResultType.Uri, // Como será retornado o caminho. Será retornado um caminho Uri.
      source: CameraSource.Camera,  // Origem da imagem
    });

    // unshift => Add algo ao inicio do Array
    this.photos.unshift({
      webviewPath: capturePhoto.webPath ? capturePhoto.webPath : ''
    })
  }

  deletePhoto(index: number) {
    this.photos.splice(index, 1)
  }

}

export interface Photo {
  webviewPath: string;
  base64?: string;
}
