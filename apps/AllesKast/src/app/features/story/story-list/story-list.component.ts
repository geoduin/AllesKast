import { Component, OnInit } from '@angular/core';
import { IStory } from '../../../../../../../libs/data/src';
import { StoryClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';



@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

  StoryList: IStory[] = this.Db.GetAllStories();
  constructor(private Db: DummyRepo, private client: StoryClient) { }

  ngOnInit(): void {
  }

}
