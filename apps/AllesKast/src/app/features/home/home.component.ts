import { Component, OnInit } from '@angular/core';
import { IdentityUser, SiteUser, StoryDetail } from '../../../../../../libs/data/src';
import { UserClient } from '../../../../../../libs/service/src';
import { DummyRepo } from '../../../../../../libs/service/src/lib/Dummy/DummyRepo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  StoryList:StoryDetail[] = []
  RecommendedList:StoryDetail[] = []
  RecommendedUserList:SiteUser[] = []

  constructor(private dummyDb: DummyRepo, private userRepo: UserClient) {
  }

  ngOnInit(): void {
    this.StoryList = this.dummyDb.GetAllStories();
    this.RecommendedList = this.dummyDb.GetAllStories();
    this.userRepo.GetAll().subscribe((UL)=>{
      this.RecommendedUserList = UL;
    });
  }

}
