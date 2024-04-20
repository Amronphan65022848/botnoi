import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-download',
  templateUrl: './dialog-download.component.html',
  styleUrls: ['./dialog-download.component.css']
})
export class DialogDownloadComponent implements OnInit {

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
