import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { AuthGuard } from '../../core/auth.guard';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-image-creator',
  templateUrl: './image-creator.component.html',
  styleUrls: ['./image-creator.component.css']
})
export class ImageCreatorComponent implements OnInit {

  postForm: FormGroup;
  loading = false;
  user: string;
  position: firebase.firestore.GeoPoint;

  folderName = "postImage";
  fileName = "post_image";
  titleDropdown = "Subir Imagen";
  subtitleDropdown = "Elige una foto para subir...";
  imageTitleDropdown = "Imagen del post";
  imageSubtitleDropdown = "Imagen que se mostrará en el post";

  constructor(private tfs: FirebaseService, private fb: FormBuilder, public snackBar: MatSnackBar, private auth: AuthService) {
    this.auth.user.subscribe(
      (data: User) => {
        this.user = data.username;
      }
    )
   }

  ngOnInit() {
    this.findMe();
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      timestamp: new Date(),
    })
  }

  async submitHandlerPost() {
    this.loading = true;
    const formValue =  { ...this.postForm.value, user: this.user, geoposition: this.position} ;
    console.log(formValue);
    try {
      await this.tfs.addPost(formValue);
      this.postForm.reset();
      this.openSnackBar("Post añadido correctamente");
      setTimeout(() => { this.loading = false; }, 1000);
    } catch(err) {
      this.openSnackBar("Error añadiendo post");
      console.log(err);
      this.loading = false;
    }
  }

  findMe() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        this.position = new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }




  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }

}
