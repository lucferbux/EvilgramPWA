import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CoreModule } from './core/core.module';
import { ImageCropperModule } from 'ngx-img-cropper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig; // Added for importing firebase configuration

import { AppComponent } from './app.component';
import { FileUploadComponent, ImageEditComponentSheet } from './routing-components/image-creator/file-upload/file-upload.component';




import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { NavEvilgramComponent } from './routing-components/nav-evilgram/nav-evilgram.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FeedEvilgramComponent } from './routing-components/feed-evilgram/feed-evilgram.component';
import { ImageCreatorComponent } from './routing-components/image-creator/image-creator.component';
import { LoginScreenComponent } from './routing-components/login-screen/login-screen.component';
import { FileSizePipe } from './routing-components/image-creator/file-upload/file-size.pipe';
import { DropZoneDirective } from './routing-components/image-creator/file-upload/drop-zone.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavEvilgramComponent,
    FeedEvilgramComponent,
    ImageCreatorComponent,
    LoginScreenComponent,
    FileUploadComponent,
    FileSizePipe,
    DropZoneDirective,
    ImageEditComponentSheet
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    ImageCropperModule,
    FormsModule,
    CoreModule, 
    ReactiveFormsModule,
    AngularFireStorageModule, 
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  entryComponents: [ImageCreatorComponent, ImageEditComponentSheet],
  bootstrap: [AppComponent]
})
export class AppModule { }
