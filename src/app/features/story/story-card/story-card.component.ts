import { Component, Input, OnInit } from '@angular/core';
import { IStory } from '../../domain/Story.domain';

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
