import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogDownloadComponent } from './dialog-download/dialog-download.component';
import { DialogSuccessComponent } from './dialog-success/dialog-success.component';
import { MainPageComponent } from './main-page/main-page.component';
import { Text2speechComponent } from './text2speech/text2speech.component';
import { WalletComponent } from './wallet/wallet.component';
import { WordStoreComponent } from './word-store/word-store.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path:"main",
    component:MainPageComponent
  },
  {
    path: "text2speech",
    component: Text2speechComponent
  },
  {
    path: "wallet",
    component: WalletComponent

  },
  {
    path: "success",
    component:DialogSuccessComponent
  },
  {
    path: "downloadfile",
    component:DialogDownloadComponent
  },
{
    path:"wordstore",
    component:WordStoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
