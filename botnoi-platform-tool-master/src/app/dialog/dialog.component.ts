import { Component, OnInit, Inject, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { WalletService } from '../services/wallet.service';
import { QRCodeModule } from 'angularx-qrcode';
export interface DialogData {
  confirm: boolean;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  value: number;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public payment: any,
    private walletServerice: WalletService
  ) {
    this.value = payment;
    console.log(this.payment);
  }
  transactionId: any;
  qr:  any="";
  response : any;
  step: number = 1;
 getQrcode(price: Number) {
  
    this.walletServerice.postWallet(price).subscribe((res) => {
      const data:any = res
      this.qr = data.qrCode
      this.transactionId = data.transactionId
    });
  }
  


  ngOnInit(): void {
    console.log(this.step)
    if(this.step === 2){
    this.walletServerice.postCheck(this.transactionId).subscribe((res) =>{
      console.log(res)
    })
            setInterval(() => {
              this.response =  this.walletServerice.postCheck(this.transactionId).subscribe((res) =>{
                console.log(res)
              })
                }, 1000);
              }
            
            
  }

 
  next() {
    this.step = this.step + 1;
     this.getQrcode(this.payment);
  }
  back() {
    this.step = this.step - 1;
  }
}
