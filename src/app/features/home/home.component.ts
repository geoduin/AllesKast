import { Component, OnInit } from '@angular/core';
import { DummyDB } from 'src/app/services/DummyDb';
import { IStory, Story } from '../domain/Story.domain';
import { User } from '../domain/User.domain';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  StoryList:Story[] = []
  RecommendedList:Story[] = []
  RecommendedUserList:User[] = []

  constructor(private dummyDb: DummyDB) {
  }

  ngOnInit(): void {
    this.StoryList = this.dummyDb.GetAllStories();
    this.RecommendedList = this.dummyDb.GetAllStories();
    this.RecommendedUserList = this.dummyDb.GetAllDummyUsers();
    console.log(this.dummyDb.GetAllStories())
  }

}
