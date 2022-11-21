import { Component, OnInit } from '@angular/core';
import { DummyDB } from '../../../services/DummyDb';
import { IStory } from '../../domain/Story.domain';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

  StoryList: IStory[] = this.Db.GetAllStories();
  constructor(private Db: DummyDB) { }

  ngOnInit(): void {
  }

}
