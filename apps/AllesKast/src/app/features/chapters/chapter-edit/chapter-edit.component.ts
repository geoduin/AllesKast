import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ChapterDetails, ChapterPage, IChapter, IntfPage } from '../../../../../../../libs/data/src';

@Component({
  selector: 'app-chapter-edit',
  templateUrl: './chapter-edit.component.html',
  styleUrls: ['./chapter-edit.component.css']
})
export class ChapterEditComponent implements OnInit {

  //To hold all pages.
  ChapterForm: ChapterDetails;
  warning: string;
  Edit: boolean;

  
  constructor(private route: ActivatedRoute, private router: Router) { 
    this.warning = "";
    this.Edit = false;
    this.ChapterForm = {
      StoryId: "",
      ChapterTitle: "",
      ChapterId: "",
      ChapterNr: 0,
      PublishDate: new Date(),
      Ratings: undefined,
      ChapterPage:{
        ComicImage: "",
        ImageName: "",
        PageId: undefined,
      }
    }
  }

  PublishImage(event:any){

  }

  ngOnInit(): void {
    console.log("Hoofdstuk wijziging in process");
    this.route.params.subscribe((urlWaarden)=>{
      //StoryId pakken

      //Als er een storyID aanwezig is, Controleer of er een edit url aanwezig is.
      //Niet, maak een nieuwe hoofdstuk aan, anders vul in de rest ter wijziging.
      
    })
  }

  OnSubmit(){
    console.log("Een nieuw hoofdstuk is geplaatst.")
  }
}
