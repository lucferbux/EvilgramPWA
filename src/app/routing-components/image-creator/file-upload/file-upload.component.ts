import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, Inject } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { ImageSharingService } from './image-sharing.service'
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor { //ControlValueAccesor framework to forms
  // https://angularfirebase.com/lessons/firebase-storage-with-angularfire-dropzone-file-uploader/
  // Main task 
  task: AngularFireUploadTask;
  @Input() folder: string = "test";
  @Input() filename: string = "name_upload";
  @Input() title: string = "Upload File";
  @Input() subtitle: string = "Choose a file to upload";
  @Input() imageTitle: string = "Imagen de avatar";
  @Input() imageSubtitle: string = "Imagen que se mostrará en el avatar del perfil";
  @Input() widthCrop: number = 100;
  @Input() heightCrop: number = 100;
  @Input() avatarImage = true;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;

  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;
  url: string = '';

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private imageSharing: ImageSharingService, private bottomSheet: MatBottomSheet) {
    imageSharing.imageSelected.subscribe(
      (image: any) => this.startUpload(image)
    )


  }

  // function to store the registerOnChange method
  propagateChange = (_: any) => { };

  //Called when you instantiate a new FormControl (Value given this case empty string)
  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.url = obj;
    }
  }

  // Called each time you want to change the property binded, in this case with the value of the url, assign the funcition to propagate change
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  // Called when there's a new touch event (not necessary here)
  registerOnTouched(fn: any): void {

  }

  //To set the property disabled when the form is disabled
  setDisabledState(isDisabled: boolean): void {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  fileChangeListener(event: FileList) {
    console.log(event)
    const file = event.item(0)
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }
    this.imageSharing.image = file;
    this.bottomSheet.open(ImageEditComponentSheet, {
      data: {
        width: this.widthCrop,
        height: this.heightCrop
      }
    })
  }


  startUpload(image: any) {

    // The storage path
    const path = `${this.folder}/${new Date().getTime()}_${this.filename}`;

    // Totally optional metadata
    const customMetadata = { app: 'EvilgramImage' };
    const fileRef = this.storage.ref(path);
    console.log("Entro en startUpload");
    // The main task
    this.task = this.storage.upload(path, image, { customMetadata })


    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    console.log("Entro con tasks");
    console.log(this.task);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          this.propagateChange(url);
        });
      })
    ).subscribe(
      
    )
    // The file's download URL

  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  resetData() {
    this.downloadURL = null;
    this.percentage = null;
    this.snapshot = null;
  }

}


@Component({
  selector: 'app-image-edit-sheet',
  templateUrl: './image-edit.component-sheet.html',
  styleUrls: ['./file-upload.component.scss']
})
export class ImageEditComponentSheet {
  dataPhoto: any;
  cropperSettings: CropperSettings;
  image: any;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  constructor(public bottomSheetRef: MatBottomSheetRef<ImageEditComponentSheet>, private sharingImage: ImageSharingService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = data.width;
    this.cropperSettings.height = data.height;
    this.cropperSettings.croppedWidth = data.width;
    this.cropperSettings.croppedHeight = data.height;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 400;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.compressRatio = 1;

    this.dataPhoto = {};

    this.image = new Image();

    var file: File = this.sharingImage.image;
    var myReader: FileReader = new FileReader();
    var that = this;


    myReader.onloadend = function (loadEvent: any) {
      that.image.src = loadEvent.target.result;
      that.cropper.setImage(that.image);
    };

    myReader.readAsDataURL(file);
  }

  uploadTrimmedImage() {
    console.log("Imprimiendo data");

    var fileUpload = this.base64ToFile(this.dataPhoto.image, "image.png", "image/png")
    this.sharingImage.imageSelected.emit(fileUpload);
    this.bottomSheetRef.dismiss();
  }

  base64ToFile(base64Data, tempfilename, contentType) {
    contentType = contentType || '';
    const base64RealData = base64Data.split("base64,")
    const sliceSize = 1024;
    const byteCharacters = atob(base64RealData[1]);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new File(byteArrays, tempfilename, { type: contentType });
  }



}