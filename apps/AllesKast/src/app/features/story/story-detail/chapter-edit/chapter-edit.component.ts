import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { IChapter, IntfPage } from '../../../../../../../../libs/data/src';

@Component({
  selector: 'app-chapter-edit',
  templateUrl: './chapter-edit.component.html',
  styleUrls: ['./chapter-edit.component.css']
})
export class ChapterEditComponent implements OnInit {

  //To hold all pages.
  ChapterForm: IChapter;
  pageholder: Map<number, IntfPage>;
  warning: string;
  Edit: boolean;

  
  constructor(private route: ActivatedRoute, private router: Router) { 
    this.pageholder = new Map();
    this.warning = "";
    this.Edit = false;
    this.ChapterForm = {
      ChapterTitle: "",
      ChapterId: "",
      ChapterNr: 0,
      PublishDate: new Date(),
      Ratings: undefined
    }
  }

  AddImage(page: IntfPage){
    this.pageholder.set(this.pageholder.size + 1, page);
  }

  DeleteImage(key: number){
    this.pageholder.delete(key);
  }

  ngOnInit(): void {
  }
  OnSubmit(){
    if(this.pageholder.size < 1){
      this.warning = "Een strip moet geupload zijn."
      return;
    } else {
      
    }
  }
}
