import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-success',
  templateUrl: './dialog-success.component.html',
  styleUrls: ['./dialog-success.component.css']
})
export class DialogSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  step:number =1;
  next(){
   this.step=this.step+1
 }
 back(){
   this.step=this.step-1
 }

}
