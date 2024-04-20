import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
import { DialogDeleteRowComponent } from '../dialog-delete-row/dialog-delete-row.component';
import { Word } from '../models/word.model';
import { MatDialog } from '@angular/material/dialog';
import { WordstoreService } from '../services/wordstore.service';

@Component({
  selector: 'app-word-store',
  templateUrl: './word-store.component.html',
  styleUrls: ['./word-store.component.css'],
})
export class WordStoreComponent implements OnInit {
  displayedColumn = [
    'select',
    'date_time',
    'before_text',
    'atfer_text',
    'listen-to-sound',
    'edit',
  ];

  dataSource = new MatTableDataSource<any>();

  textSearch!: String;

  constructor(public dialog: MatDialog, private wordstoreServerice: WordstoreService) {
    this.checkState = false;
  }

  ngOnInit(): void {
    // this.dataSource.data = this.Word;
    this.getDataWord();
  }
  checkState!: Boolean;
  date: any;

  async getDataWord() {
    await this.wordstoreServerice.getWordStore().subscribe((res) => {
      const data: any = res;
      if (data.status == 200) {

        this.dataSource.data = data.response;
        console.log(this.dataSource.data)
      }
      else if(data.status == 401) {
        console.log("status", data.message)
      }
      else {
        console.log("error");
      }


    })
  }

  search(evevt: any) {
    let filterValue = '';
    if (event) {
      filterValue = (event.target as HTMLInputElement).value;
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  clearSearch() {
    this.textSearch = '';
    this.dataSource.filter = '';
  }

  Word = [
    {
      datetime: '2020-06-24T17:34:07.689+00:00',
      writing: 'ครม',
      editedreading: 'คะ-นะ-รัด-ทะ-มน-ตรี ',
      selected: false,
    },
    {
      datetime: '2020-06-24T17:34:07.689+00:00',
      writing: 'อูเบอร์',
      editedreading: 'อู-เบ้อร์ ',
      selected: false,
    },
    {
      datetime: '2020-06-24T17:34:07.689+00:00',
      writing: 'แชทบอท',
      editedreading: 'แชด-บ่อด',
      selected: false,
    },
    {
      datetime: '2020-06-24T17:34:07.689+00:00',
      writing: 'ครม',
      editedreading: 'คะ-นะ-รัด-ทะ-มน-ตรี ',
      selected: false,
    },
    {
      datetime: '2020-06-24T17:34:07.689+00:00',
      writing: 'ครม',
      editedreading: 'คะ-นะ-รัด-ทะ-มน-ตรี ',
      selected: false,
    },
  ];

  checked(i: any) {
    this.dataSource.data[i].selected = !this.dataSource.data[i].selected;
    const k = this.dataSource.data.filter((row) => {
      return row.selected == true;
    }).length;
    if (k > 0) {
      this.checkState = true;
    } else {
      this.checkState = false;
    }
  }

  removeRow(event: any) {
    let b: any = 0;
    let c: any = 0;
    let a: any = 0;
    for (let index = 0; index < this.Word.length; index++) {
      if (this.Word[index].selected == true) {
        a = a + 1;
      }
    }
    //   else if(this.Word[index].selected == false){
    //     a=a-1;
    //   }
    // }
    // console.log(a);

    b = this.dataSource.data.filter((row) => {
      return row.selected == true;
    }).length;
    console.log(b);

    const dialogRef = this.dialog.open(DialogDeleteRowComponent, {
      data: b,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result === true) {
        const data_delete = this.dataSource.data.filter((row) => {
          return row.selected != true;
        });
        console.log(data_delete);
        this.dataSource.data = data_delete;
      }
    });
  }
}
