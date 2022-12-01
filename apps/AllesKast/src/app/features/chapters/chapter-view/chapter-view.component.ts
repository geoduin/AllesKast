import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChapterDetails, IChapter } from '../../../../../../../libs/data/src';
import { ChapterClient } from '../../../../../../../libs/services/src';

@Component({
  selector: 'app-chapter-view',
  templateUrl: './chapter-view.component.html',
  styleUrls: ['./chapter-view.component.css'],
})
export class ChapterViewComponent implements OnInit, OnDestroy {
  
  CurrentChapter: ChapterDetails | undefined
  ChapterList: IChapter[] = [];
  //Subscriptions
  SubscriptionChapter$: Subscription | undefined;
  ChapterListSub$: Subscription | undefined;
  routeSub$: Subscription | undefined;

  //Buttons
  DisableBtnLeft: boolean = false;
  DisableBtnRight: boolean = false;
  ChapterPointer: number = 0;

  constructor(private ChapterClient: ChapterClient, private route: ActivatedRoute, private Router: Router) {}
  

  NextChapter(){
    this.ChapterPointer++;
    if(this.ChapterPointer <= 0){
      this.DisableBtnLeft = true;
    } else{
      this.DisableBtnLeft = false;
    }
  }

  PreviousChapter(){
    this.ChapterPointer--;
    if(this.ChapterPointer >= this.ChapterList.length - 1){
      this.DisableBtnLeft = true;
    } else{
      this.DisableBtnLeft = false;
    }
  }

  ngOnInit(): void {
    this.routeSub$ = this.route.paramMap.subscribe((urlParams)=>{
      console.log(urlParams);
      const ChapterId = urlParams.get("ChapterId");
      const StoryId = urlParams.get("StoryId");
      if(ChapterId && StoryId){

        this.SubscriptionChapter$ = this.ChapterClient
        .Get(StoryId, ChapterId, {})
        .subscribe((result)=>{
          //Iets doen met loading component
          console.log(result);
          this.CurrentChapter = result.result;
        })

        this.ChapterListSub$ = this.ChapterClient.All(StoryId, {WantImage: 0}).subscribe((v)=>{
          console.log(v.result);
          this.ChapterList = v.result;
        })
        
      } else{
        console.warn("Hoofdstuk niet gevonden.");
        this.Router.navigate([".."]);
      }
    })

  }
  
  ngOnDestroy(): void {
    console.log("Unsub from httpRequest");
    this.SubscriptionChapter$?.unsubscribe();
    console.log("Unsub from url parameters");
    this.routeSub$?.unsubscribe();
    this.ChapterListSub$?.unsubscribe();
  }
  
}
