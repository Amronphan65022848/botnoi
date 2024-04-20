import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  coinsPayment = [50, 100, 150, 200];

  constructor(public dialog: MatDialog ) {}

  openDialog(coin: any) {
    const c = coin;

    const dialogRef = this.dialog.open(DialogComponent, {
      data: c,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  customcoin="";
  openDialogcustomcoin() {

console.log(this.customcoin)
    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.customcoin,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {}

  profile1 = new FormGroup({
    first_name: new FormControl('',[

    ]),
  })

}
