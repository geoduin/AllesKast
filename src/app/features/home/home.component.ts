import { Component, OnInit } from '@angular/core';
import { DummyDB } from 'src/app/services/DummyDb';
import { Story } from '../domain/Story.domain';
import { User } from '../domain/User.domain';
import { DummyData } from './Dummy';

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
    const user =this.StoryList[0].Title
  }

}
