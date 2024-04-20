import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.css']
})
export class EditdialogComponent implements OnInit {


  public formWords = this.fb.group({
    words: this.fb.array([])
  })

  constructor(

    @Inject(MAT_DIALOG_DATA) public data: String,
    public dialogRef: MatDialogRef<EditdialogComponent>,
    private fb: FormBuilder,

  ) {
    this.addWord();
  }

  get arrWord(): FormArray {
    return this.formWords.controls['words'] as FormArray;
  }

  addWord() {

      const newWord = this.fb.group({
        write: new FormControl('',
          [
            Validators.pattern('^[a-zA-Z]$')
          ]),
        read: new FormControl('',
          [
            Validators.pattern('^[a-zA-Z]$')
          ]),
      })
     this.arrWord.push(newWord);

    return
  }

  submit() {
    this.dialogRef.close(this.formWords.value.words);
  }

  ngOnInit(): void {

  }











}
