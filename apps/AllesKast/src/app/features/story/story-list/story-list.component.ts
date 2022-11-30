import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IStory } from '../../../../../../../libs/data/src';
import { StoryClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';



@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

  StoryList$: Observable<IStory[] | null>;
  constructor(private Db: DummyRepo, private client: StoryClient) { 
    this.StoryList$ = new Observable<IStory[]>;
  }

  ngOnInit(): void {
   this.StoryList$ = this.client.GetAll({});
  }

}
