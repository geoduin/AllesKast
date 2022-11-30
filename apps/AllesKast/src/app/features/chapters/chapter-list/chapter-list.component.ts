import { Component, Input, OnInit } from '@angular/core';
import { IChapter, StoryDetail } from '../../../../../../../libs/data/src';


@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {

  @Input()
  Story: StoryDetail | undefined;


  @Input()
  ChapterList: IChapter[] | undefined
 
  constructor() { }

  ngOnInit(): void {
  }

}
