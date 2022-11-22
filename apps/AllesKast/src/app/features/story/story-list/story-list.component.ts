import { Component, OnInit } from '@angular/core';
import { IStory } from '../../../../../../../libs/data/src';
import { DummyRepo } from '../../../../../../../libs/Services/src/lib/Dummy/DummyRepo';


@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

  StoryList: IStory[] = this.Db.GetAllStories();
  constructor(private Db: DummyRepo) { }

  ngOnInit(): void {
  }

}
