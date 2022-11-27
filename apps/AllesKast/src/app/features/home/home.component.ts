import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IdentityUser, SiteUser, StoryDetail } from '../../../../../../libs/data/src';
import { UserClient } from '../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../libs/services/src/lib/Dummy/DummyRepo';
import { DialogComponent } from '../../../../../../libs/ui/src/lib/dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  StoryList:StoryDetail[] = []
  RecommendedList:StoryDetail[] = []
  RecommendedUserList:IdentityUser[] = []

  constructor(private dummyDb: DummyRepo, private userRepo: UserClient) {
  }


  ngOnInit(): void {
    this.StoryList = this.dummyDb.GetAllStories();
    this.RecommendedList = this.dummyDb.GetAllStories();
    this.RecommendedUserList = this.dummyDb.GetAllDummyUsers();
    /*this.userRepo.GetAll().subscribe((UL)=>{
      this.RecommendedUserList = UL;
    });*/
  }

}
