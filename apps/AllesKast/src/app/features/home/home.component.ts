import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IdentityUser, IStory, SiteUser, StoryDetail } from '../../../../../../libs/data/src';
import { StoryClient, UserClient } from '../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../libs/services/src/lib/Dummy/DummyRepo';
import { DialogComponent } from '../../../../../../libs/ui/src/lib/dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  StoryList:StoryDetail[] | undefined | null;
  RecommendedList:StoryDetail[] | undefined | null;
  RecommendedUserList:SiteUser[] = []

  constructor(private dummyDb: DummyRepo, private userRepo: UserClient, private storyRepo: StoryClient) {
  }


  ngOnInit(): void {
    this.storyRepo.GetAll({}).subscribe((list: StoryDetail[] | null | undefined)=>{
      this.StoryList =  list?.slice(0, 5);
      this.RecommendedList = list;
    });
    //this.RecommendedUserList = this.dummyDb.GetAllDummyUsers();
    this.userRepo.GetAll().subscribe((UL: SiteUser[])=>{
      this.RecommendedUserList = UL.slice(0, 6);
    });
  }

}
