import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { IdentityUser, IStory, SiteUser, StoryDetail } from '../../../../../../libs/data/src';
import { RecommendedClient, StoryClient, UserClient } from '../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../libs/services/src/lib/Dummy/DummyRepo';
import { DialogComponent } from '../../../../../../libs/ui/src/lib/dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  StoryList:StoryDetail[] | undefined | null;
  RecommendedList:StoryDetail[] | undefined | null;
  RecommendedUserList:SiteUser[] = []

  Subscriptions: Subscription | undefined
  Recommendations: Observable<StoryDetail[]>;

  constructor(private userRepo: UserClient, private storyRepo: StoryClient, private rcdClient: RecommendedClient) {
    this.Recommendations = new Observable<StoryDetail[]>;
  }
  ngOnDestroy(): void {
    if(this.Subscriptions){
      this.Subscriptions.unsubscribe();
    }
  }


  ngOnInit(): void {
    this.Subscriptions = this.storyRepo.GetAll({}).subscribe((list: StoryDetail[] | null | undefined)=>{
      this.StoryList =  list?.slice(0, 5);
    });

    
    this.userRepo.GetAll().subscribe((UL: SiteUser[])=>{
      this.RecommendedUserList = UL.slice(0, 6);
    });

    this.Recommendations = this.rcdClient.GetRecommendations();
  }

}
