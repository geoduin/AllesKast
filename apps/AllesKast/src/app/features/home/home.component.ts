import { Component, OnInit } from '@angular/core';
import { IdentityUser, StoryDetail } from '../../../../../../libs/data/src';
import { DummyRepo } from '../../../../../../libs/Services/src/lib/Dummy/DummyRepo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  StoryList:StoryDetail[] = []
  RecommendedList:StoryDetail[] = []
  RecommendedUserList:IdentityUser[] = []

  constructor(private dummyDb: DummyRepo) {
  }

  ngOnInit(): void {
    this.StoryList = this.dummyDb.GetAllStories();
    this.RecommendedList = this.dummyDb.GetAllStories();
    this.RecommendedUserList = this.dummyDb.GetAllDummyUsers();
    console.log(this.dummyDb.GetAllStories())
  }

}
