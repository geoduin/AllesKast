import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IStory } from '../../../../../../../libs/data/src';
import { StoryClient } from '../../../../../../../libs/services/src';
import { DummyRepo } from '../../../../../../../libs/services/src/lib/Dummy/DummyRepo';



@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit, OnChanges {

  StoryList$: Observable<IStory[] | null>;
  constructor(private client: StoryClient) { 
    this.StoryList$ = new Observable<IStory[]>;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Verandering');
    console.log(changes);
    this.StoryList$ = this.client.GetAll({});
  }

  ngOnInit(): void {
   this.StoryList$ = this.client.GetAll({});
  }

}
