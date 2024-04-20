import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// For MDB Angular Free
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { WalletComponent } from './wallet/wallet.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Text2speechComponent } from './text2speech/text2speech.component';
import { NgxPopper } from 'angular-popper';
import { MatSelectModule } from '@angular/material/select';
import { DialogSuccessComponent } from './dialog-success/dialog-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditdialogComponent } from './editdialog/editdialog.component';
import { DialogDownloadComponent } from './dialog-download/dialog-download.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { WordStoreComponent } from './word-store/word-store.component'
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogDeleteRowComponent } from './dialog-delete-row/dialog-delete-row.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WalletComponent,
    Text2speechComponent,
    DialogComponent,
    DialogSuccessComponent,
    EditdialogComponent,
    DialogDownloadComponent,
    WordStoreComponent,
    DialogDeleteRowComponent
  ],
  entryComponents: [DialogComponent, EditdialogComponent, DialogDownloadComponent, WordStoreComponent, MainPageComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDialogModule,
    NgxPopper,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    OverlayModule,
    HttpClientModule,
    MatSliderModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
