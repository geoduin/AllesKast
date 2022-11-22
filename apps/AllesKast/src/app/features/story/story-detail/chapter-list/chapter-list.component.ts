import { Component, Input, OnInit } from '@angular/core';
import { StoryDetail } from '../../../../../../../../libs/data/src';


@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {

  @Input()
  Story: StoryDetail | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
