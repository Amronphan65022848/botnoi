import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-row',
  templateUrl: './dialog-delete-row.component.html',
  styleUrls: ['./dialog-delete-row.component.css']
})
export class DialogDeleteRowComponent implements OnInit {
  value:any
  constructor(public dialogRef: MatDialogRef<DialogDeleteRowComponent>,
    @Inject(MAT_DIALOG_DATA) public b: any) {
      this.value = b
      console.log(this.value)
    }

  ngOnInit(): void {
  }

}
