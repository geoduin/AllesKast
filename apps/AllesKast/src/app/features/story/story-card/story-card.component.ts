import { Component, Input, OnInit } from '@angular/core';
import { StoryDetail, IStory } from '../../../../../../../libs/data/src';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css']
})
export class StoryCardComponent implements OnInit {
  @Input()
  Story: IStory | undefined
  
  constructor() { }

  ngOnInit(): void {
  }

}
